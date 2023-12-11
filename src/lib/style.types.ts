export const defaultParams: Params = {
    numChildren: 1,
    scrollViewPort: false,
    scrollSpeed: 1
}

export default interface SlideStyle {
    right?: boolean,
    left?: boolean,
    hold?: number
    
}

export interface StyleKeys  {
    transform?: string,
    right?: string,
    left?: string,
    position?: string,
    top?: number,
    overflow?: string,
    width?: string,
    border?: string,
    opacity?: string,
    height?: string,
    zIndex?: number | string,
    backgroundImage?: string,
    backgroundPosition?: string,
    backgroundSize?: string,
    backgroundRepeat?: string,
    backgroundColor?: string,
    backgroundBlend?: string,
    filter?: string,
    transition?: string
}

export interface WrapperKeys {
    height?: string,
    position?: string,
    border?: string,
    top?: number,
    overflow?: string,
    opacity?: number,
    zIndex?: number | string,
    display?: string
}

export interface Params {
    [key: string]: any,
    numChildren: number,
    background?: string,
    fullscreen?: boolean,
    scrollViewPort?: boolean,  // true to adust scrollable area by viewport
    scrollSpeed?: number,      // How much to mulitply scrollable area, default 1
    toEnd?: boolean,           // transition should last to end of scroll
    toEndLastChild?: boolean,  // TODO last child should not transition away (scroll out instead)
    transitionSpeed?: number,   // seconds to transition (injected to css transition)
    staticFirstChild?: boolean,  // If set, first child will not have transitions set
    showTo?: string
}

export interface StyleParams {
    [key: string]: any,
    hold?: number,
    slideBy?: number,
    direction?: string
}