import React from 'react';
import styled,{keyframes} from 'styled-components'


import HelloWorld from './HelloWorld'
import HelloWorldContent from './HelloWorldContent'
import Presentation from './components/Presentation'
import HorizontalSlide from './components/HorizontalSlide'
import VerticalSlide from './components/VerticalSlide'
import HorizontalText from './components/HorizontalTest'
import Header from './components/Header'
import ConfigurableSlide from './ConfigurableSlide'

export default {
    title: 'Hello World',
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

export const HelloWorldLoaded = () => (
    <Presentation fullScreen>



        <ConfigurableSlide title="Introduction" fadeOut>
            <HelloWorld title="FadeOut">
                <div style={{display: 'flex', justifyContent: "center", flexDirection: "column", margin: 'auto'}}>
                <p>Hello World</p>
                <p>react-scroll-presentation</p>
                <p>I can do this!</p>
                </div>
            </HelloWorld>
        </ConfigurableSlide>
        <ConfigurableSlide title="revealSlideIn" fadeOut={{hold: 2}}>
            <RevealSlideIn1>
            <HelloWorld small title="FirstBook" />
            </RevealSlideIn1>
            <RevealSlideIn2>
                <HelloWorld small title="FirstBook2">
                    <p style={{margin: '20px'}}>2 Transition to me</p>
                </HelloWorld>
            </RevealSlideIn2>
            <RevealSlideIn3>
                <HelloWorld small title="FirstBook3">
                    <p style={{margin: '20px'}}>3 Transition to me</p>
                </HelloWorld>
            </RevealSlideIn3>
            <RevealSlideIn4>
                <HelloWorld small title="FirstBook4">
                    <p style={{margin: '20px'}}>4 Transition to me</p>
                </HelloWorld>
            </RevealSlideIn4>
        </ConfigurableSlide>
        <ConfigurableSlide title="header" header>
            <HelloWorld small title="header" />
        </ConfigurableSlide>
        <ConfigurableSlide alternateSlideIn={{scrollViewPort: true, scrollSpeed: 4}}>
            <HelloWorld small title="FirstBook" />
            <HelloWorld small title="FirstBook2">
                <p style={{margin: '20px'}}>2 Transition to me</p>
            </HelloWorld>
            <HelloWorld small title="FirstBook3">
                <p style={{margin: '20px'}}>3 Transition to me</p>
            </HelloWorld>
            <HelloWorld small title="FirstBook4">
                 <p style={{margin: '20px'}}>4 Transition to me</p>
            </HelloWorld>
        </ConfigurableSlide>

        <HorizontalSlide title="Test Context Title">
            <HelloWorld />
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
        <ConfigurableSlide fadeOut>
            <HelloWorld title="FadeOut" />
        </ConfigurableSlide>
      
    </Presentation>
)