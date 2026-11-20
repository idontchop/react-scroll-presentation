# React Scroll Presentation

UNDER DEVELOPMENT

A React component to display a presentation created with static React components or HTML/CSS but advanced by scrolling with various effects.

## Basic Usage

    <Presentation>
        <HorizontalSlide>
            <HelloWorld title="First Book" />
        </HorizontalSlide>
        <ConfigurableSlide transition slideIn>
            <Content About />
        </ConfigurableSlide>
        <VerticalSlide>
            <Content Preview />
        </VerticalSlide>
    </Presentation>

## Preconfigured Slides

- HorizontalSlide
- VerticalSlide
- Transition
- Header

## Configurable Slide

    <ConfigurableSlide />

Controls all slide presentations by supplying props.

### Configurable Slide props

Coming Soon.

## Development

    npm run playground        # standalone app at examples/react, using the library source
    npm run playground:dist   # builds the library, then runs the app against dist/
    npm run playground:vanilla  # plain HTML + JS target for the planned framework-free core (fails until it exists)
    npm run storybook         # component stories

The playground is a small Vite app that imports `react-scroll-presentation` like a real app would. Edit
`examples/react/src/App.tsx` to try changes in a browser.

## Contributors
Seeking Contributors.
