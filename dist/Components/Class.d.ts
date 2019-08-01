import { ComponentKind } from '../Models/ComponentKind';
import { IComponentComposite } from '../Models/IComponentComposite';
export declare class Class implements IComponentComposite {
    readonly componentKind: ComponentKind;
    readonly name: string;
    isAbstract: boolean;
    isStatic: boolean;
    constructorMethods: IComponentComposite[];
    members: IComponentComposite[];
    extendsClass: string | undefined;
    implementsInterfaces: string[];
    typeParameters: IComponentComposite[];
    dependencies: string[];
    constructor(name: string);
    toPUML(): string;
}
