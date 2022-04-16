import React, {useState, useEffect, useRef} from 'react'
import Slide from './Slide.type'
import {PresentationContext} from './Presentation'
import ConfigurableSlide from '../ConfigurableSlide'

/**
 * No settings necessary for slide through.
 * 
 * May add header with a first child property
 * 
 * @param props 
 * @returns 
 */
const VerticalSlide = ( props: Slide ) => {

   return <ConfigurableSlide {...props} />

}

export default VerticalSlide;