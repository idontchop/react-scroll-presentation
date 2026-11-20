# react-scroll-presentation — Modernization Steps

Analysis date: 2026-11-17.

**Target architecture.** The presentation, its slides and their effects move into a framework-free core:
`<scroll-presentation>` and `<scroll-slide>` web components plus one stylesheet of CSS scroll-driven effects. The
React, Vue and Angular packages become thin connectors (tag typings and one small helper each). Phase 5 describes
the core, and [examples/vanilla](examples/vanilla) is its first acceptance test.

Because of that, the current React components in `src/` are not modernized in place. Phase 2 lists their problems
so the core avoids them, and the later phases target the core.

---

## Phase 2 — Problems in the current React components

Phase 5 replaces these components, so most of these items go away rather than being fixed. Only fix the
"keep usable" items below if the current React version is used before the core is ready:

- **Keep usable:** P1, P3, P4, P10, S1, S2, S3, W6 listener, C4 (P1, P3 and P10 are already done).
- **Lessons for the core:** most other items describe a design mistake the core must not repeat, for example
  restructuring children (P6, P8, C9), restyling on every scroll event (P2, C7), effects that depend on prop
  order (C1), mutating user options (S2) and debug styles in production (S3).

### 2.1 `Presentation` (`src/components/Presentation.tsx`)

| # | Problem | Location | Fix |
|---|---|---|---|
| P1 | Scroll listener cleanup **adds** a listener instead of removing it, so listeners pile up on every scroll | line 130 | `removeEventListener` |
| P2 | Scroll effect depends on `[scrollTop]`, so the listener is torn down and re-added on **every scroll event** | line 134 | register once (`[]` / `[fullScreen]`); read latest values through a ref; throttle with `requestAnimationFrame` |
| P3 | `scrollRef.current.scrollY` doesn't exist on elements (always `undefined`); `scrolling` state is never read | line 125 | remove `scrolling`, or use `scrollTop` |
| P4 | Operator-precedence bug: `scrollableHeight - scrollRef.current ? … : 0` evaluates as `(scrollableHeight - el) ? …`, so `scrollHeight` is wrong | lines 228–229 | add parentheses |
| P5 | `props: any`. No typed public API | line 29 | define `PresentationProps { fullScreen?, className?, children }` |
| P6 | Child refs passed through `cloneElement` are always `undefined` (`childrenRefs.current[i]` never set). The code admits this ("Hack applied…") and measures `presentationRef.children` instead | lines 141–144, 170–178 | let slides register via context, or measure with `ResizeObserver` |
| P7 | Heights are measured only when `childClones` / `scrollTop` change, so dynamic content and window resizes are missed ("doesn't work because child heights can change") | line 186 | `ResizeObserver` on the container and slides |
| P8 | Children are cloned into **state** (`childClones`), which causes an extra render and stale props | lines 136–150 | render children directly; pass `startScroll` / `endScroll` via context keyed by index |
| P9 | Assumes `props.children` is an array (`props.children[i]`, `props.children[0].props`) and crashes with a single child or fragments | lines 95–99, 204 | `React.Children.toArray` or the context-registration pattern |
| P10 | Debug `console.log`s and an empty effect left in the library | lines 152–164, 200–205 | delete |
| P11 | `setScrollToSlide` is recreated every render, so every consumer re-renders | context value, lines 210–231 | `useCallback` + `useMemo` on the context value |
| P12 | Reads `window.innerHeight` during render (breaks SSR) | lines 213–214 | track viewport height in state, set in an effect |
| P13 | `scrollToOptions.behavior` is typed as `string`, which is why `window.scrollTo(options)` "didn't work" (`// wtf`) | lines 49–54 | type it as `ScrollToOptions`; expose `behavior: 'smooth'` as an option |
| P14 | Default context value has a no-op `setScrollToSlide` and no type | line 12 | export a typed `PresentationContextValue`, plus a `usePresentation()` hook |
| P15 | `ScrollContext.type.ts` is defined but unused, and it doesn't match the real context shape | `ScrollContext.type.ts` | delete it or make it the context type |

### 2.2 `ConfigurableSlide` (`src/ConfigurableSlide.tsx`)

| # | Problem | Location | Fix |
|---|---|---|---|
| C1 | Effect behavior depends on **prop order** (`Object.keys(props)`), so `<X fadeOut slideIn>` ≠ `<X slideIn fadeOut>` | lines 101–115 | define an explicit precedence, or a single `effect` prop |
| C2 | `Object.assign(a[0], b[0])` mutates objects returned by config functions | lines 112, 138 | spread into new objects |
| C3 | Effect props are typed `any`; `slideMe?: Slide` is the wrong type; `testOverWrite` is a dev leftover | lines 8–20 | a discriminated union per effect with typed params |
| C4 | `convertHeight` uses `parseInt` on the multiplier, so fractions (`context1.5`) silently truncate despite the "done apr 22" note | lines 86–87 | `parseFloat`; add unit tests |
| C5 | Magic string heights (`"context2"`, `"children3"`) are an implicit mini-DSL | `convertHeight` | use a typed `{ unit: 'viewport' \| 'content', factor: number }` |
| C6 | Effects have incomplete dependency arrays (`[context.scroll, context.height]`, `[y, yFullView]`), so prop changes don't restyle | lines 180, 205 | include props, or derive styles with `useMemo` (no state needed) |
| C7 | Style is stored in three `useState`s and recomputed in effects, which costs an extra render per scroll frame | lines 47–49, 189–205 | compute styles during render with `useMemo` |
| C8 | Leftover dev logging in the scroll path | line 160 | remove |
| C9 | Every child is wrapped in an extra `<div>` and needlessly passed through `cloneElement(e)` | end of file | render `e` directly |
| C10 | `startScroll` (and `endScroll` from Presentation) are internal props that leak into the public API | props interface | move to context |
| C11 | Inline `position: sticky` header duplicates `Header.tsx` and `StyleConfig.header` | render | keep a single implementation |

### 2.3 Style engines (`src/lib/StyleConfig.ts`, `src/lib/ChildrenConfig.ts`)

| # | Problem | Location | Fix |
|---|---|---|---|
| S1 | **Bug:** `StyleConfig.getDefaults` returns `[params]` (an array), and callers assign it to `params`, so `params.hold` is always `undefined`. `fadeOut={{hold: 2}}` is ignored | StyleConfig lines 22, 41, 132 | return the object |
| S2 | Both `getDefaults` functions **mutate the user's prop object** (`params[key] = …`) | StyleConfig line 17, ChildrenConfig line 56 | `{...defaultParams, ...params}` (already commented out in the code) |
| S3 | Debug borders shipped in production styles (`1px yellow solid`, `2px solid green`) | ChildrenConfig line 136, StyleConfig line 135 | remove |
| S4 | `slideOut` returns invalid CSS (`height: "slideOut"`, `position: "slideOut"`) | StyleConfig line 95 | implement it or remove it |
| S5 | `revealSlideIn` is documented as "Not Working". Both branches set `translateX(-100%)` | ChildrenConfig line 220 | implement it with CSS keyframes, or remove it |
| S6 | Typed as `{[name: string]: Function}`, so lookups and arguments are not type-checked | both files | typed record of effect functions |
| S7 | `StyleKeys` / `WrapperKeys` hand-roll a subset of CSS with wrong types (`top: number` only, `opacity` string vs number) | `style.types.ts` | use `React.CSSProperties` |
| S8 | `SlideStyle` default export is unused | `style.types.ts` | delete |
| S9 | `transition` uses `new Array(n).fill({})` and then mutates objects inside the `map` | ChildrenConfig line 126 | `Array.from({length: n}, …)` |
| S10 | Magic numbers (`slideBy = 25`, `yFullView/5`, `opacity 0.8`) | throughout | make them named, documented params |

### 2.4 Thin wrappers and dev components

| # | Problem | Fix |
|---|---|---|
| W1 | `HorizontalSlide`, `VerticalSlide`, and `Header` are not exported from `src/index.ts`, but the README advertises them | export them, or remove them from the README |
| W2 | `HorizontalSlide` passes `slideIn={{}}` **before** `{...props}`, so a user `slideIn` overrides it entirely | merge the params |
| W3 | `VerticalSlide` is just a re-export of `ConfigurableSlide` with no behavior | document it as an alias, or drop it |
| W4 | `Header` is marked "UNDER DEVELOPMENT" and duplicates ConfigurableSlide's `header` | consolidate |
| W5 | `HorizontalTest` is a dev-only component ("unpredictable results") with debug borders and logs, imported as `HorizontalText` in stories | delete it, or move it to `stories/` |
| W6 | `HelloWorld` (a demo) is **exported from the library** and adds a `window` scroll listener on **every render**, never removed | stop exporting it; move it to `stories/`; delete the listener |
| W7 | `Slide` interface (`before`, `after`, `scroll`, `left`, `hold`) has many props that nothing reads | trim it to the real API |
| W8 | Unused imports (`useState`, `useEffect`, `useRef`, `PresentationContext`) across wrappers and stories | let ESLint auto-fix |
| W9 | Stories load an external image from a personal site and use legacy CSF 2 | use local assets; migrate to CSF 3 with `args` / `argTypes` |
| W10 | Accessibility: no `prefers-reduced-motion` handling; scroll-jacked layouts lack ARIA landmarks | honor reduced motion; give slides `role="region"` and `aria-label={title}` |

---

## Phase 3 — Documentation

Write the docs against the core API once Phase 5 settles it. The current README documents React props that the
core replaces.

1. **Getting started for each audience.** Plain HTML (stylesheet, script, `defineElements()`), then React, Vue and
   Angular, each using its connector. Replace the current README example, which uses components that don't exist.
2. **Element reference.** `<scroll-presentation>` attributes (`full-screen`), properties (`currentSlide`), methods
   (`scrollToSlide(nameOrIndex)`) and the `slidechange` event. `<scroll-slide>` attributes: `name` and `effect`.
3. **Effect reference.** One section per effect (`fade-out`, `slide-in`, `slide-me`, `header`, `transition`,
   `alternate-slide-in`) with its options (`hold`, `right`, `scroll-speed`, `scroll-viewport`, `full-screen`,
   `static-first-child`), defaults, the matching CSS custom properties, and a demo link.
4. **Installation and support.** Which package to install for each framework, peer dependencies, and the browsers
   that support CSS scroll-driven animations, plus what older browsers and `prefers-reduced-motion` users see.
5. **How it works.** Sticky positioning, view timelines and animation ranges, and what the elements do in
   JavaScript (current-slide tracking, navigation, measurement).
6. **Styling and extending.** Overriding effects with CSS custom properties, and adding a custom effect as a CSS
   preset.
7. **Known limitations.** Mobile and iOS sticky quirks, nested scroll containers, and server rendering (layout and
   CSS effects work before JavaScript loads; navigation and current-slide tracking don't).
8. **Contributor docs.** The playground and Storybook commands, test and build commands, and the release process.
   Add `CONTRIBUTING.md`, `CHANGELOG.md` (generated by Changesets) and a `LICENSE` file.
9. **TSDoc and demos.** Document every export and the element typings, and keep one story or example page per
   effect.

---

## Phase 4 — Tests and CI

1. **Acceptance tests for the core, written first.** Use Vitest browser mode (Playwright, already installed) to
   load [examples/vanilla](examples/vanilla) and assert the contract listed in its `main.js`: the elements
   register, `currentSlide` and `slidechange` follow scrolling, `scrollToSlide` navigates, the header stays on
   top, and transition children fill the stage. These fail until the core exists. jsdom can't run scroll-driven
   animations, so these tests need a real browser.
2. **Unit tests for core logic:** attribute parsing and defaults, `--index` / `--count`, current-slide detection,
   and safe double registration.
3. **Connector smoke tests:** each connector renders a presentation, forwards options, and its helper reports
   slide changes.
4. **Lint and format:** ESLint and Prettier across all packages (`eslint-plugin-react-hooks` only for the React
   connector).
5. **CI:** a GitHub Actions workflow on every pull request: install, lint, type-check, test (installing
   Playwright browsers), build and `storybook build`. Phase 6 extends it for publishing.

Skip unit tests for `StyleConfig` / `ChildrenConfig`; the core replaces them.

---
## Phase 5 — Framework-free core with web components

Goal: the core implements the whole presentation: the elements, their effects and their behaviour. Native CSS
scroll-driven animations do the visual effects, and two custom elements hold the little JavaScript that CSS can't
do. Every current effect except the time-based transitions can be done in CSS, and CSS animations run off the main
thread instead of re-rendering on every scroll event (P2, C7).

```html
<scroll-presentation full-screen>
  <scroll-slide name="Intro" effect="fade-out" hold="2">…any HTML…</scroll-slide>
  <scroll-slide name="Stages" effect="transition" scroll-speed="6">…</scroll-slide>
</scroll-presentation>
```

[examples/vanilla](examples/vanilla) (`npm run playground:vanilla`) shows the same slides as the React playground
written this way. It fails until the core exists, and Phase 4 turns it into the first acceptance test.

1. **Fix the contract first.** The example's `main.js` lists what the core must provide:
   - `defineElements()` registers `<scroll-presentation>` and `<scroll-slide>`, and is safe to call more than once.
   - `<scroll-slide>` takes `name` and `effect`, plus effect options as attributes. Slides use `name`, not `title`:
     `title` is a global HTML attribute and would show a tooltip.
   - `<scroll-presentation>` has `scrollToSlide(nameOrIndex)`, `currentSlide`, and a `slidechange` event with
     `event.detail.name`.
   - The core's `styles.css` implements the effects and their options.

   Write the Phase 4 acceptance tests against this contract before implementing it.
2. **Follow these element rules.**
   - Never clone, wrap or move children; the page or framework owns the slide content.
   - Use light DOM, not shadow DOM, so user styles, `position: sticky` and the preset stylesheet apply.
   - A slide finds its presentation with `closest('scroll-presentation')`; there is no context object.
   - Register only when `customElements` exists, and skip tags that are already defined, so the core is
     SSR-safe and survives being loaded twice.
   - Structured options can be set as element properties as well as string attributes.
3. **Build the effects as CSS presets.** Reimplement `fade-out`, `slide-in`, `slide-me` and `header` with
   `position: sticky`, `animation-timeline: view()` and `animation-range`, selected by the `effect` attribute.
   Options such as `hold`, `right` and speed map to CSS custom properties. The header preset sets a `z-index` so
   later slides don't cover it. This replaces `StyleConfig` and `ChildrenConfig`.
4. **Build the multi-child stages in CSS.** For `transition` and `alternate-slide-in`, a sticky stage sits in a tall
   slide and each child gets its own `animation-range` segment from `--index` / `--count`. Children fill the
   stage width. For the current "trigger then fade" behaviour, use `animation-trigger` where it's supported
   (Chrome 145+) and an `IntersectionObserver` fallback elsewhere.
5. **Put the remaining JavaScript in the elements.** It should:
   - track the current slide with `IntersectionObserver` and fire `slidechange`;
   - navigate with `scrollIntoView()`;
   - set `--index` / `--count` on stage children;
   - measure content-height-based scroll lengths with `ResizeObserver`;
   - run the trigger fallback;
   - clean up observers in `disconnectedCallback`.

   It must never write styles from a scroll listener.
6. **Plan for unsupported browsers and reduced motion.** Gate the presets behind
   `@supports (animation-timeline: view())`. Decide whether older browsers get a static layout (slides simply
   appear) or a scroll-timeline polyfill. Honour `prefers-reduced-motion`.
7. **Split into packages.** Turn the repo into an npm workspace, one package per layer:

   ```text
   package.json            private root: "workspaces": ["packages/*"], shared dev tools
   tsconfig.base.json      shared compiler options; each package extends it
   packages/
     core/                 @<scope>/core     elements, stylesheet, no framework deps
     react/                @<scope>/react    peerDeps: react, react-dom, @<scope>/core
     vue/                  @<scope>/vue      peerDeps: vue, @<scope>/core
     angular/              @<scope>/angular  peerDeps: @angular/core, @<scope>/core
   examples/               playgrounds per framework, plus vanilla (private, not published)
   ```

   - **Build `core` first.** It's new code, so start it in `packages/core` test-first. Leave the current `src/`
     running the React playground until the React connector replaces it, then delete it.
   - **Keep dependency direction one way.** Connectors depend on `core`; `core` never imports a connector or a
     framework, and connectors never import each other. List the framework and `core` as `peerDependencies`
     (plus `devDependencies` for local builds), so an app gets a single copy of each.
   - **Build each package with its own ecosystem's tools.**
     - `core` and `react`: Rollup (the esbuild + dts setup already in this repo), emitting ESM, CJS and `.d.ts`.
       `core` also ships `styles.css`.
     - `vue`: Vite library mode, with `vue-tsc` for declarations.
     - `angular`: `ng-packagr`, which produces the Angular Package Format that Angular apps expect.
   - **Give each package an `exports` map.** `core` exposes `.` and `./styles.css`, and connectors re-export the
     stylesheet so users don't need to import from `core` directly.
   - **Link packages locally through workspaces.** Internal dependencies resolve from `packages/` with no
     `npm link`. Changesets updates the internal version ranges when it bumps a package.
   - **Share tooling at the root.** TypeScript, Vitest, ESLint and Prettier live in the root `devDependencies`,
     and root scripts run each package's script (`npm run build --workspaces`). Use TypeScript project
     references so `tsc -b` builds `core` before the connectors.
   - **Storybook:** one per framework, or Storybook composition to show them in one UI. The core's stories use
     plain HTML.
8. **Write thin connectors.** Each one contains only:
   - TypeScript typings for the tags, attributes and event;
   - one helper: a React `usePresentation(ref)` hook, a Vue composable, or an Angular directive or service, each
     returning the current slide and `scrollToSlide`;
   - for Vue and Angular, the setup that marks the tags as custom elements (`isCustomElement` /
     `CUSTOM_ELEMENTS_SCHEMA`).

   React 19 renders custom elements directly. The React connector may also export `Presentation` and
   `ConfigurableSlide` as one-line wrappers that render the tags, to keep the familiar names.

**Trade-offs of this design:**
- Each framework still needs its own tag typings; that is most of what's left in a connector.
- Attribute values are strings, so structured options need element properties.
- Server-rendered pages show the layout and CSS effects before JavaScript loads, but not navigation or
  current-slide tracking.

---
## Phase 6 — Publishing to npm

Goal: publish every package from GitHub Actions. Nothing is published from a developer machine, and the build
output is never committed. As of 2026-11-17, the name `react-scroll-presentation` is not taken on npm.

1. **Claim the names.** Decide on an npm scope for the Phase 5 packages (for example `@<scope>/core`, `/react`,
   `/vue`, `/angular`); the examples use `@scroll-presentation/core` as a placeholder. Keep
   `react-scroll-presentation` for the React connector or as an alias. Enable 2FA on the npm account.
2. **Make the packages publishable.** In each `package.json`:
   - fix `peerDependences` → `peerDependencies`;
   - add an `exports` map (ESM, CJS, types and the stylesheet);
   - set `files`, `repository`, `engines` and `sideEffects: ["*.css"]`;
   - set `publishConfig.access: "public"` for scoped packages.

   Add a `LICENSE` file. Remove `dist/` from git and add it to `.gitignore`.
3. **Run CI on every pull request.** Extend the Phase 4 GitHub Actions workflow to cover all workspace packages:
   `npm ci` → lint → type-check (`tsc`) → tests (install Playwright browsers for browser-mode tests) → build →
   `storybook build`. Make the workflow a required check on `main`.
4. **Validate what gets published.** In CI, run `npm pack --dry-run` and check exports and types with `publint`
   and `@arethetypeswrong/cli`, so a broken `exports` map or missing `.d.ts` fails the build.
5. **Version with Changesets.** Contributors add a changeset with each PR. On `main`, the Changesets action keeps
   a "Version packages" PR open that bumps versions and writes changelogs for each package.
6. **Publish from a release workflow.** When the version PR is merged, a workflow builds and runs
   `changeset publish`. Use npm trusted publishing (OIDC) instead of a stored `NPM_TOKEN`:
   - give the workflow `permissions: id-token: write`;
   - run Node 22.14+ and npm CLI 11.5.1+;
   - register the workflow as each package's trusted publisher on npmjs.com.

   npm then adds provenance attestations automatically
   ([npm docs](https://github.com/npm/documentation/blob/main/content/packages-and-modules/securing-your-code/trusted-publishers.mdx)).
7. **Use pre-releases while the API settles.** Publish betas under the `next` dist-tag (Changesets pre mode)
   until the Phase 5 API is stable. Then choose the first stable version: `0.x` signals an unstable API,
   `1.0.0` a stable one.
8. **Publish the demos.** Deploy the Storybook builds and the example pages, including the vanilla example, to
   GitHub Pages from the same release workflow, and link them from each package README.

---

## Suggested execution order

1. **Foundations:** Phase 4 CI, and Phase 6 steps 1–4 (names, package metadata, publish validation).
2. **Core, test-first:** write the Phase 4 acceptance tests against `examples/vanilla`, then build the core (Phase 5,
   steps 1–6) until they pass.
3. **React connector:** build it on the core, move the React playground and Storybook to it, then delete the old
   `src/` components. This retires Phase 2.
4. **Vue and Angular connectors,** each with a playground and smoke tests.
5. **Docs:** Phase 3, written against the final API.
6. **Release:** publish `next` pre-releases once the core and React connector work, and the first stable version
   after the docs are done.

Fix the Phase 2 "keep usable" items only if the current React version is needed before step 3.