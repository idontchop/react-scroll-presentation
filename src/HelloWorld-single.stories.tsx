import React from 'react';


import HelloWorld from './HelloWorld'
import HelloWorldContent from './HelloWorldContent'
import Presentation from './components/Presentation'
import HorizontalSlide from './components/HorizontalSlide'
import VerticalSlide from './components/VerticalSlide'
import HorizontalText from './components/HorizontalTest'
import Header from './components/Header'
import ConfigurableSlide from './ConfigurableSlide'
import styled from 'styled-components';

export default {
    title: 'Hello World Single',
    component: HelloWorld

};

const StyledPresentation = styled(Presentation)`
    height: 100vh;

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

export const HelloWorldLoaded = () => (
    <div>
        <StyledPresentation>
            <ConfigurableSlide fadeOut>
                <HelloWorld title="FirstBook" />
            </ConfigurableSlide>
            <ConfigurableSlide slideIn>
                <HelloWorld title="SecondBook" />
            </ConfigurableSlide>
            <ConfigurableSlide fadeOut>
                <HelloWorld title="Third Hello">
                    Third Book Hello
                </HelloWorld>
            </ConfigurableSlide>
        </StyledPresentation>
    </div>
)