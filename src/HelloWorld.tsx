import React, {useState, useEffect, useRef } from "react"
import {PresentationContext} from "./components/Presentation" // can we get this from other module?

/**
 * Test presentation slide
 * 
 * @param props 
 * @returns 
 */
const HW = (props: { small?: boolean, title?: string, children?: JSX.Element | JSX.Element[] | string }) => {

    const bigHelloWorld = useRef<HTMLDivElement>(null)

    const context = React.useContext(PresentationContext)

    const [scrollPos, setScrollPos] = useState(0)
    window.addEventListener('scroll', (event) => {
        
    })

    const scrollTo = (index: number) => {
        console.log("scrollTo", index, context)
        context.setScrollToSlide(index)
    }

    useEffect( () => {
        if (bigHelloWorld && bigHelloWorld.current) { 
            setScrollPos(bigHelloWorld.current.scrollTop)
        }
    },[])
    
    return <div style={{height: props.small ? '100px' : '100vh', display: "flex", flexDirection: "column", justifyContent: "center"}}>
                    <button onClick={() => scrollTo(0)}>Scroll to 0</button>
                    <button onClick={() => context.setScrollToSlide(1)}>Scroll to 1</button>
            <p>{props.title ? props.title :
                context.current ? context.current : "unknown title"}</p>
            <p ref={bigHelloWorld} style={{textAlign: "center", fontSize: props.small ? '1em' : '5vw', margin: "auto"}}>
                {props.children ? props.children : "Hello World, react-scroll-presentation"}
                </p>

        </div>
}

export default HW;