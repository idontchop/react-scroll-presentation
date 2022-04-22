import { WrapperKeys, StyleKeys, StyleParams } from "./style.types"

const defaultParams: StyleParams = {
    hold: 1,
    slideBy: 20
}

const getDefaults = (params: StyleParams) => {

    if ( typeof params !== 'object' ) {
        params = defaultParams
    } else {
        //params = {...defaultParams, ...params}
        Object.keys(defaultParams)
            .forEach( (key: string) => {
            if (!params.hasOwnProperty(key)) {
                params[key] = defaultParams[key]
            }
        })
    }

    return [params]
}
/**
 * params options: hold, right
 * use defaultParams?
 * 
 */
export const StyleConfig: { [functionName: string]: Function} = {
    empty (): [Object: WrapperKeys, Object: StyleKeys] {
        let style: StyleKeys = {}
        let wrapperStyle: WrapperKeys = {}
        return [wrapperStyle,style]
    },
    // fadeOut is designed to let the div still be visible and fading when the slide
    // below is in view, params.hold = 2 (default) will finish fade when
    // next slide is fully scroll in
    fadeOut (y: number, yFullView: number, params?: any):
        [Object: WrapperKeys, Object: StyleKeys] {

        params = getDefaults(params)

        let height = params.hold ? `context${params.hold}` : `context1`
        let wrapperStyle: WrapperKeys = {height: height, position: "sticky", top: 0, border: "2px solid green"}
        let style: StyleKeys = {width: "100%", position: "absolute", border: "1px solid yellow"}

        let slideBy = yFullView/5

        process.env.NODE_ENV === 'development' && console.log("y:", y, "yFullView:", yFullView)
        if (y > 100) {
            style['zIndex'] = '-9999'
            style['opacity'] = "0"
        } else if (y > slideBy) {
            style['opacity'] = `${ ((100-slideBy) - (y-slideBy)) / (100-slideBy)}`
        }

        return [wrapperStyle,style]
    },
    slideIn (y: number ,yFullView: number ,params?: any ):
        [Object: WrapperKeys, Object: StyleKeys] {

        if ( typeof params === 'undefined') {
            params = {}
        }

        let style: StyleKeys = {position: "sticky", top: 0, overflow: "hidden", width: "100%"}
        let wrapperStyle: WrapperKeys = {}

        let slideBy = 25; // dictates speed of slide


        // params.hold determines how long the slide should stay after sliding in
        if (params.hold) {
            wrapperStyle['height'] = "context" + (params.hold+1)    // tells slide to multiply context
        } else {
            wrapperStyle['height'] = "children" + 3     // assumes 100vh
        }

        // Set Translate for slide
        // zeros added where yFullView was 4/15/22
        if (y < 0) style['transform'] = 'translateX(-100%)'   // don't slide until fully in view
        else if (y > slideBy) style['transform'] = 'translateX(0%)'  // final position after fully in view
        else style['transform'] = params.right ?    // switch on slide direction
            `translateX(${100-( ( (y-0) / (slideBy - 0) ) * 100  )}%)` :
            `translateX(${-100 + ( ( (y-0) / (slideBy - 0) ) * 100  )}%)`

        // Set position for start
        style['right'] = params.right ? "-50%" : "50%"
        
        return [wrapperStyle, style]
    },
    /**
     * Effects meant to be mix and matched taking backburner
     */
    slideOut (y: number, yFullView: number, params?: any):
        [Object: WrapperKeys, Object: StyleKeys] {

        return [{height: "slideOut"},{position: "slideOut"}]
    },
    slideMe (y: number, yFullView: number, params?: any):
        [Object: WrapperKeys, Object: StyleKeys] {

        if ( typeof params === 'undefined') {
            params = {}
        }

        let style: StyleKeys = {position: "sticky", top: 0, overflow: "hidden", width: "100%"}
        let wrapperStyle: WrapperKeys = {}

        let slideBy = 100;

        // params.hold determines how long the slide should stay after sliding in
        if (params.hold) {
            wrapperStyle['height'] = "context" + (params.hold+1)    // tells slide to multiply context
        }

        // Set Translate for slide
        if (y < yFullView) style['transform'] = 'translateX(-100%)'   // don't slide until fully in view
        else if (y > slideBy) style['transform'] = 'translateX(0%)'  // final position after fully in view
        else style['transform'] = params.right ?    // switch on slide direction
            `translateX(${100-( ( (y-yFullView) / (slideBy - yFullView) ) * 200  )}%)` :
            `translateX(${-100 + ( ( (y-yFullView) / (slideBy - yFullView) ) * 200  )}%)`

        // Set position for start
        style['right'] = params.right ? "-50%" : "50%"
        
        return [wrapperStyle, style]
    },
    header (y: number, yFullView: number, params?: any):
        [WrapperKeys,  StyleKeys] {

            params = getDefaults(params)

            let wrapperStyle: WrapperKeys = {height: "1px", 
                position: "sticky", top: 0, border: "2px solid green"}
            let style: StyleKeys = {width: "100%", position: "absolute", border: "1px solid yellow"}

            return [wrapperStyle, style]
    
        }
}

export default StyleConfig
