import React, {useState, useEffect, useRef} from 'react'
import styled from 'styled-components'
import { createImportSpecifier } from 'typescript'

const PresentationDiv = styled.div`
    contain: paint;
  
`
export const PresentationContext = React.createContext({scroll: 0, height: 0})

/**
 * Options to program in:
 * 
 * Different transitions in/out
 * Hold time
 * Pre-presentation selection presentation or static
 * contents
 * buttons to advance to next slide
 * body scroll or div scroll
 * Groupings with options (divs that will move together as they scroll up page)
 * 
 * @param {*} props 
 * @returns 
 */
const Presentation = (props) => {

    

    const [scrollableHeight, setScrollableHeight] = useState(0)
    const childrenRefs = useRef(new Array())
    const presentationRef = useRef()
    const scrollRef = useRef()
    const [scrollTop, setScrollTop] = useState(0)
    const [scrolling, setScrolling] = useState(false)
    const [childClones, setChildClones] = useState([])
    const [childStartMap, setChildStartMap] = useState([])  // Contains the start of scroll
                                                            // for each child from main scroll

    useEffect(() => {
        const onScroll = e => {
          //setScrollTop(scrollRef.current.scrollTop);
          //setScrolling(scrollRef.current.scrollTop > scrollTop);
          setScrollTop(window.scrollY)
          setScrolling(window.scrollY > scrollTop)
        };
        //scrollRef.current.addEventListener("scroll", onScroll);
    
        document.addEventListener("scroll", onScroll)
        //return () => scrollRef.current.removeEventListener("scroll", onScroll);

        return () => document.removeEventListener("scroll",onScroll)
      }, [scrollTop]);

    useEffect( () => {

        // build Child cloned array

        if (Array.isArray(props.children) ) {
            setChildClones (props.children.map ( (c,i) => {
                return React.cloneElement(c, {scroll: scrollTop, ref: childrenRefs.current[i]})
            }))
        }

    },[props])

    useEffect ( () => {

        

        /*
        Array.isArray(props.children) && props.children.map( (c,i) => {
            console.log(c)
            return React.cloneElement(c, {ref: (ref) => childrenRefs.current.push(ref) })

            }
        )

        if(childrenRefs.length === props.children.length) {
            let totalLength = childrenRefs.reduce ( (a,b) => a + b.current.clientHeight,0)
            setScrollableHeight(totalLength)
        }*/
    },[childrenRefs])

    useEffect( () => {

        let startMap = []

        /* Contribution requested:
         * Hack applied to get the refs on the children after cloned. Putting them in cloneelement
         * either didn't work, or unable to figure out how to properly fire a useeffect
         * once they are are mounted. 
         * 
         * We should simply have to iterate over childrenRefs instead of pulling from children.
         * Not sure if this will pose a problem later.
         */
        if (presentationRef.current?.children.length) {
            let scrollHeight = 0
            for (let i = 0; i < presentationRef.current.children.length; i++) {
                let childHeight = presentationRef.current.children.item(i).clientHeight
                scrollHeight += childHeight
                startMap[i] = i===0 ? 0 : startMap[i-1] + childHeight
            }
            setScrollableHeight(scrollHeight)   // doesn't work because child heights can change
            setChildStartMap(startMap)
        }
    }, [childClones])

    return ( /*<div ref={scrollRef} style={{width: "100vw", height: "100vh", overflow: "scroll"}}>*/
            <PresentationDiv ref={presentationRef} scrollheight={scrollableHeight}>
                <PresentationContext.Provider value={{
                        scroll: scrollTop, 
                        height: window.innerHeight}}>
                        {childClones}
                </PresentationContext.Provider>
            </PresentationDiv>
            //</div>
    )
}

export default Presentation