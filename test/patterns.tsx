import React, {ChangeEvent, Component, PureComponent, RefObject, useCallback, useEffect, useRef, useState} from "react";
import hookable, {hookDecorator,withHookable} from "../src";

//self-defined hook : +2
const useEvenCount = (initial: number): [number, () => any] => {
    const recompute = useCallback((init: number) => {
        return init % 2 ? init + 1 : init;
    }, []);
    const [even, setEven] = useState(recompute(initial));
    return [
        even,
        useCallback(() => {
            setEven((e) => recompute(e) + 2);
        }, [])
    ]
};

class OnlyHooks_ extends Component {

    render() {
        //useEffect
        const [mounted, setMounted] = useState(false);

        useEffect(() => {
            setMounted(true);
        }, []);
        //useState
        const [count, setCount] = useState(0);

        const handleAddCount = useCallback(() => {
            setCount((c) => c + 1);
        }, []);
        //self-defined hook
        const [even, next] = useEvenCount(0);

        return (
            <div>
                <span>{mounted ? 'mounted' : 'not mounted'}</span>
                <button onClick={handleAddCount}>button</button>
                <span style={{marginLeft: 8}}>{count}</span>
                <button onClick={next}>button:2</button>
                <span>{even}</span>
            </div>
        );
    }

}

const OnlyHooks = hookable(OnlyHooks_);

class LifeCycleAndHooks_ extends Component<any, { mounted: boolean }> {

    state = {mounted: false};

    componentDidMount(): void {
        this.setState({mounted: true});
    }

    render() {
        const {mounted} = this.state;
        //useState
        const [count, setCount] = useState(0);

        const handleAddCount = useCallback(() => {
            setCount((c) => c + 1);
        }, []);
        //self-defined hook
        const [even, next] = useEvenCount(0);
        return (
            <div>
                <span>{mounted ? 'mounted' : 'not mounted'}</span>
                <button onClick={handleAddCount}>button</button>
                <span style={{marginLeft: 8}}>{count}</span>
                <button onClick={next}>button:2</button>
                <span>{even}</span>
            </div>
        );
    }

}

const LifeCycleAndHooks = hookable(LifeCycleAndHooks_);

@withHookable()
class LifeCycleMixinHooks extends PureComponent<any, { text: string }> {

    state = {text: ''};

    inputRef: RefObject<HTMLInputElement> = React.createRef();

    componentDidMount(): void {
        if (this.inputRef.current) {
            this.inputRef.current.focus();
        }
    }

    handleInputChange = (text: string) => {
        this.setState({text});
    };

    render() {

        const {text: stateText} = this.state;

        const [text, setText] = useState('');

        const handleTextChange = useCallback((t) => {
            const value = typeof t === 'string' ? t : t.target.value;
            setText(value);
            this.handleInputChange(value);
        }, []);

        useEffect(() => {
            handleTextChange('start');
        }, []);

        return (
            <div>
                <input type="text" ref={this.inputRef} value={text} onChange={handleTextChange}/>
                <span>{stateText}</span>
            </div>
        );
    }

}

class OwnRenderPropHooks_ extends Component<any, { mounted: boolean }> {

    state = {mounted: false};

    render = () => {

        const {mounted} = this.state;

        const [text, setText] = useState('');

        const handleTextChange = useCallback((t) => {
            const value = t.target.value;
            setText(value);
        }, []);

        useEffect(() => {
            this.setState({mounted: true});
        }, []);

        return (
            <div>
                <span>{mounted ? 'mounted' : 'unmounted'}</span>
                <input type="text" value={text} onChange={handleTextChange}/>
                <span>{text}</span>
            </div>
        );
    }

}

const OwnRenderPropHooks = hookable(OwnRenderPropHooks_);

class Parent extends Component{

    render(){
        return (
            <div>parent</div>
        );
    }

}

class ExtendsSelfDefinedComponent_ extends Parent{

    render=()=>{
        //useState
        const [mounted, setMounted] = useState(false);

        useEffect(()=>{
            setMounted(true);
        },[]);

        return (
            <div>
                {mounted?'mounted':'unmounted'}
            </div>
        );
    }

}

const ExtendsSelfDefinedComponent=hookable(ExtendsSelfDefinedComponent_);

const HasOwnRendPropExtendsSelfDefinedComponent=hookable(ExtendsSelfDefinedComponent_,true);

class WithoutRender_ extends Component{

}

const WithoutRender=hookable(WithoutRender_);

class OwnRenderPropNotArrowCallback_ extends Component<any>{

    constructor(props:any){
        super(props);
        this.render=function () {

            const [mounted,setMounted]=useState(false);

            useEffect(()=>{
                setMounted(true);
            },[]);

            return (
                <div>{mounted?'mounted':'unmounted'}</div>
            )
        }
    }

}

const OwnRenderPropNotArrowCallback=hookable(OwnRenderPropNotArrowCallback_);

export {
    OnlyHooks,
    LifeCycleAndHooks,
    LifeCycleMixinHooks,
    OwnRenderPropHooks,
    ExtendsSelfDefinedComponent,
    HasOwnRendPropExtendsSelfDefinedComponent,
    WithoutRender,
    OwnRenderPropNotArrowCallback
}