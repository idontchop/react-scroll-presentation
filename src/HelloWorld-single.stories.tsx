import React from 'react';


import HelloWorld from './HelloWorld'
import HelloWorldContent from './HelloWorldContent'
import Presentation from './components/Presentation'
import HorizontalSlide from './components/HorizontalSlide'
import VerticalSlide from './components/VerticalSlide'
import HorizontalText from './components/HorizontalTest'
import Header from './components/Header'
import ConfigurableSlide from './ConfigurableSlide'

export default {
    title: 'Hello World Single',
    component: HelloWorld

};

export const HelloWorldLoaded = () => (
    <div>

    <Presentation>
        <ConfigurableSlide slideIn>
            <HelloWorld title="FirstBook" />
        </ConfigurableSlide>
    </Presentation>
    <HelloWorldContent title="filler" />
    </div>
)