import React, { CSSProperties, ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import styled, { keyframes } from 'styled-components'

import Presentation, { PresentationContext } from './components/Presentation'
import HorizontalSlide from './components/HorizontalSlide'
import VerticalSlide from './components/VerticalSlide'
import HorizontalTest from './components/HorizontalTest'
import ConfigurableSlide from './ConfigurableSlide'

// React brand palette
const colors = {
    darkest: '#20232a',
    dark: '#282c34',
    panel: '#2f343f',
    cyan: '#61dafb',
    text: '#ffffff',
    muted: '#a8b1c2',
}

const font = "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"

const panelStyle: CSSProperties = {
    height: '100vh',
    width: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 8vw',
    textAlign: 'center',
    fontFamily: font,
    color: colors.text,
    background: `radial-gradient(circle at 50% 35%, ${colors.dark} 0%, ${colors.darkest} 75%)`,
}

const eyebrowStyle: CSSProperties = {
    color: colors.cyan,
    textTransform: 'uppercase',
    letterSpacing: '0.2em',
    fontSize: '0.85rem',
    fontWeight: 600,
    margin: 0,
}

const headingStyle: CSSProperties = {
    fontSize: 'clamp(2rem, 6vw, 4.5rem)',
    fontWeight: 800,
    margin: '0.5rem 0',
}

const bodyStyle: CSSProperties = {
    color: colors.muted,
    fontSize: 'clamp(1rem, 2vw, 1.3rem)',
    maxWidth: '40rem',
    lineHeight: 1.6,
    margin: '0.5rem 0',
}

// The transition effect absolutely positions its children without a width, so
// a percentage width collapses to the content. Size these panels to the viewport.
const transitionPanel: CSSProperties = { width: '100vw' }

const Panel = ({ eyebrow, title, children, style }:
    { eyebrow?: string, title: string, children?: ReactNode, style?: CSSProperties }) => (
    <div style={{ ...panelStyle, ...style }}>
        {eyebrow && <p style={eyebrowStyle}>{eyebrow}</p>}
        <h1 style={headingStyle}>{title}</h1>
        {children}
    </div>
)

const Card = ({ step, title, text }: { step: string, title: string, text: string }) => (
    <div style={{
        boxSizing: 'border-box',
        width: '100%',
        padding: '1.25rem 8vw',
        fontFamily: font,
        background: colors.darkest,
        borderBottom: `1px solid ${colors.panel}`,
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
    }}>
        <span style={{
            flex: '0 0 auto',
            width: '3rem',
            height: '3rem',
            borderRadius: '50%',
            border: `2px solid ${colors.cyan}`,
            color: colors.cyan,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
        }}>{step}</span>
        <div style={{ textAlign: 'left' }}>
            <h3 style={{ margin: 0, color: colors.text, fontSize: '1.25rem' }}>{title}</h3>
            <p style={{ margin: '0.25rem 0 0', color: colors.muted }}>{text}</p>
        </div>
    </div>
)

const Strip = ({ children, align = 'center' }: { children: ReactNode, align?: 'left' | 'center' | 'right' }) => (
    <div style={{
        boxSizing: 'border-box',
        width: '100%',
        height: '100px',
        padding: '0 8vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: align === 'left' ? 'flex-start' : align === 'right' ? 'flex-end' : 'center',
        fontFamily: font,
        fontSize: 'clamp(1.25rem, 3vw, 2rem)',
        fontWeight: 700,
        color: colors.darkest,
        background: colors.cyan,
    }}>
        {children}
    </div>
)

// Shows the title of the slide currently in view, read from PresentationContext.
const CurrentSlide = () => {
    const { current } = React.useContext(PresentationContext)
    return (
        <span style={{ color: colors.muted, fontSize: '0.9rem' }}>
            Now viewing: <strong style={{ color: colors.cyan }}>{current || '—'}</strong>
        </span>
    )
}

const slideInLeft = keyframes`
    0% {transform: translateX(-100%);}
    100% {transform: translateX(0%);}
`
const slideInRight = keyframes`
    0% {transform: translateX(100%);}
    100% {transform: translateX(0%);}
`

const RevealSlideIn1 = styled.div`animation: ${slideInLeft} 0.8s 1;`
const RevealSlideIn2 = styled.div`animation: ${slideInRight} 1s 1;`
const RevealSlideIn3 = styled.div`animation: ${slideInLeft} 1.2s 1;`
const RevealSlideIn4 = styled.div`animation: ${slideInRight} 1.4s 1;`

const steps = [
    { step: '1', title: 'Wrap your content', text: 'Place your slides inside a single <Presentation> component.' },
    { step: '2', title: 'Pick an effect', text: 'Give each <ConfigurableSlide> a prop such as fadeOut, slideIn or transition.' },
    { step: '3', title: 'Write plain React', text: 'Slides are regular components and HTML. There is no special markup to learn.' },
    { step: '4', title: 'Scroll', text: 'The presentation advances as the reader scrolls the page.' },
]

const features = [
    { title: 'Fade out', text: 'A slide stays pinned and fades away as the next one scrolls in.' },
    { title: 'Slide in', text: 'Content slides in from the left or right as it enters the view.' },
    { title: 'Transitions', text: 'Several children cross-fade in one place while the reader scrolls.' },
    { title: 'Sticky headers', text: 'Pin a header that stays visible over the slides below it.' },
    { title: 'Slide context', text: 'Read the current slide or jump to one through PresentationContext.' },
    { title: 'Your styling', text: 'Use inline styles, CSS or styled-components inside any slide.' },
]

const usage = `<Presentation fullScreen>
  <ConfigurableSlide title="Intro" fadeOut>
    <Intro />
  </ConfigurableSlide>
  <ConfigurableSlide slideIn>
    <Features />
  </ConfigurableSlide>
</Presentation>`

const meta = {
    title: 'Demo/Scroll Presentation Showcase',
    component: Presentation,
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta<typeof Presentation>

export default meta

type Story = StoryObj<typeof meta>

export const Showcase: Story = {
    render: () => (
        <div style={{ background: colors.darkest }}>
            <Presentation fullScreen>

                <ConfigurableSlide title="Introduction" fadeOut>
                    <Panel eyebrow="react-scroll-presentation" title="Presentations that move as you scroll">
                        <p style={bodyStyle}>
                            Build a slide deck from ordinary React components, then let scrolling
                            drive the fades, slides and transitions.
                        </p>
                        <p style={{ ...bodyStyle, color: colors.cyan, marginTop: '2rem' }}>Scroll down ↓</p>
                    </Panel>
                </ConfigurableSlide>

                <ConfigurableSlide title="How it works" fadeOut={{ hold: 2 }}>
                    <RevealSlideIn1><Card {...steps[0]} /></RevealSlideIn1>
                    <RevealSlideIn2><Card {...steps[1]} /></RevealSlideIn2>
                    <RevealSlideIn3><Card {...steps[2]} /></RevealSlideIn3>
                    <RevealSlideIn4><Card {...steps[3]} /></RevealSlideIn4>
                </ConfigurableSlide>

                <ConfigurableSlide title="Header" header>
                    <div style={{
                        boxSizing: 'border-box',
                        width: '100%',
                        padding: '0.75rem 8vw',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontFamily: font,
                        background: colors.darkest,
                        borderBottom: `2px solid ${colors.cyan}`,
                    }}>
                        <strong style={{ color: colors.cyan, fontSize: '1.1rem' }}>⚛ react-scroll-presentation</strong>
                        <CurrentSlide />
                    </div>
                </ConfigurableSlide>

                <ConfigurableSlide alternateSlideIn={{ scrollViewPort: true, scrollSpeed: 4, fullScreen: true }}>
                    <Card step="A" title="Alternate slide-in" text="Each child slides in on its own as you scroll." />
                    <Card step="B" title="Controlled by scroll" text="scrollSpeed sets how far the reader scrolls for each child." />
                    <Card step="C" title="Viewport aware" text="scrollViewPort measures that distance in screen heights." />
                    <Card step="D" title="Full screen" text="fullScreen makes the group fill the viewport." />
                </ConfigurableSlide>

                <HorizontalSlide title="Slide in">
                    <Panel eyebrow="Horizontal slide" title="Content can slide in from the side">
                        <p style={bodyStyle}>HorizontalSlide is a ready-made slide that uses the slideIn effect.</p>
                    </Panel>
                </HorizontalSlide>

                <ConfigurableSlide transition={{ scrollViewPort: true, scrollSpeed: 6, staticFirstChild: true, fullScreen: true }}>
                    <Panel eyebrow="Transition · 1 of 4" title="One spot, several scenes"
                        style={transitionPanel} />
                    <Panel eyebrow="Transition · 2 of 4" title="Children cross-fade"
                        style={{ ...transitionPanel, background: `linear-gradient(135deg, ${colors.darkest}, #1b4d5c)` }} />
                    <Panel eyebrow="Transition · 3 of 4" title="Driven by scroll position"
                        style={{ ...transitionPanel, background: `linear-gradient(135deg, #1b4d5c, ${colors.dark})` }} />
                    <Panel eyebrow="Transition · 4 of 4" title="No timers involved"
                        style={{ ...transitionPanel, background: `linear-gradient(135deg, ${colors.dark}, ${colors.darkest})` }} />
                </ConfigurableSlide>

                <VerticalSlide title="Features">
                    <div style={{ ...panelStyle, height: 'auto', minHeight: '100vh', padding: '6rem 8vw' }}>
                        <p style={eyebrowStyle}>Features</p>
                        <h2 style={{ ...headingStyle, fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}>Effects you can combine</h2>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(16rem, 1fr))',
                            gap: '1.25rem',
                            width: '100%',
                            maxWidth: '64rem',
                            marginTop: '2rem',
                        }}>
                            {features.map(f => (
                                <div key={f.title} style={{
                                    background: colors.panel,
                                    borderTop: `3px solid ${colors.cyan}`,
                                    borderRadius: '8px',
                                    padding: '1.5rem',
                                    textAlign: 'left',
                                }}>
                                    <h3 style={{ margin: '0 0 0.5rem', color: colors.cyan }}>{f.title}</h3>
                                    <p style={{ margin: 0, color: colors.muted, lineHeight: 1.5 }}>{f.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </VerticalSlide>

                <HorizontalTest>
                    <Strip align="left">Slide from the left →</Strip>
                </HorizontalTest>
                <HorizontalTest right>
                    <Strip align="right">← or from the right</Strip>
                </HorizontalTest>
                <HorizontalTest>
                    <Strip align="left">Mix them as you like →</Strip>
                </HorizontalTest>

                <VerticalSlide title="Usage">
                    <div style={{ ...panelStyle, height: 'auto', minHeight: '100vh', padding: '6rem 8vw' }}>
                        <p style={eyebrowStyle}>Usage</p>
                        <h2 style={{ ...headingStyle, fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}>A few lines of JSX</h2>
                        <pre style={{
                            textAlign: 'left',
                            background: colors.darkest,
                            color: colors.cyan,
                            border: `1px solid ${colors.panel}`,
                            borderRadius: '8px',
                            padding: '1.5rem 2rem',
                            fontSize: '1rem',
                            lineHeight: 1.6,
                            overflowX: 'auto',
                            maxWidth: '100%',
                        }}>{usage}</pre>
                    </div>
                </VerticalSlide>

                <ConfigurableSlide title="Get started" fadeOut>
                    <Panel eyebrow="Get started" title="Build your own presentation">
                        <p style={bodyStyle}>
                            Start with a Presentation, add a few slides and choose an effect for each one.
                        </p>
                    </Panel>
                </ConfigurableSlide>

            </Presentation>
        </div>
    ),
}
