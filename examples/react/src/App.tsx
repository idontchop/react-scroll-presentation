import { useContext } from 'react'
import { ConfigurableSlide, Presentation, PresentationContext } from 'react-scroll-presentation'

const source = import.meta.env.MODE === 'dist' ? 'built dist/' : 'src/'

const steps = [
    ['1', 'Wrap your content', 'Place your slides inside a single <Presentation>.'],
    ['2', 'Pick an effect', 'Give each <ConfigurableSlide> a prop such as fadeOut, slideIn or transition.'],
    ['3', 'Write plain React', 'Slides are regular components and HTML.'],
    ['4', 'Scroll', 'The presentation advances as the reader scrolls.'],
]

const features = [
    ['Fade out', 'A slide stays pinned and fades as the next one scrolls in.'],
    ['Slide in', 'Content slides in from the side as it enters the view.'],
    ['Transitions', 'Several children cross-fade in one place while scrolling.'],
    ['Sticky header', 'A header stays visible over the slides below it.'],
    ['Slide context', 'Read the current slide, or jump to one by title.'],
    ['Your styling', 'Plain CSS classes, inline styles or any CSS-in-JS.'],
]

const jumpTargets = ['Intro', 'How it works', 'Slide in', 'Transition', 'Features', 'Get started']

// Reads PresentationContext, so it must render inside <Presentation>.
const Nav = () => {
    const { current, setScrollToSlide } = useContext(PresentationContext)
    return (
        <nav className="nav">
            <strong className="brand">⚛ react-scroll-presentation</strong>
            <div className="jump">
                {jumpTargets.map(title => (
                    <button key={title} className={title === current ? 'active' : ''}
                        onClick={() => setScrollToSlide(title)}>{title}</button>
                ))}
            </div>
            <span className="source">library: {source}</span>
        </nav>
    )
}

const Card = ({ step, title, text }: { step: string, title: string, text: string }) => (
    <div className="card">
        <span className="step">{step}</span>
        <div>
            <h3>{title}</h3>
            <p>{text}</p>
        </div>
    </div>
)

const App = () => (
    <Presentation fullScreen>
        <ConfigurableSlide title="Intro" fadeOut>
            <section className="panel">
                <p className="eyebrow">Playground</p>
                <h1>react-scroll-presentation</h1>
                <p className="lead">Each section below uses a different effect. Scroll to try them, or jump with the
                    header that appears below.</p>
            </section>
        </ConfigurableSlide>

        <ConfigurableSlide title="How it works" fadeOut={{ hold: 2 }}>
            {steps.map(([step, title, text], i) => (
                <div key={step} className={`reveal reveal-${i % 2 ? 'right' : 'left'}`}
                    style={{ animationDuration: `${0.8 + i * 0.2}s` }}>
                    <Card step={step} title={title} text={text} />
                </div>
            ))}
        </ConfigurableSlide>

        <ConfigurableSlide title="Header" header>
            <Nav />
        </ConfigurableSlide>

        <ConfigurableSlide title="Alternate" alternateSlideIn={{ scrollViewPort: true, scrollSpeed: 4, fullScreen: true }}>
            <Card step="A" title="alternateSlideIn" text="Each child slides in on its own as you scroll." />
            <Card step="B" title="scrollSpeed" text="Sets how far the reader scrolls for each child." />
            <Card step="C" title="scrollViewPort" text="Measures that distance in screen heights." />
            <Card step="D" title="fullScreen" text="Makes the group fill the viewport." />
        </ConfigurableSlide>

        <ConfigurableSlide title="Slide in" slideIn>
            <section className="panel">
                <p className="eyebrow">slideIn</p>
                <h1>Content slides in from the side</h1>
            </section>
        </ConfigurableSlide>

        <ConfigurableSlide title="Transition"
            transition={{ scrollViewPort: true, scrollSpeed: 6, staticFirstChild: true, fullScreen: true }}>
            <section className="panel stage">
                <p className="eyebrow">transition · 1 of 4</p><h1>One spot, several scenes</h1>
            </section>
            <section className="panel stage alt-1">
                <p className="eyebrow">transition · 2 of 4</p><h1>Children cross-fade</h1>
            </section>
            <section className="panel stage alt-2">
                <p className="eyebrow">transition · 3 of 4</p><h1>Driven by scroll position</h1>
            </section>
            <section className="panel stage">
                <p className="eyebrow">transition · 4 of 4</p><h1>No timers involved</h1>
            </section>
        </ConfigurableSlide>

        <ConfigurableSlide title="Features">
            <section className="panel tall">
                <p className="eyebrow">No effect</p>
                <h1>A plain slide scrolls normally</h1>
                <div className="grid">
                    {features.map(([title, text]) => (
                        <div key={title} className="feature"><h3>{title}</h3><p>{text}</p></div>
                    ))}
                </div>
            </section>
        </ConfigurableSlide>

        <ConfigurableSlide title="Slide me left" slideMe={{}}>
            <div className="strip">slideMe from the left →</div>
        </ConfigurableSlide>
        <ConfigurableSlide title="Slide me right" slideMe={{ right: true }}>
            <div className="strip right">← slideMe from the right</div>
        </ConfigurableSlide>

        <ConfigurableSlide title="Get started" fadeOut>
            <section className="panel">
                <p className="eyebrow">Get started</p>
                <h1>Edit examples/react/src/App.tsx</h1>
                <p className="lead">The playground reloads as you change the app or the library source.</p>
            </section>
        </ConfigurableSlide>
    </Presentation>
)

export default App
