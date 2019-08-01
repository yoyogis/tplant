import ts from 'typescript';
import { Class } from '../Components/Class';
import { ComponentFactory } from './ComponentFactory';

export namespace ClassFactory {
  export function create(
    classSymbol: ts.Symbol,
    checker: ts.TypeChecker
  ): Class {
    const className: string = getClassName(classSymbol);
    const result: Class = new Class(className);
    const classDeclaration: ts.ClassDeclaration[] | undefined = <ts.ClassDeclaration[] | undefined>classSymbol.getDeclarations();

    if (classDeclaration !== undefined && classDeclaration.length > 0) {
      result.isStatic = ComponentFactory.isStatic(
        classDeclaration[classDeclaration.length - 1]
      );
      result.isAbstract = ComponentFactory.isAbstract(
        classDeclaration[classDeclaration.length - 1]
      );
    }

    if (classSymbol.members !== undefined) {
      result.members = ComponentFactory.serializeMethods(
        classSymbol.members,
        checker
      );
      result.typeParameters = ComponentFactory.serializeTypeParameters(
        classSymbol.members,
        checker
      );
    }

    if (classSymbol.exports !== undefined) {
      result.members = result.members.concat(
        ComponentFactory.serializeMethods(classSymbol.exports, checker)
      );
    }

    if (classSymbol.globalExports !== undefined) {
      result.members = result.members.concat(
        ComponentFactory.serializeMethods(classSymbol.globalExports, checker)
      );
    }

    if (classDeclaration !== undefined && classDeclaration.length > 0) {
      const heritageClauses: ts.NodeArray<ts.HeritageClause> | undefined =
        classDeclaration[classDeclaration.length - 1].heritageClauses;

      if (heritageClauses !== undefined) {
        heritageClauses.forEach(
          (heritageClause: ts.HeritageClause): void => {
            if (heritageClause.token === ts.SyntaxKind.ExtendsKeyword) {
              result.extendsClass = ComponentFactory.getExtendsHeritageClauseName(
                heritageClause
              );
            } else if (
              heritageClause.token === ts.SyntaxKind.ImplementsKeyword
            ) {
              result.implementsInterfaces = ComponentFactory.getImplementsHeritageClauseNames(
                heritageClause
              );
            }
          }
        );
      }
    }

    result.dependencies = getDependence(classSymbol, checker);

    return result;
  }

  export function getDependence(classSymbol: ts.Symbol, checker: ts.TypeChecker): string[] {
    const results: Set<string> = new Set();
    filterNodes(classSymbol.valueDeclaration.getSourceFile().getChildren());
    console.log('allNodes done');

    return Array.from(results);
    function filterNodes(nodes: ts.Node[]): void {
      nodes.forEach((node: ts.Node) => {
        if (node.kind === ts.SyntaxKind.PropertyAccessExpression) {
          const currentNode: ts.PropertyAccessExpression = <ts.PropertyAccessExpression>node;
          // tslint:disable-next-line: no-any
          const sym: any = checker.getSymbolAtLocation(currentNode.expression);
          if (sym && sym.type) {
            console.log(`test:${node.getText()}   expression:${sym.getName()}
                        ${sym.type.getSymbol().name}`);
            let className: string = getClassName(sym.type.getSymbol());
            if (className === '__object') {
                className = sym.getName();
            }
            results.add(className);
          } else {
            console.log('no symbol...');
          }
        }
        filterNodes(node.getChildren());
      });
    }
  }

  function getClassName(classSymbol: ts.Symbol): string {
    let className: string = classSymbol.getName();
    // tslint:disable-next-line: no-any
    const s: any = classSymbol;
    if (className === 'default') {
      className = s.getDeclarations()[0].name.escapedText;
    }
    if (s.parent &&s.parent.valueDeclaration &&s.parent.valueDeclaration.path) {
        const m = s.parent.valueDeclaration.path.match(/\.([a-z]+)\.ts/);
        if (m) {
        className = `${m[1]}.${className}`;
        }
    }

    return className;
  }
}
