import { ComponentKind } from '../Models/ComponentKind';
import { IComponentComposite } from '../Models/IComponentComposite';
export declare class Parameter implements IComponentComposite {
    readonly componentKind: ComponentKind;
    readonly name: string;
    hasInitializer: boolean;
    isOptional: boolean;
    parameterType: string;
    constructor(name: string);
    toPUML(): string;
}
