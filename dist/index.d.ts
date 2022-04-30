/// <reference types="react" />
import React from 'react';

/**
 * Test presentation slide
 *
 * @param props
 * @returns
 */
declare const HW: (props: {
    small?: boolean;
    title?: string;
    children?: JSX.Element | JSX.Element[] | string;
}) => JSX.Element;

declare const PresentationContext: React.Context<{
    current: string;
    scroll: number;
    scrollHeight: number;
    height: number;
    setScrollToSlide: (n: number | string) => void;
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

interface Slide {
    title?: string;
    before?: string;
    after?: string;
    scroll?: number;
    right?: boolean;
    left?: boolean;
    slideIn?: boolean;
    hold?: number;
    header?: JSX.Element;
    children?: JSX.Element;
}

interface ConfigureableSlideProps {
    children?: JSX.Element | JSX.Element[];
    slideIn?: any;
    slideMe?: Slide;
    transition?: any;
    alternateSlideIn?: any;
    revealSlideIn?: any;
    fadeOut?: any;
    header?: any;
    startScroll?: number;
    title?: string;
    testOverWrite?: {};
    springIn?: any;
}
/**
 * Slides:
 *
 *  1) Appear and fade out - For welcome screen. Will show full screen and fade out when
 * scrolled through.
 */
declare const ConfigurableSlide: (props: ConfigureableSlideProps) => JSX.Element;

export { ConfigurableSlide, HW as HelloWorld, Presentation, PresentationContext };
