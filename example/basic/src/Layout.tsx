import React, {Component, useCallback, useEffect, useState} from 'react';
import {Button} from "antd";
import hookable,{hookDecorator,withHookable} from "react-class-hookable";

@withHookable()
class ArrowRender extends Component{

    renderButton=()=>{
        const [count,setCount]=useState(0);

        const handleCount=useCallback(()=>{
            setCount(c=>c+1);
        },[]);

        return <Button onClick={handleCount}>render function: {count}</Button>
    };

    render=()=>{

        const [count,setCount]=useState(0);

        const handleCount=useCallback(()=>{
            setCount(c=>c+1);
        },[]);

        return (
            <div>
                <Button onClick={handleCount}>arrow: {count}</Button>
                {this.renderButton()}
            </div>
        );
    }

}

class Layout extends Component<any,{count:number}>{

    state={count:0};

    handleStateCountAdd=()=>{
        this.setState({count:this.state.count+1});
    };

    render(){

        const {count:stateCount}=this.state;

        //hooks
        const [hookCount,setHookCount]=useState(0);

        const handleHookCountAdd=useCallback(()=>{
            setHookCount((c)=>c+1);
        },[]);

        //mixed with class method is not recommend
        useEffect(()=>{
            this.setState({count:1});
        },[]);

        return (
            <div>
                <div>
                    <Button onClick={this.handleStateCountAdd}>use class handler</Button>
                    <span>this.state.count: {stateCount}</span>
                </div>
                <div>
                    <Button onClick={handleHookCountAdd}>use hook handler</Button>
                    <span>hook count: {hookCount}</span>
                </div>
                <ArrowRender/>
            </div>
        );
    }

}

export default hookable(Layout);