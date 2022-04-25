import { WrapperKeys, StyleKeys, Params, defaultParams } from "./style.types"



/**
 * Helper method, determines scroll length for each child and 
 * which child is active based on supplied y and yfullview passed
 * in from component
 * 
 * @param y 
 * @param yFullView 
 * @param yFullViewExit 
 * @param numChildren 
 * @param stretch 
 * @returns 
 */
const findScrolls = 
    (y: number, yFullView: number,
        yFullViewExit:number, numChildren: number, stretch?: boolean) => {

    // Find length each child should share in scroll
    let childScrollLength = (100-yFullView- (stretch ? 0 : yFullView))/numChildren

    // Find which child has it's turn in the scroll
    let activeChild = y < 0 ? -1 :
        y > yFullViewExit && !stretch ? numChildren+1 : Math.floor(y/childScrollLength)

    // Find precentage the child has scrolled (within its scrol length)
    let activeChildScroll = y < 0 ? 0 :
        y > yFullViewExit && !stretch ? 0 : 
        (((y - yFullView) % childScrollLength) / childScrollLength) * 100

    return [childScrollLength, activeChild, activeChildScroll]
}

// handles scroll speed
const findScrollHeight = (params: any) => params.scrollViewPort ? 
    `context${params.scrollSpeed}` : `children${params.scrollSpeed}`

const getDefaults = (y: number, yFullView: number, params?: Params):
    [ number, Params] => {

    let yFullViewExit = 100-yFullView > yFullView ? 100-yFullView : yFullView

    if ( typeof params === 'undefined' || !params.numChildren) {
        console.error("ERROR: ", "Children Style Method didn't receive numChildren.")
        params = defaultParams
    } 
    
    //params = {...defaultParams, ...params}
    Object.keys(defaultParams)
        .forEach( (key) => {
        if (!params!.hasOwnProperty(key)) {
            params![key] = defaultParams[key]
        }
    })

    return [yFullViewExit, params]
}

const buildStylesFromParams = (y: number, yFullView: number, params: Params) => {

    let styles: StyleKeys = {}
    if(params.background) {
        styles.backgroundImage = `url(${params.background})`
        styles.backgroundPosition = "center"
        styles.backgroundSize = 'contain'
        styles.backgroundRepeat = 'no-repeat'
    } 
    
    if (params.fullScreen) {
        styles.height = "100vh"
        styles.width = "100%"

        if (y > 0) {
            styles.opacity = "0.8"
        }
    }

    return styles
}

        /* Make style div have height for more space between next slide
        * no height can make the presentation tighter feeling

        header could be created by making the 1st child sticky
        */

export const ChildrenConfig: { [functionName: string]: Function} = {

    empty (): [WrapperKeys, StyleKeys, StyleKeys[]] {
        let style: StyleKeys = {}
        let wrapperStyle: WrapperKeys = {}
        let childrenStyles: StyleKeys[] = []
        return [wrapperStyle,style, childrenStyles]
    },

    /**
     * Returns set of CSS to transition children based on the percentage
     * of scroll and the number of children.
     * 
     * By passing percentages, y and yFullView keep the amount of scroll
     * to transition a function of the component which can be simply the
     * height of the div
     */
    transition (y: number, yFullView: number, paramsArg?: Params ):
        [WrapperKeys,StyleKeys,StyleKeys[]] {

        // Sanitize 
        let [yFullViewExit, params] = getDefaults
            (y, yFullView, paramsArg)

        // TODO: do we need all this info?
        let [childScrollLength, activeChild, activeChildScroll] = 
            findScrolls(y,yFullView,yFullViewExit,params.numChildren,params.toEnd)

        // Build children css:
        let childCSS = new Array(params.numChildren).fill({}).map( (e,i) => {
            let css = {top: 0, 
                position: "absolute", opacity: "0", 
                transition: `opacity ${params.transitionSpeed ? params.transitionSpeed : 1}s`}

            if (i === activeChild) {
                css['opacity'] = "1"
            }

            return css
        })

        let stickyStyles = buildStylesFromParams(y,yFullView,params)

        return [{height: findScrollHeight(params), position: "relative" /*, border: "1px yellow solid"*/},
            {...stickyStyles, ...{position: "sticky", overflow: "visible", top: 0 /*,border: "1px red solid"*/}},
            childCSS]
    },
        /**
     * Returns set of CSS to transition children based on the percentage
     * of scroll and the number of children.
     * 
     * By passing percentages, y and yFullView keep the amount of scroll
     * to transition a function of the component which can be simply the
     * height of the div
     * 
     * Should use params.scrollViewPort and params.scrollSpeed if children
     * are small and mean to fit on one screen
     */
    alternateSlideIn (y: number, yFullView: number, paramsArg?: Params ):
        [WrapperKeys,StyleKeys,StyleKeys[]] {

        // Sanitize 
        let [yFullViewExit, params] = getDefaults
            (y, yFullView, paramsArg)

        // TODO: do we need all this info?
        let [childScrollLength, activeChild, activeChildScroll] = 
            findScrolls(y,yFullView,yFullViewExit,params.numChildren,params.toEnd)

        
        // Build children css:
        // This should be configurable based on params
        let childCSS = new Array(params.numChildren).fill({}).map( (e,i) => {
            let css:any = {top: 0,
                // not having transition when early in scroll prevents transition happening on first paint 
                transition: y < 0 - yFullView ? `` : `transform ${params.transitionSpeed ? params.transitionSpeed : 1}s`
            }

            if (i > activeChild) {
                css['transform'] = `translateX(-100%)`
            }

            // if static first child
            // let child act normally
            if (params.staticFirstChild && i===0) {
                delete css.transform
                delete css.transition
            }

            return css
        })

        let stickyStyles = buildStylesFromParams(y,yFullView,params)

        // TODO: need full browser position: sticky, why isn't WebKitPosition working?
        return [{height: findScrollHeight(params) , display: 'block', position: "relative" /*, border: "1px yellow solid"*/},
            {...stickyStyles, ...{WebkitPosition: "sticky", position: "sticky", overflow: "visible", top: 0 /*,border: "1px red solid"*/}},
            childCSS]
    },

    /**
     * Slidesin all children immediately. Doesn't increase scroll length.
     * Good for first page or any static page that you want to reveal
     * with animation 
     * 
     * Not Working: To make something like this work, need to implement
     * a way to supply more advanced CSS to the divs. Either through
     * selected pre-defined class or styled-components or a system
     * similar to styled-components
     * (https://stackoverflow.com/questions/1720320/how-to-dynamically-create-css-class-in-javascript-and-apply)
     * 
     * 
     * 
     * For users: The effect of this method can be achieved by building it into the
     * child div itself.
     */
    revealSlideIn (y: number, yFullView: number, paramsArg?: Params ):
        [WrapperKeys,StyleKeys,StyleKeys[]] {

        // Sanitize 
        let [yFullViewExit, params] = getDefaults
            (y, yFullView, paramsArg)

        let childCSS = new Array(params.numChildren).fill({}).map( (e,i) => {
            let css:any = {
                transform: 'translateX(-100%)'
            }
            if (y >= 0) {
                css['transition'] = `transform ${1.0 + i/10}s`
                css['transform'] = `translateX(-100%)`
            }
            return css
        })

        return [{height: 'context1', position: 'relative'},{position: 'sticky', overflow: 'visible', top: 0}, childCSS]        
    }
}

export default ChildrenConfig