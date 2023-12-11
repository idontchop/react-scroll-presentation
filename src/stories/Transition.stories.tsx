import React from 'react';
import styled,{keyframes} from 'styled-components'

import { usePresentation } from '../'
import HelloWorld from '../HelloWorld'
import HelloWorldContent from '../HelloWorldContent'
import Presentation from '../components/Presentation'
import HorizontalSlide from '../components/HorizontalSlide'
import VerticalSlide from '../components/VerticalSlide'
import HorizontalText from '../components/HorizontalTest'
import Header from '../components/Header'
import ConfigurableSlide from '../ConfigurableSlide'

export default {
    title: 'Transition',
    component: HelloWorld

};

const slideInLeft = keyframes`
    0% {transform: translateX(-100%);}
    100% {transform: translateX(0%);}
`
const slideInRight = keyframes`
    0% {transform: translateX(100%);}
    100% {transform: translateX(0%);}
`

const RevealSlideIn1 = styled.div`
    animation: ${slideInLeft} 0.8s 1;
`
const RevealSlideIn2 = styled.div`
    animation: ${slideInRight} 1s 1;
`
const RevealSlideIn3 = styled.div`
    animation: ${slideInLeft} 1.2s 1;
`
const RevealSlideIn4 = styled.div`
    animation: ${slideInRight} 1.4s 1;
`

const TransitionHeader = () => {
    let { current } = usePresentation();
    if (current === 'header') current = "";
    return <div style={{width: "100%", backgroundColor: "white", textAlign: "center"}}><h1>{current}</h1></div>
}

export const HelloWorldLoaded = (args: any) => (
    <Presentation {...args} style={{height: !args.fullscreen ? '400px' : null}}>
        <ConfigurableSlide title="header" header>
            <TransitionHeader />
        </ConfigurableSlide>
        <ConfigurableSlide title='First' transition={
                {background: 'https://www.idontchop.com/wp-content/uploads/2020/11/tshirt-lineup-1.jpg',
                scrollViewPort: true, scrollSpeed: 6, 
                staticFirstChild: true, fullscreen: true}}>
            <HelloWorld title="FirstBook" />
            <HorizontalSlide title="Test Context Title">
                <HelloWorld title="FirstBook2">
                    Test Nested
                </HelloWorld>
            </HorizontalSlide>
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
        <ConfigurableSlide title='Final' transition={
                {background: 'https://www.idontchop.com/wp-content/uploads/2020/11/tshirt-lineup-1.jpg',
                scrollViewPort: true, scrollSpeed: 6, 
                staticFirstChild: true, fullscreen: true}}>
            <HelloWorld title="FirstBook" />
            <HorizontalSlide title="Test Context Title">
                <HelloWorld title="FirstBook2">
                    Test Nested
                </HelloWorld>
            </HorizontalSlide>
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
      
    </Presentation>
)

HelloWorldLoaded.args = {
    fullscreen: true
}