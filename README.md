[![npm][npm-image]][npm-url]
[![standard][standard-image]][standard-url]

[npm-image]: https://img.shields.io/npm/v/react-class-hookable.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/react-class-hookable
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: http://npm.im/standard

# problem

Make react class component hook-able. Sometimes, transforming class component to a functional component is not a easy work,
but, if not, we can not use react-hooks (or custom hooks) in the old class component. So, 
how to use hooks in class component just like in functional component? 

# resolver

The tool 'react-class-hookable' contains a simple high order component. You can use it to resolve the problem.
And it is simple enough, you can view the source code for seconds.  

# install
```
npm install --save react-class-hookable
```

# usage

[view example](https://github.com/filefoxper/react-class-hookable/tree/master/example/basic)

```typescript jsx
import React,{Component,useState,useCallback} from 'react';
import hookable from 'react-class-hookable';

class ComplexComponent extends Component{
    
    state = {...};
    
    componentDidMount(){
        // doing ......
    }
    
    componentDidUpdate(){
        // doing ......
    }
    
    handleEvent = ()=>{
        this.setState({...});
    };
    
    complexRender=()=>{
        const [count,setCount] = useState(0);
                
        const handleAddCount = useCallback(()=>{
            setCount((c)=>c+1);
        },[]);
        return (
            <button onClick={handleAddCount}>function render:{count}</button>
        );
    };
    
    render(){
        const state = this.state;
        const props = this.props;
        //use hook just like how using in functional component
        const [count,setCount] = useState(0);
        
        const handleAddCount = useCallback(()=>{
            setCount((c)=>c+1);
        },[]);
        
        return (
            <div>
              <button onClick={handleAddCount}>hook count: {count}</button>
              <button onClick={this.handleEvent}>run event</button>
              {this.complexRender()}
            </div>
        );
    }
    
}

export default hookable(ComplexComponent);
```
If you are using decorator, it can be more easy.
```typescript jsx
import React,{Component,useState,useCallback} from 'react';
import {withHookable} from 'react-class-hookable';

@withHookable()
export default class ComplexComponent extends Component{
    //......
}
```
It is simple, you can use any hooks which is also using in your functional component now.

# api

#### hookable
```typescript jsx
export default function hookable<P = {}, S = ComponentState>(
    SourceClass: ComponentClass<P, S>,
    hasOwnRenderProp?:boolean
): ComponentClass<P, S>
```
`hookable` has an optional param `hasOwnRenderProp`, if you want the `render` function in component own props always invokes,
you can set it a `true` value. If not `hookable` will auto select the `render` function. 

(
`hookable` auto select will find out a `render` function in the prototype of your component class first,
if exist, it will use it, if not it will use the own property `render` function or throw an unavailable exception
)

#### hookable.currying
```typescript jsx
type HookableCurryingCallback<P = {}, S = ComponentState> = (SourceClass: ComponentClass<P,S>) => ComponentClass<P,S>;

function currying(hasOwnRenderProp?: boolean):HookableCurryingCallback
```
This is the currying function for `hookable`, you can use `hasOwnRenderProp config` to create a factory
`hookable` function.
###### ~~hookDecorator~~ (deprecated)

`hookDecorator` is deprecated, but still works, we recommend you to use `withHookable`.

#### withHookable
```typescript jsx
export function withHookable(hasOwnRenderProp?: boolean):Function
```

usage

```typescript jsx
import React,{Component} from 'react';
import {withHookable} from 'react-class-hookable';

@withHookable
class Comp extends Component{
    
}
```
If you are using typescript, you may find `incompatible warnings`, so here is a new decorator function for you.

# before using

You should know it is not recommended to use hooks in the old class component. 
This usage is only temporary, so you'd better add an annotation like `//todo trans to functional component in future`.