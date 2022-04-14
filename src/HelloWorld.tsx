import React, {useState, useEffect, useRef } from "react"

/**
 * Test presentation slide
 * 
 * @param props 
 * @returns 
 */
const HW = (props: { title: string, children?: JSX.Element | JSX.Element[] | string }) => {

    const bigHelloWorld = useRef<HTMLDivElement>(null)

    const [scrollPos, setScrollPos] = useState(0)
    window.addEventListener('scroll', (event) => {
        
    })

    useEffect( () => {
        if (bigHelloWorld && bigHelloWorld.current) { 
            setScrollPos(bigHelloWorld.current.scrollTop)
        }
    },[])
    
    return <div style={{height: '100vh', display: "flex", flexDirection: "column", justifyContent: "center"}}>

            <p>{props.title}</p>
            <p ref={bigHelloWorld} style={{textAlign: "center", fontSize: '5em', margin: "auto"}}>
                {props.children ? props.children : "Hello World, react-scroll-presentation"}
                </p>

        </div>
}

export default HW;