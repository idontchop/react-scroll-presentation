
export default interface Slide {
    title?: string,
    before?: string,
    after?: string,
    scroll?: number,
    right?: boolean,
    left?: boolean,
    slideIn?: boolean,
    hold?: number,
    header?: JSX.Element,
    children?: JSX.Element
}