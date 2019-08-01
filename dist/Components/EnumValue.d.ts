import { ComponentKind } from '../Models/ComponentKind';
import { IComponentComposite } from '../Models/IComponentComposite';
export declare class EnumValue implements IComponentComposite {
    readonly componentKind: ComponentKind;
    readonly name: string;
    value: string | undefined;
    constructor(name: string);
    toPUML(): string;
}
