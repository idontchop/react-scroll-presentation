// Vanilla JS usage of the planned framework-free core (MODERNIZATION_STEPS.md, Phase 5, web components option).
// The core doesn't exist yet, so this page fails to load until packages/core/src/index.ts is implemented.
//
// What this page expects from the core:
// - defineElements() registers <scroll-presentation> and <scroll-slide>, and is safe to call more than once.
// - styles.css implements the effects chosen by <scroll-slide effect="..."> and its attributes (hold, right,
//   scroll-speed, scroll-viewport, full-screen, static-first-child). It also keeps a header slide above later
//   slides and makes transition children fill the stage width; the React playground needs workarounds for both.
// - <scroll-presentation>.scrollToSlide(nameOrIndex) scrolls to a slide.
// - <scroll-presentation>.currentSlide is the name of the slide in view.
// - <scroll-presentation> fires a "slidechange" event, with the new name in event.detail.name.
import { defineElements } from '@scroll-presentation/core'
import '@scroll-presentation/core/styles.css'

defineElements()

const presentation = document.querySelector('scroll-presentation')
const buttons = document.querySelectorAll('[data-slide]')

const markActive = (name) => {
    for (const button of buttons) {
        button.classList.toggle('active', button.dataset.slide === name)
    }
}

for (const button of buttons) {
    button.addEventListener('click', () => presentation.scrollToSlide(button.dataset.slide))
}

presentation.addEventListener('slidechange', (event) => markActive(event.detail.name))
markActive(presentation.currentSlide)
