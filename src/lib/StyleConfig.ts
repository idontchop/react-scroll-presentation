import SlideStyle from "./style.types"

export interface StyleKeys  {
    transform?: string,
    right?: string,
    left?: string,
    position?: string,
    top?: string,
    overflow?: string,
    width?: string
}

export interface WrapperKeys {
    height?: string
}

export const StyleConfig: { [functionName: string]: Function} = {
    empty (): [Object: WrapperKeys, Object: StyleKeys] {
        let style: StyleKeys = {}
        let wrapperStyle: WrapperKeys = {}
        return [wrapperStyle,style]
    },
    slideIn (y: number ,yFullView: number ,params?: any ):
     [Object: WrapperKeys, Object: StyleKeys] {

        if ( typeof params === 'undefined') {
            params = {}
        }

        let style: StyleKeys = {position: "sticky", top: "0", overflow: "hidden", width: "100%"}
        let wrapperStyle: WrapperKeys = {}

        let slideBy = yFullView*2;

        // params.hold determines how long the slide should stay after sliding in
        if (params.hold) {
            wrapperStyle['height'] = "context" + (params.hold+1)    // tells slide to multiply context
        } else {
            wrapperStyle['height'] = "children" + 3     // assumes 100vh
        }

        console.log(y,yFullView)
        // Set Translate for slide
        if (y < yFullView) style['transform'] = 'translateX(-100%)'   // don't slide until fully in view
        else if (y > slideBy) style['transform'] = 'translateX(0%)'  // final position after fully in view
        else style['transform'] = params.right ?    // switch on slide direction
            `translateX(${100-( ( (y-yFullView) / (slideBy - yFullView) ) * 100  )}%)` :
            `translateX(${-100 + ( ( (y-yFullView) / (slideBy - yFullView) ) * 100  )}%)`

        // Set position for start
        style['right'] = params.right ? "-50%" : "50%"
        
        return [wrapperStyle, style]
    },
    slideOut (y: number, yFullView: number, params?: any):
        [Object: WrapperKeys, Object: StyleKeys] {

        return [{height: "slideOut"},{position: "slideOut"}]
    },
    slideMe (y: number, yFullView: number, params?: any):
        [Object: WrapperKeys, Object: StyleKeys] {

        if ( typeof params === 'undefined') {
            params = {}
        }

        let style: StyleKeys = {position: "sticky", top: "0", overflow: "hidden", width: "100%"}
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
    }
}

export default StyleConfig
