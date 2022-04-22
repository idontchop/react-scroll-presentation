export default interface SlideStyle {
    right?: boolean;
    left?: boolean;
    hold?: number;
}
export interface StyleKeys {
    transform?: string;
    right?: string;
    left?: string;
    position?: string;
    top?: number;
    overflow?: string;
    width?: string;
    border?: string;
    opacity?: string;
    height?: string;
    zIndex?: number | string;
    backgroundImage?: string;
    backgroundPosition?: string;
    backgroundSize?: string;
    backgroundRepeat?: string;
    backgroundColor?: string;
    backgroundBlend?: string;
    filter?: string;
}
export interface WrapperKeys {
    height?: string;
    position?: string;
    border?: string;
    top?: number;
    overflow?: string;
    opacity?: number;
    zIndex?: number | string;
}
export interface Params {
    [key: string]: any;
    numChildren: number;
    background?: string;
    fullScreen?: boolean;
    scrollViewPort?: boolean;
    scrollSpeed?: number;
    toEnd?: boolean;
    toEndLastChild?: boolean;
    transitionSpeed?: number;
    staticFirstChild?: boolean;
    showTo?: string;
}
export interface StyleParams {
    [key: string]: any;
    hold?: number;
    slideBy?: number;
}
