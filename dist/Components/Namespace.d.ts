import { ComponentKind } from '../Models/ComponentKind';
import { IComponentComposite } from '../Models/IComponentComposite';
export declare class Namespace implements IComponentComposite {
    readonly name: string;
    readonly componentKind: ComponentKind;
    parts: IComponentComposite[];
    constructor(name: string);
    toPUML(): string;
}
