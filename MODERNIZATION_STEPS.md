# react-scroll-presentation — Modernization Steps

Analysis date: 2026-11-17.

The steps are ordered so that each phase leaves the repo buildable.

---

## Phase 2 — Poorly designed components (fix / redesign)

### 2.1 `Presentation` (`src/components/Presentation.tsx`) — highest priority

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

## Phase 3 — Missing documentation

1. **README "Configurable Slide props — Coming Soon."** Document every effect prop and its params:
   - `fadeOut { hold }`, `slideIn { hold, right }`, `slideMe`, `header`, `transition`, `alternateSlideIn`,
     `revealSlideIn`
   - children params from `Params`: `numChildren`, `background`, `fullScreen`, `scrollViewPort`, `scrollSpeed`,
     `toEnd`, `transitionSpeed`, `staticFirstChild`, `showTo`
   - include defaults, units, and a short GIF or Storybook link for each.
2. **README usage example is wrong.** `<ConfigurableSlide transition slideIn>`, `<Content About />`, and the
   "Transition" preconfigured slide don't exist. Replace it with a working example copied from a story.
3. **`Presentation` props:** `fullScreen` (window scroll vs. self-contained scroll div), `className` (required to
   give the non-fullScreen variant a height, as the single story does), and the need for a fixed height.
4. **`PresentationContext` / `setScrollToSlide`:** document the context shape (`current`, `scroll`, `scrollHeight`,
   `height`, `setScrollToSlide(index | title)`), how `title` drives `current`, and a "next slide" button example.
5. **Installation and peer deps:** `npm i react-scroll-presentation styled-components`; supported React versions.
6. **How it works:** explain the `y` / `yFullView` percentages, sticky positioning, and how wrapper heights
   (`context×N` / `children×N`) control scroll length. Today this exists only in code comments.
7. **Extending:** how to add a new effect to `StyleConfig` / `ChildrenConfig` (signature, return tuple, merge order).
8. **Known limitations:** mobile and iOS sticky quirks, dynamic-height content, SSR, nested scroll containers.
9. **Contributor docs:** `npm run storybook`, `npm test`, `npm run build`, release process; add `CONTRIBUTING.md`,
   `CHANGELOG.md`, and a `LICENSE` file (`package.json` says MIT, but there is no file).
10. **TSDoc on all exports.** Most JSDoc blocks are `@param props @returns` with no content, and `Presentation`'s
    doc is a TODO list. Replace them with real descriptions.
11. **Storybook docs:** enable autodocs, and add one story per effect with controls for its params.

---

## Phase 4 — Tests and CI

1. Unit tests for every `StyleConfig` / `ChildrenConfig` function, including the S1 `hold` regression,
   fractional `convertHeight`, and the prop-order behavior.
2. Component tests (Testing Library + jsdom with mocked `scrollTop` / `ResizeObserver`): `Presentation` renders a
   single child, `setScrollToSlide` by index and by title, and listener cleanup on unmount.
3. Add ESLint (`eslint-plugin-react-hooks` catches C6 and P2) and Prettier.
4. Add a GitHub Actions workflow: install → lint → test → build → `storybook build`.

---

## Phase 5 — Vanilla JavaScript core with framework connectors

Goal: let native CSS scroll-driven animations do the visual effects, and keep a small framework-free JavaScript
core for what CSS can't do. React, Angular and Vue connectors then only render markup and connect component
lifecycles to the core. Every current effect except the time-based transitions can be done in CSS, and CSS
animations run off the main thread instead of re-rendering on every scroll event (P2, C7).

1. **Rebuild the effects as CSS presets.** Reimplement `fadeOut`, `slideIn`, `slideMe` and `header` with
   `position: sticky`, `animation-timeline: view()` and `animation-range`, shipped as one stylesheet. Effect
   parameters such as `hold`, `right` and speed become CSS custom properties. This replaces `StyleConfig` and
   `ChildrenConfig`.
2. **Rebuild the multi-child stages in CSS.** For `transition` and `alternateSlideIn`, put a sticky stage in a tall
   wrapper and give each child its own `animation-range` segment from `--index` / `--count` custom properties.
   For the current "trigger then fade" behaviour, use `animation-trigger` where it's supported (Chrome 145+)
   and an `IntersectionObserver` fallback elsewhere.
3. **Keep a small JavaScript core for what CSS can't do.** For example, `createPresentation(container)` with
   `scrollToSlide(index | title)`, `subscribe()` for current-slide changes, and `destroy()`. It should:
   - track the current slide with `IntersectionObserver`;
   - navigate with `scrollIntoView()`;
   - set `--index` / `--count`;
   - measure content-height-based scroll lengths with `ResizeObserver`;
   - run the trigger fallback.

   It must never write styles from a scroll listener.
4. **Plan for unsupported browsers and reduced motion.** Gate the presets behind
   `@supports (animation-timeline: view())`. Decide whether older browsers get a static layout (slides simply
   appear) or a scroll-timeline polyfill. Honour `prefers-reduced-motion`.
5. **Split into packages.** Create an npm workspace with `core` (stylesheet plus JavaScript), `react`, `vue` and
   `angular` packages. Version and build each separately, and keep the core free of framework dependencies and
   safe to import during SSR.
6. **Write thin connectors.** Each connector renders markup with the preset classes or data attributes and calls
   the core. The React connector should keep the `Presentation`, `ConfigurableSlide` and context-hook names so
   existing users have a clear migration path. Then add a Vue component or composable and an Angular component
   or directive.
7. **Test and document per layer.** jsdom can't run scroll-driven animations, so test the core in a real
   browser (Vitest browser mode with Playwright is already installed). Add smoke tests and a demo for each
   connector, and a plain-HTML example that uses only the stylesheet and core.

---

## Phase 6 — Publishing to npm

Goal: publish every package from GitHub Actions. Nothing is published from a developer machine, and the build
output is never committed. As of 2026-11-17, the name `react-scroll-presentation` is not taken on npm.

1. **Claim the names.** Decide on an npm scope for the Phase 5 packages (for example `@<scope>/core`, `/react`,
   `/vue`, `/angular`). Keep `react-scroll-presentation` for the React connector or as an alias. Enable 2FA on
   the npm account.
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
8. **Publish the demo.** Deploy the Storybook build, including the showcase story, to GitHub Pages from the same
   release workflow, and link it from each package README.

---

## Suggested execution order

1. Bug fixes that don't change the API, so the current release stays usable: P1, P3, P4, P10, S1, S2, S3,
   W6 listener, C4
2. Phase 4 CI and component tests, as a safety net for the rewrite. Skip unit tests for `StyleConfig` /
   `ChildrenConfig`, which Phase 5 removes.
3. Phase 5: CSS presets and core, then the React connector, then Vue and Angular. This replaces most of
   Phase 2 instead of fixing it: the style-engine and `ConfigurableSlide` items (S4–S10, C1–C11) and the
   measurement and re-render items (P2, P6–P8) go away. Fold the remaining Phase 2 items (P5, P9, P11–P15,
   W1–W10) into the React connector.
4. Phase 3 docs, written against the final API
5. Phase 6 publishing. Steps 1–4 (names, package metadata, CI and publish validation) can start alongside
   Phase 5. Begin `next` pre-releases once the React connector works, and publish the first stable version
   after the docs are done.
