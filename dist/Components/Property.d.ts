import { ComponentKind } from '../Models/ComponentKind';
import { IComponentComposite } from '../Models/IComponentComposite';
import { Modifier } from '../Models/Modifier';
export declare class Property implements IComponentComposite {
    readonly componentKind: ComponentKind;
    readonly name: string;
    modifier: Modifier;
    returnType: string;
    isAbstract: boolean;
    isOptional: boolean;
    isStatic: boolean;
    constructor(name: string);
    toPUML(): string;
}
