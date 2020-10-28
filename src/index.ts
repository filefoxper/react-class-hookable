import {
    Component,
    ComponentClass,
    ComponentState,
    createElement,
    FunctionComponent,
    PureComponent,
    ReactElement
} from "react";

export default function hookable<P = {}, S = ComponentState>(SourceClass: ComponentClass<P, S>,hasOwnRenderProp?:boolean): ComponentClass<P, S> {
    const sourceRender = SourceClass.prototype.render;

    if (!sourceRender||hasOwnRenderProp) {
        class ProxyComponent extends SourceClass {

            constructor(props: P, context?: any) {
                super(props, context);
                const sourceRender = this.render;
                if (!sourceRender) {
                    throw new Error('The hookable HOC only can be used on a class component which has a render method.');
                }
                const ProxyFunctionalCompo: FunctionComponent = () => {
                    return sourceRender.call(this) as ReactElement<any> | null;
                };
                this.render = () => {
                    return createElement(ProxyFunctionalCompo);
                }
            }

        }

        return ProxyComponent;
    }

    const FunctionalCompo = function ({target}: { target: Component | PureComponent }) {
        return sourceRender.call(target);
    };

    SourceClass.prototype.render = function () {
        return createElement(FunctionalCompo, {target: this});
    };

    return SourceClass;

}