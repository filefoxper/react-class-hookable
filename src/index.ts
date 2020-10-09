import {Component, ComponentClass, ComponentState, createElement, PureComponent} from "react";

export default function hookable<P = {}, S = ComponentState>(SourceClass: ComponentClass<P, S>): ComponentClass<P, S> {
    const sourceRender = SourceClass.prototype.render;

    const FunctionalCompo = function ({target}: { target: Component | PureComponent }) {
        return sourceRender.call(target);
    };

    SourceClass.prototype.render = function () {
        return createElement(FunctionalCompo, {target: this});
    };

    return SourceClass;
}