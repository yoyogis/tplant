import { ComponentKind } from '../Models/ComponentKind';
import { IComponentComposite } from '../Models/IComponentComposite';
export declare class TypeParameter implements IComponentComposite {
    readonly componentKind: ComponentKind;
    readonly name: string;
    constraint: string | undefined;
    constructor(name: string);
    toPUML(): string;
}
