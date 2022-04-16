import React, {useState, useEffect, useRef} from 'react'
import ConfigurableSlide from '../ConfigurableSlide';
import Slide from './Slide.type'


/**
 * Passes configuration to ConfigurableSlide to scroll slide in from side on scroll 
 * into view.
 * 
 * @param props 
 * @returns 
 */
const HorizontalSlide = ( props: Slide ) => {

    return <ConfigurableSlide slideIn={{}} {...props} />

}

export default HorizontalSlide;