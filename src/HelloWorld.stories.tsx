import React from 'react';


import HelloWorld from './HelloWorld'
import HelloWorldContent from './HelloWorldContent'
import Presentation from './components/Presentation.jsx'
import HorizontalSlide from './components/HorizontalSlide'
import VerticalSlide from './components/VerticalSlide'
import HorizontalText from './components/HorizontalTest'
import Header from './components/Header'
import ConfigurableSlide from './ConfigurableSlide'

export default {
    title: 'Hello World',
    component: HelloWorld

};

export const HelloWorldLoaded = () => (
    <Presentation>
        <HorizontalSlide slideIn >
            <HelloWorld title="Storybook1" />
        </HorizontalSlide>
        <ConfigurableSlide transition>
            <HelloWorld title="FirstBook" />
            <HelloWorld title="FirstBook2">
                2 Transition to me
            </HelloWorld>
            <HelloWorld title="FirstBook3">
                3 Transition to me
            </HelloWorld>
            <HelloWorld title="FirstBook4">
                4 Transition to me
            </HelloWorld>
        </ConfigurableSlide>

        <HorizontalSlide >
            <HelloWorld title="Storybook1" />
        </HorizontalSlide>
        <ConfigurableSlide slideIn transition>
            <HelloWorld title="FirstBook" />
            <HelloWorld title="FirstBook2">
                2 Transition to me
            </HelloWorld>
            <HelloWorld title="FirstBook3">
                3 Transition to me
            </HelloWorld>
            <HelloWorld title="FirstBook4">
                4 Transition to me
            </HelloWorld>
        </ConfigurableSlide>
        <VerticalSlide>
            <HelloWorldContent title="Next Storybook" />
        </VerticalSlide>
        <Header header={<div style={{width: "100%", backgroundColor: "white", textAlign: "center"}}><h1>Final</h1></div>}>
            <HelloWorldContent title="Final Storybook" />
        </Header>
        <HorizontalText>
            <div style={{width: "100%", height: "100px", backgroundColor: "white", textAlign: "center"}}><h1>Final</h1></div>
        </HorizontalText>
        <HorizontalText right>
            <div style={{width: "100%", height: "100px", backgroundColor: "white", textAlign: "center"}}><h1>Final</h1></div>
        </HorizontalText>
        <HorizontalText>
            <div style={{width: "100%", height: "100px", backgroundColor: "white", textAlign: "center"}}><h1>Final</h1></div>
        </HorizontalText>
        <VerticalSlide>
            <HelloWorldContent title="Next Storybook" />
        </VerticalSlide>
      
    </Presentation>
)