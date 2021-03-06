import React, {useState, useEffect, useRef} from 'react'
import styled from 'styled-components'

const PresentationDiv = styled.div<{fullScreen?: boolean}>`
    contain: paint;
`

const ScrollDiv = styled.div`
    overflow-y: scroll;
    overflow-x: hidden;
`
export const PresentationContext = React.createContext({current: "",
     scroll: 0, scrollHeight: 0, height: 0, setScrollToSlide: (n:number|string)=>{n} })

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
const Presentation = (props: any) => {

    const [scrollableHeight, setScrollableHeight] = useState(0)
    const childrenRefs = useRef(new Array())
    const presentationRef:any = useRef()
    const scrollRef:any = useRef()
    const [scrollTop, setScrollTop] = useState(-1)
    const [scrolling, setScrolling] = useState(false)
    const [childClones, setChildClones] = useState([])
    const [childStartMap, setChildStartMap] = useState([])  // Contains the start of scroll
                                                            // for each child from main scroll
    const [currentSlide, setCurrentSlide] = useState("")    // = props.childen[x].title or x

    // sets scroll depending on position in child map
    // if out of bounds, goes to furthest possible
    const scrollToChildMap = (index: number) => {
        index = (index < 0) ? 0 :
            (index >= childStartMap.length) ? childStartMap.length - 1 :
            index;

        let scrollToOptions = {left: 0, top: childStartMap[index],
             behavior: "auto"}
        if (props.fullScreen) {
            //window.scrollTo(scrollToOptions)  // wtf
            window.scrollTo(0, childStartMap[index])
        } else {
            scrollRef.current.scrollTo(scrollToOptions)
        }
    }

    // calls scroll to child map after determining child to
    // scroll to. Accepts a string corresponding to title or
    // the index number
    // TODO: scrolling to childStartMap may scroll to empty screen
    // if there is a transition. Need a way to determine best scrollto
    const setScrollToSlide = (slide: number|string) => {

        if (typeof slide === 'number') {
            
            if(slide < 0 || slide >= childStartMap.length) {
                console.error("setScrollToSlide received slide out of bounds",0)
            } else {
                scrollToChildMap(slide)
            }

        } else {
            // looking for title of slide
            let i = 0
            for (; i < props.children.length; i++ ) {
                if ( props.children[i].props?.title && 
                    props.children[i].props.title === slide) {
                    break;
                }
            }

            if( i === props.children.length) {
                console.error("setScrollToSlide received unknown title")
            } else {
                scrollToChildMap(i)
            }

        }

    }

    useEffect(() => {

        // set current title
        for(let i = 0; i < childStartMap.length; i++) {
            if(scrollTop >= childStartMap[i]) {
                if(i === (childStartMap.length - 1) || scrollTop < childStartMap[i+1]) {
                    setCurrentSlide(props.children[i].props.title ? 
                        props.children[i].props.title : i)
                }
            }
        }

        if (props.fullScreen) {

            const onScroll = (e:any) => {
            //setScrollTop(scrollRef.current.scrollTop);
            //setScrolling(scrollRef.current.scrollTop > scrollTop);
            setScrollTop(window.scrollY)
            setScrolling(window.scrollY !== scrollTop)
            };
            //scrollRef.current.addEventListener("scroll", onScroll);
        
            document.addEventListener("scroll", onScroll)
            //return () => scrollRef.current.removeEventListener("scroll", onScroll);

            return () => document.removeEventListener("scroll",onScroll)

        } else if (presentationRef.current){

            const onScroll = (e:any) => {
                setScrollTop(scrollRef.current.scrollTop)
                setScrolling(scrollRef.current.scrollY !== scrollTop)
            }

            scrollRef.current.addEventListener("scroll", onScroll)

            return () => scrollRef.current.addEventListener("scroll", onScroll)

        }

      }, [scrollTop]);

    useEffect( () => {

        // build Child cloned array
        if (Array.isArray(props.children) ) {
            setChildClones (props.children.map ( (c: any,i: number) => {
                return React.cloneElement(c, {startScroll: childStartMap[i],endScroll: childStartMap[i+1], ref: childrenRefs.current[i]})
            }))
        } else if (props.children) {
            let c: any = [React.cloneElement(props.children, {startScroll: 0, ref: childrenRefs.current[0]})]
            setChildClones(c)
        } else {
            // do nothing: undefined, no children
        }

    },[props,childStartMap])

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

        let startMap:any = [0]

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
                let childHeight = presentationRef.current.children.item(i).scrollHeight
                scrollHeight += childHeight
                if (i < presentationRef.current.children.length - 1) {
                    startMap[i+1] = i===0 ? childHeight : startMap[i] + childHeight
                }
            }
            setScrollableHeight(scrollHeight)   // doesn't work because child heights can change
            //console.log(childStartMap, scrollableHeight, presentationRef.current.children.item(0),React.isValidElement(presentationRef.current.children.item(0)))
            setChildStartMap(prev => {
                // only update start map if changed as it will rerender children
                return prev.length===startMap.length &&
                    prev.every( (e,i) => e === startMap[i]) ? prev : startMap
            })
            
        }
    }, [childClones,scrollTop])

    useEffect( () => {
        let pjson = require('../../package.json')
        console.log("DEVELOPMENT: ", "react-scroll-presentation", pjson.version)
        console.log(presentationRef.current.children)
        console.log(props.children,React.isValidElement(props.children[0]), props.children[0].props );
    },[])

    if (props.fullScreen) {
        // fullScreen from props makes Presentation function as if full screen in view port
        return ( <PresentationDiv fullScreen ref={presentationRef}>
                    <PresentationContext.Provider value={{
                            scroll: scrollTop, 
                            setScrollToSlide: (s) => setScrollToSlide(s),
                            current: currentSlide,
                            scrollHeight: scrollableHeight - window.innerHeight,
                            height: window.innerHeight}}>
                            {childClones}
                    </PresentationContext.Provider>
                </PresentationDiv> )
    } else {
        // without fullScreen prop, Presntation displays a scroll and acts independantly
        return ( 
        <ScrollDiv ref={scrollRef} className={props.className ? props.className : ""}>
            <PresentationDiv style={{height: scrollableHeight}} ref={presentationRef}>
                <PresentationContext.Provider value={{
                        scroll: scrollTop, 
                        setScrollToSlide: (s) => setScrollToSlide(s),
                        current: currentSlide,
                        scrollHeight: scrollableHeight - 
                            scrollRef.current ? scrollRef.current.clientHeight : 0,
                        height: scrollRef.current ? scrollRef.current.clientHeight : 0}}>
                        {childClones}
                </PresentationContext.Provider>
            </PresentationDiv>
        </ScrollDiv> )

    }

    
}

export default Presentation