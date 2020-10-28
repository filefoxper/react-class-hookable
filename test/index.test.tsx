import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import {
    LifeCycleAndHooks,
    LifeCycleMixinHooks,
    OnlyHooks,
    OwnRenderPropHooks,
    ExtendsSelfDefinedComponent,
    HasOwnRendPropExtendsSelfDefinedComponent,
    WithoutRender,
    OwnRenderPropNotArrowCallback
} from "./patterns";

describe('test only hooks', () => {

    test('hooks with useEffect', () => {
        const {container} = render(<OnlyHooks/>);
        expect(container.getElementsByTagName('span')[0].innerHTML).toBe('mounted');
    });

    test('hook with useState', () => {
        const {container} = render(<OnlyHooks/>);
        fireEvent.click(screen.getByText('button'));
        expect(container.getElementsByTagName('span')[1].innerHTML).toBe('1');
    });

    test('hook with self-defined hook', () => {
        const {container} = render(<OnlyHooks/>);
        fireEvent.click(screen.getByText('button:2'));
        expect(container.getElementsByTagName('span')[2].innerHTML).toBe('2');
    });

});

describe('test life cycle with hooks', () => {

    test('lifecycle with componentDidMount', () => {
        const {container} = render(<LifeCycleAndHooks/>);
        expect(container.getElementsByTagName('span')[0].innerHTML).toBe('mounted');
    });

    test('hook with useState', () => {
        const {container} = render(<LifeCycleAndHooks/>);
        fireEvent.click(screen.getByText('button'));
        expect(container.getElementsByTagName('span')[1].innerHTML).toBe('1');
    });

    test('hook with self-defined hook', () => {
        const {container} = render(<LifeCycleAndHooks/>);
        fireEvent.click(screen.getByText('button:2'));
        expect(container.getElementsByTagName('span')[2].innerHTML).toBe('2');
    });

});

describe('test life cycle mixin hooks', () => {

    test('this.setState and useState->setState with useEffect', () => {
        const {container} = render(<LifeCycleMixinHooks/>);
        expect(container.getElementsByTagName('span')[0].innerHTML).toBe('start');
        expect(container.getElementsByTagName('input')[0].value).toBe('start');
    });

    test('hook with handle change', () => {
        const {container} = render(<LifeCycleMixinHooks/>);
        fireEvent.change(container.getElementsByTagName('input')[0], {target: {value: 'starttest'}});
        expect(container.getElementsByTagName('span')[0].innerHTML).toBe('starttest');
        expect(container.getElementsByTagName('input')[0].value).toBe('starttest');
    });

});

describe('test own render prop with hooks', () => {

    test('this.setState and useState->setState with useEffect', () => {
        const {container} = render(<OwnRenderPropHooks/>);
        expect(container.getElementsByTagName('span')[0].innerHTML).toBe('mounted');
    });

    test('hook with handle change', () => {
        const {container} = render(<OwnRenderPropHooks/>);
        fireEvent.change(container.getElementsByTagName('input')[0], {target: {value: 'starttest'}});
        expect(container.getElementsByTagName('input')[0].value).toBe('starttest');
        expect(container.getElementsByTagName('span')[1].innerHTML).toBe('starttest');
    });

});

describe('test extends self defined component with hooks', () => {

    test('hook useEffect in hookable hoc', () => {
        expect(()=>{
            render(<ExtendsSelfDefinedComponent/>);
        }).toThrow();
    });

    test('hook useEffect in hookable hoc with hasOwnRendProp param', () => {
        const {container}=render(<HasOwnRendPropExtendsSelfDefinedComponent/>);
        const mountedText=container.getElementsByTagName('div')[0].innerHTML;
        expect(mountedText).toBe('mounted');
    });

});

describe('test component without render method',()=>{

    test('hookable on no render component',()=>{
        expect(()=>render(<WithoutRender/>)).toThrow();
    });

});

describe('test render is own prop but not arrow callback',()=>{

    test('hookable on component which render is own prop but not arrow callback',()=>{
        const {container}=render(<OwnRenderPropNotArrowCallback/>);
        const mountedText=container.getElementsByTagName('div')[0].innerHTML;
        expect(mountedText).toBe('mounted');
    });

});
