import { ComponentKind } from '../Models/ComponentKind';
import { IComponentComposite } from '../Models/IComponentComposite';
import { Modifier } from '../Models/Modifier';
export declare class Method implements IComponentComposite {
    readonly componentKind: ComponentKind;
    readonly name: string;
    parameters: IComponentComposite[];
    returnType: string;
    modifier: Modifier;
    isAbstract: boolean;
    isOptional: boolean;
    isStatic: boolean;
    constructor(name: string);
    toPUML(): string;
}
