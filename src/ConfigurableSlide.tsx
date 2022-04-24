import React, {useState, useEffect, useRef} from 'react'
import Slide from './components/Slide.type'
import {PresentationContext} from './components/Presentation'
import { StyleKeys, WrapperKeys} from './lib/style.types'
import {StyleConfig} from './lib/StyleConfig'
import {ChildrenConfig} from './lib/ChildrenConfig'

interface ConfigureableSlideProps {
    children?: JSX.Element | JSX.Element[] ,
    slideIn?: any,
    slideMe?: Slide,
    transition?: any,
    alternateSlideIn?: any,
    revealSlideIn?: any,
    fadeOut?: any,
    header?: any,
    startScroll?: number,
    title?: string,
    testOverWrite?: {},
    springIn?: any

}


/**
 * Slides:
 * 
 *  1) Appear and fade out - For welcome screen. Will show full screen and fade out when
 * scrolled through. 
 */
const ConfigurableSlide = ( props: ConfigureableSlideProps ) => {

    // inner class, has most transition elements
    const ref = useRef<HTMLDivElement>(null)
    // outer class, handles length of scroll
    const wrapperRef = useRef<HTMLDivElement>(null)
    // a percentage that indicates the amount of scroll for this slide
    const [y,setY] = useState(0)        
    // a percentage that indicates when slide is in full view
    // If this is 0, the slide is smaller than the viewport so won't have scroll effect
    const [yFullView, setYFullView] = useState(0)

    // context from Presentation, [scroll,height] of Presentation Div or viewport
    const context = React.useContext(PresentationContext)

    // style state
    const [wrapperStyle, setWrapperStyle] = useState({})
    const [divStyle, setDivStyle] = useState({})
    const [childrenStyles, setChildrenStyles] = useState([])

    // true if visible at all
    const inView = () => wrapperRef.current && 
        context.scroll >= wrapperRef.current.offsetTop - context.height &&
        context.scroll <= wrapperRef.current.offsetTop + wrapperRef.current.clientHeight

    const findChildrenHeightSum = (refWithChildren: any) => {
        let heightSum = 0
        if (refWithChildren.current) {

            for (let i =0; i < refWithChildren.current.children.length; i++) {
                heightSum += refWithChildren.current.children.item(i).clientHeight
            }

        }
        return heightSum
    }

    /**
     * Converts a height string from StyleConfig to applicable height
     * Two choices:
     * contextX = X * context.height
     * childrenX = X * ref.current.clientHeight
     * 
     * TODO: fix to support fractions
     * 
     * If parameter doesn't match one of the two, returns 100%
     * @param h string
     */
    const convertHeight = (h?: string) => {
        if (!h) return "100%"
        let [by,multiplier] = h.split(/(context|children)(\d)$/).filter(Boolean)

        if (['context','children'].includes(by)) {

            let childrenHeightSum = findChildrenHeightSum(ref)
            return by === 'context' ? 
                context.height ? `${context.height * parseInt(multiplier)}px` : "100%" :
                ref.current ? `${childrenHeightSum * parseInt(multiplier)}px` : "100%"
        } else {
            // Style must be set by helper
            return h
        }
    }

    /**
     * Builds wrapperStyles and divStyles based on the order of the props
     * 
     * The prop key must exist in StyleConfig. The value is passed to StyleConfig
     * with y and yFullView
     * @param props ConfigureableSlideProps
     */
    const buildStyles = (props: any) => {

        let propKeys = Object.keys(props).filter( e => Object.keys(StyleConfig).includes(e))
        
        let result = StyleConfig['empty']()
        if (propKeys.length > 0) {
            result = propKeys.map( method => {
                return StyleConfig[method](y,yFullView,props[method])            
            })

            // merge keys. Merge in order in props. Later calls overwrite earlier
            result = result.reduce( (a: any,b: any) => [Object.assign(a[0],b[0]),Object.assign(a[1],b[1])])
        }

        return result
    }

    const buildChildrenStyles = (props:any) => {

        let propKeys = Object.keys(props).filter( e => Object.keys(ChildrenConfig).includes(e))

        let result = ChildrenConfig['empty']()

        let numChildren = props.children && Array.isArray(props.children) ?
            props.children.length : 1

        if (propKeys.length > 0) {
            result = propKeys.map( method => {

                // pick interface values from (not used, too hard to maintain)
                //let params = (({toEnd, toEndLastChild, transitionSpeed}) =>
                //    ({toEnd,toEndLastChild, transitionSpeed}))(props[method])
                return ChildrenConfig[method](y,yFullView,
                    {numChildren: numChildren, ...props[method]  })            
            })

            // merge keys. Merge in order in props. Later calls overwrite earlier
            result = result.reduce( (a: any,b: any) => [Object.assign(a[0],b[0]),Object.assign(a[1],b[1])])
        }

        return result
    }

    /**
     * Runs on change of context. Context is supplied by Presentation has the height of the
     * Presentation div (or viewport), and the current scroll position.
     * 
     * On change, sets the Y and YFullView states if this Slide is InView
     * 
     * Afterward, useEffect for y,yFullView will update style objects
     */
    useEffect( () => {

        // removed inView() check for now as it made transitions difficult
        // alternative could be a 'first paint' call at start
        if (wrapperRef.current /*&& inView()*/ && typeof props.startScroll !== "undefined") {

            // problem is wrapperRef is not yet modified by styleConfig on initial load
            // causing yFullView to always be 0

            let scrollDepth =   context.scroll - (wrapperRef.current.offsetTop - context.height)
            process.env.NODE_ENV === 'development' && console.log(scrollDepth, [((context.scroll-props.startScroll) / (wrapperRef.current.scrollHeight)) * 100,( context.height / wrapperRef.current.scrollHeight ) * 100 ],
            (scrollDepth / (wrapperRef.current.clientHeight + context.height)) * 100,context.scroll, props.startScroll,wrapperRef.current.scrollHeight)
            //setY( (scrollDepth / (wrapperRef.current.clientHeight + context.height)) * 100)
            if (typeof props.startScroll !== "undefined") {
                setY( ((context.scroll-props.startScroll) / (wrapperRef.current.scrollHeight)) * 100)
            } else {
                // start of scroll
                setY(0)
            }
            // full view usually at 0. only when start, this formula still holds the start of Y in negative
            // And will also hold when the end is clipped
            // when clientHeight is less than viewport, can be
            setYFullView( // if wrapper is bigger than view, find percentage of scroll it fills view
                        // else start transitions immediately
                context.height <= wrapperRef.current.scrollHeight ? 
                ( context.height / wrapperRef.current.scrollHeight ) * 100  
                : 0)

        }
        
    },[context.scroll,context.height])

    /**
     * Fires after scroll change and position updated. Method names from props contained in
     * from ChildrenConfig.ts and StyleConfig.ts will build the style divs.
     * 
     * Styles from ChildrenConfig will overwrite StyleConfig if duplicates exist. 
     */
    useEffect( () => {

        let [wrapper,div] = buildStyles(props)

        wrapper['height'] = wrapper.height ? convertHeight(wrapper.height) : "100%" 

        let [childrenWrapper, childrenStyleDiv, childrenDivs] = buildChildrenStyles(props)

        if (childrenWrapper['height']) {
            childrenWrapper['height'] = convertHeight(childrenWrapper.height)
        }

        setWrapperStyle(Object.assign(wrapper,childrenWrapper))
        setDivStyle(Object.assign(div,childrenStyleDiv))
        setChildrenStyles(childrenDivs)
        

    },[y,yFullView])


    /*
    Finished adding startMap to each child of a presentation.
    This will help to set the Y coords, so we can make a slide
    be sticky in presentation */

    return <div ref={wrapperRef} style={wrapperStyle}>
        <div ref={ref} style={divStyle}>
        {props.header && <div style={{position: "sticky", top: 0, border: 0, padding: 0, margin: 0}}>
            {props.header}
            </div>}
        {React.Children.map(props.children, (e,i) => {
            let childStyle = i < childrenStyles.length ? childrenStyles[i] : {}
            return <div style={childStyle}>
                {typeof e !== 'undefined' ? React.cloneElement(e) : undefined}
                </div>
        })}
    </div></div>

}

export default ConfigurableSlide;