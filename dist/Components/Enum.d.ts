import { ComponentKind } from '../Models/ComponentKind';
import { IComponentComposite } from '../Models/IComponentComposite';
export declare class Enum implements IComponentComposite {
    readonly componentKind: ComponentKind;
    readonly name: string;
    values: IComponentComposite[];
    constructor(name: string);
    toPUML(): string;
}
