import React, {useState, useEffect, useRef} from 'react'
import Slide from './Slide.type'
import {PresentationContext} from './Presentation'

/**
 * Used to test and develop ConfigurableSlide.
 * 
 * Calling will have unpredictable results.
 * 
 * @author Nathan Dunn
 * @param props 
 * @returns 
 */
const HorizontalTest = ( props: Slide ) => {

    const ref = useRef<HTMLDivElement>(null)
    const wrapperRef = useRef<HTMLDivElement>(null)
    const [x,setX] = useState(0)
    const [xFullView, setXFullView] = useState(0)
    const context = React.useContext(PresentationContext)

    useEffect( () => {
        if (wrapperRef.current && inView()) {
            let scrollDepth =   context.scroll - (wrapperRef.current.offsetTop - context.height)
            setX( (scrollDepth / (wrapperRef.current.clientHeight + context.height)) * 100)
            setXFullView( // if wrapper is bigger than view, find percentage of scroll it fills view
                        // else start transitions immediately
                context.height < wrapperRef.current.clientHeight ? 
                ( context.height / wrapperRef.current.clientHeight ) * 100 
                : 0)
            console.log(x, xFullView, wrapperRef.current.clientHeight, context.height )
        }
        
    },[context.scroll])

    // needs rethinking/testing
    const inView = () => wrapperRef.current && 
                    context.scroll >= wrapperRef.current.offsetTop - context.height &&
                    context.scroll <= wrapperRef.current.offsetTop + wrapperRef.current.clientHeight
        
    let slideBy = 100    // slideby and the size of the wrapper configured based on
                        // how long the content should appear

                        // translateMe is one of the methods that can be used
                        // based on config
    const translateMe = () =>  {
        if (x < xFullView) return -100
        if (x > slideBy) return 0

        return props && props.right ? 
            100-( ( (x-xFullView) / (slideBy - xFullView) ) * 100  )
            :  -100 + ( ( (x-xFullView) / (slideBy - xFullView) ) * 100  )
    }

    const slideMe = () => {

        if (x < xFullView) return -100
        if (x > slideBy) return 0

        return props && props.right ? 
        100-( ( (x-xFullView) / (slideBy - xFullView) ) * 200  )
        :  -100 + ( ( (x-xFullView) / (slideBy - xFullView) ) * 200  )

    }


    return <div ref={wrapperRef} style={{border: "1px solid green", height: ref.current ? `${ref.current.clientHeight}px` : "100%"}}>
        <div ref={ref} style={{right: props && props.right ? "-50%" : "50%", transform: `translateX(${slideMe()}%)`, position: "sticky", top: "0", overflow: 'hidden', width: "100%"}}>
        {props.children}
    </div></div>

}

export default HorizontalTest;