import React from 'react';
export declare const PresentationContext: React.Context<{
    scroll: number;
    scrollHeight: number;
    height: number;
}>;
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
declare const Presentation: (props: any) => JSX.Element;
export default Presentation;
