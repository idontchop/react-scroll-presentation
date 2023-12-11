import React, {useState, useEffect, useRef, useMemo} from 'react'
import pjson from '../../package.json';
import '../css/style.css';

export const PresentationContext = React.createContext({current: "",
     scroll: 0, scrollHeight: 0, height: 0,
     scrolling: false, viewRef: window,
     setScrollToSlide: (n:number|string)=>{n}, scrollToSlide: (n: number|string)=> {n}})

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
    const [initialHeight, setInitialHeight] = useState(0)
    const childrenRefs = useRef(new Array())
    const presentationRef:any = useRef()
    const scrollRef:any = useRef()
    const [scrollTop, setScrollTop] = useState(-1) // TODO: change scrollTop, scrolling, currentslide to usereducer
    const [scrolling, setScrolling] = useState(false)

    const childStartMap = useMemo( () => {

        let startMap:any = [0]
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
        }

        return startMap;
    }, [scrollTop])

    /** sets scroll depending on position in child map
    * if out of bounds, goes to furthest possible
    * include addTo for scrolling additional (necessary to land after transition) */
    const scrollToChildMap = (index: number, addTo?: number) => {
        index = (index < 0) ? 0 :
            (index >= childStartMap.length) ? childStartMap.length - 1 :
            index;

        let scrollToOptions = {left: 0, top: childStartMap[index],
             behavior: "auto"}
        if (props.fullscreen) {
            //window.scrollTo(scrollToOptions)  // wtf
            // TODO: Does this work if presentation isn't start?
            window.scrollTo(0, childStartMap[index])
        } else {
            scrollRef.current.scrollTo(scrollToOptions)
        }
    }

    const scrollToSlide = (slide: number|string, plusContext?: number) => {

        if (typeof slide === 'number') {
            
            if(slide < 0 || slide >= childStartMap.length) {
                console.error("scrollToSlide received slide out of bounds",0)
            } else {
                if (plusContext) scrollToChildMap(slide, window.innerHeight*plusContext)
                else scrollToChildMap(slide)
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
                console.error("scrollToSlide received unknown title")
            } else {
                if (plusContext) scrollToChildMap(i, window.innerHeight*plusContext)
                else scrollToChildMap(i)
            }

        }

    }

    let childClones: any = []; 

    if (Array.isArray(props.children) ) {
        childClones = props.children.map ( (c: any,i: number) => {
            return React.cloneElement(c, {key: c.key ?? c.props.title ?? i, startScroll: childStartMap[i],endScroll: childStartMap[i+1], ref: childrenRefs.current[i]})
        })
    } else if (props.children) {
        childClones = [React.cloneElement(props.children, {startScroll: 0, ref: childrenRefs.current[0]})]        
    } else {
        // do nothing: undefined, no children
    }

    const currentSlide = useMemo(() => {

        // set current title
        for(let i = 0; i < childStartMap.length; i++) {
            if(scrollTop >= childStartMap[i]) {
                if(i === (childStartMap.length - 1) || scrollTop < childStartMap[i+1]) {                    
                    return childClones[i].props?.title ? childClones[i].props.title : i;
                }
            }
        }

    }, [scrollTop]);

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

    const isScrolling: () => boolean = () => {
        if (props.fullscreen) return window.scrollY !== scrollTop
        else if (scrollRef?.current) return scrollRef.current.scrollY !== scrollTop
        else return false;
    }

    useEffect( () => {
        
        console.log("DEVELOPMENT: ", "react-scroll-presentation", pjson.version)
        console.log(presentationRef.current.children)
        console.log(props.children,React.isValidElement(props.children[0]) );

        setInitialHeight(window.innerHeight)
        
        if (props.fullscreen) {

            const onScroll = (e:any) => {
                setScrollTop(window.scrollY)
            };
        
            document.addEventListener("scroll", onScroll)

            return () => document.removeEventListener("scroll",onScroll)

        } else if (scrollRef?.current){

            const onScroll = (e:any) => {
                setScrollTop(scrollRef.current.scrollTop)
            }

            scrollRef.current.addEventListener("scroll", onScroll)

            return () => scrollRef?.current && scrollRef.current.removeEventListener("scroll", onScroll)

        }
        
    },[])

    if (props.fullscreen) {
        // fullscreen from props makes Presentation function as if full screen in view port
        return ( <div className='react-scroll-presentation' ref={presentationRef}>
                    <PresentationContext.Provider value={{
                            scroll: scrollTop, 
                            scrolling: isScrolling(),
                            viewRef: window,
                            setScrollToSlide: scrollToSlide, scrollToSlide,
                            current: currentSlide,
                            scrollHeight: scrollableHeight - initialHeight,
                            height: initialHeight}}>
                            {childClones}
                    </PresentationContext.Provider>
                </div> )
    } else {
        // without fullscreen prop, Presntation displays a scroll and acts independantly, scroll div can be passed a class for style
        return ( 
        <div style={props.style ?? {}} className={`react-scroll-presentation-scroll${props.className ? ' ' + props.className : ""}`} ref={scrollRef}>
            <div className='react-scroll-presentation' ref={presentationRef}>
                <PresentationContext.Provider value={{
                        scroll: scrollTop,
                        viewRef: scrollRef.current,
                        scrolling: isScrolling(),
                        setScrollToSlide: scrollToSlide, scrollToSlide,
                        current: currentSlide,
                        scrollHeight: scrollableHeight - 
                            scrollRef.current ? scrollRef.current.clientHeight : 0,
                        height: scrollRef.current ? scrollRef.current.clientHeight : 0}}>
                        {childClones}
                </PresentationContext.Provider>
            </div>
        </div> )

    }

}

export default Presentation