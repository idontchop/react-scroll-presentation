import React from 'react';
import Slide from './components/Slide.type';
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
declare const ConfigurableSlide: (props: ConfigureableSlideProps) => React.JSX.Element;
export default ConfigurableSlide;
