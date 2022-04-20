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
}
export interface WrapperKeys {
    height?: string;
    position?: string;
    border?: string;
    top?: number;
    overflow?: string;
}
export interface Params {
    [key: string]: any;
    numChildren: number;
    scrollViewPort?: boolean;
    scrollSpeed?: number;
    toEnd?: boolean;
    toEndLastChild?: boolean;
    transitionSpeed?: number;
}
export interface StyleParams {
    [key: string]: any;
    hold?: number;
    slideBy?: number;
}
