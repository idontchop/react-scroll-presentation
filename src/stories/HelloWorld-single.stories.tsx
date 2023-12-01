import React from 'react';


import HelloWorld from '../HelloWorld'
import HelloWorldContent from '../HelloWorldContent'
import Presentation from '../components/Presentation'
import HorizontalSlide from '../components/HorizontalSlide'
import VerticalSlide from '../components/VerticalSlide'
import HorizontalText from '../components/HorizontalTest'
import Header from '../components/Header'
import ConfigurableSlide from '../ConfigurableSlide'
import styled from 'styled-components';

export default {
    title: 'Hello World Single',
    component: HelloWorld

};

const StyledPresentation = styled(Presentation)`
    height: 50vh;

    &::-webkit-scrollbar {
        width: 9px;
    }
      
    &::-webkit-scrollbar-track {
      background: grey;
      border-radius: 5px;
    }
      
    &::-webkit-scrollbar-thumb {
      background-color: lightblue; 
      border-radius: 20px;
      border: 1px solid grey;
    }
`

/**
 * scroll in div broken. height recalculates
 * @returns 
 */
export const HelloWorldLoaded = () => {

    return (
    <div>
        <StyledPresentation>
            <ConfigurableSlide springIn>
                <HelloWorldContent title="content" />
            </ConfigurableSlide>   
            <ConfigurableSlide springIn>
                <HelloWorldContent title="content" />
            </ConfigurableSlide>                       
        </StyledPresentation>
    </div>)
}