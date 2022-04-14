
interface StyleKeys  {
    transform?: string,
    right?: string,
    left?: string,
    position?: string,
    top?: number,
    overflow?: string,
    width?: string,
    border?: string,
    opacity?: string
}
// todo: DRY interfaces
interface WrapperKeys {
    height?: string,
    position?: string,
    border?: string
}

interface Params {
    [key: string]: any,
    numChildren: number,
    scrollViewPort?: boolean,  // true to adust scrollable area by viewport
    scrollSpeed?: number,      // How much to mulitply scrollable area, default 1
    toEnd?: boolean,           // transition should last to end of scroll
    toEndLastChild?: boolean,  // TODO last child should not transition away (scroll out instead)
    transitionSpeed?: number   // seconds to transition (injected to css transition)
}

const defaultParams: Params = {
    numChildren: 1,
    scrollSpeed: 1
}

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
    let activeChild = y < yFullView ? -1 :
        y > yFullViewExit && !stretch ? numChildren+1 : Math.floor((y - yFullView)/childScrollLength)
    
    // Find precentage the child has scrolled (within its scrol length)
    let activeChildScroll = y < yFullView ? 0 :
        y > yFullViewExit && !stretch ? 0 : 
        (((y - yFullView) % childScrollLength) / childScrollLength) * 100

    return [childScrollLength, activeChild, activeChildScroll]
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
    transition (y: number, yFullView: number, params?: Params ):
        [WrapperKeys,StyleKeys,StyleKeys[]] {

        let yFullViewExit = 100-yFullView > yFullView ? 100-yFullView : yFullView

        if ( typeof params === 'undefined' || !params.numChildren) {
            return [{},{},[]]
        } else {
            //params = {...defaultParams, ...params}
            Object.keys(defaultParams)
                .forEach( (key) => {
                if (!params.hasOwnProperty(key)) {
                    params[key] = defaultParams[key]
                }
            })
        }

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

        // handles scroll speed
        let scrollHeight = params.scrollViewPort ? 
            `context${params.scrollSpeed}` : `children${params.scrollSpeed}`

        return [{height: scrollHeight, border: "1px yellow solid", position: "relative"},
            {position: "sticky", overflow: "visible", top: 0,border: "1px red solid"},
            childCSS]
    }
}

export default ChildrenConfig