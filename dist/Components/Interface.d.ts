import { ComponentKind } from '../Models/ComponentKind';
import { IComponentComposite } from '../Models/IComponentComposite';
export declare class Interface implements IComponentComposite {
    readonly componentKind: ComponentKind;
    readonly name: string;
    members: IComponentComposite[];
    extendsInterface: string[];
    typeParameters: IComponentComposite[];
    constructor(name: string);
    toPUML(): string;
}
