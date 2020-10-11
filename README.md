[![npm][npm-image]][npm-url]
[![standard][standard-image]][standard-url]

[npm-image]: https://img.shields.io/npm/v/react-class-hookable.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/react-class-hookable
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: http://npm.im/standard

###### changes

1.add support for arrow function formula `render`

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
import {hookable} from 'react-class-hookable';

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
              {/* complex ... */}
            </div>
        );
    }
    
}

export default hookable(ComplexComponent);
```
If you are using decorator, it can be more easy.
```typescript jsx
import React,{Component,useState,useCallback} from 'react';
import {hookable} from 'react-class-hookable';

@hookable
export default class ComplexComponent extends Component{
    //......
}
```
It is simple, you can use any hooks which is also using in your functional component now.

# before using

You should know it is not recommended to use hooks in the old class component. 
This usage is only temporary, so you'd better add an annotation like `//todo trans to functional component in future`.