# Portfolio Animation Research — 112 Sites

Research date: 4 October 2026

## Method

This research combines three levels of evidence:

1. **Browser deep scan (14 sites including this project).** Representative sites were opened at a desktop viewport and visually inspected after their loading sequence. The DOM was sampled for CSS animation names, transitions, canvases, video, fixed layers, and `will-change`. This catches implementation character but is not a full performance profile.
2. **Curated-source review (98 additional unique sites).** Sites were selected from current developer/portfolio collections and inspected at catalogue/article level for their stated interaction or presentation pattern.
3. **Standards review.** Implementation recommendations were checked against MDN, Chrome, web.dev, and W3C guidance for scroll-driven animation, View Transitions, composited properties, and reduced motion.

The corpus deliberately mixes highly animated creative-developer work with restrained engineering portfolios. That contrast matters: a portfolio can feel responsive and alive without becoming an art experiment, and an art experiment can still fail as a hiring document.

## Source set

- A1 Gallery's 2026 animated portfolio collection: 46 entries across two pages, emphasizing smooth project transitions, hover response, and scroll-triggered reveals. <https://www.a1.gallery/websites/animated-portfolio>
- Hostinger's 2026 developer portfolio review: 25 developer portfolios, ranging from text-first sites to Three.js worlds. <https://www.hostinger.com/tutorials/web-developer-portfolio/>
- Colorlib's 2026 developer/software-engineer portfolio review: 21 portfolios, with explicit notes about navigation, proof, project presentation, and motion. <https://colorlib.com/wp/developer-portfolios/>
- Create Today's 2026 dataset: 32 web-developer portfolio examples plus aggregate design data. <https://createtoday.io/examples?category=web-developer-portfolio>
- Emma Bostian's community-maintained developer portfolio directory: a large cross-section of real developer sites. <https://github.com/emmabostian/developer-portfolios>
- Godly and One Page Love were used for broader interaction vocabulary and contemporary presentation patterns. <https://godly.design/sites/> and <https://onepagelove.com/>

## Deep browser scan

The counts below are point-in-time DOM samples after the initial load. Canvas/WebGL and script-driven transforms often do not appear as CSS animations; a zero in “CSS animations” does not mean the page is static.

| Site | Browser evidence | What works | Warning / lesson |
|---|---:|---|---|
| This portfolio (`localhost`) | 831 elements; 10 discovered keyframe names; 88 animated/transitioned elements in the initial sample; 15,027 px mobile page | Good staggered hero, one-shot reveals, hover/focus parity, reduced-motion rules, reading progress | Motion vocabulary is mostly fade/rise + 1–2 px lift. The 15k px page needs stronger wayfinding and narrative pacing. |
| [Bruno Simon](https://bruno-simon.com/) | 1 canvas, 37 transitioned elements, viewport-height world | The interaction itself proves the skill; navigation and portfolio are the same artifact | Full 3D is expensive and changes the visitor's task. Borrow “proof through interaction,” not the driving game. |
| [Josh W. Comeau](https://www.joshwcomeau.com/) | 29 animated, 96 transitioned, 1 canvas, 8 `will-change` | Small authored delights, SVG self-drawing, shimmer/pop/fade vocabulary, optional sound, interactive teaching | Dense delight works because content remains primary and effects are contextual. |
| [Brittany Chiang](https://brittanychiang.com/) | 0 active CSS animations, 95 transitioned, sticky split layout | Extremely clear active navigation, calm scanning, project-card feedback | “Alive” can come from persistent state and responsive highlighting, not constant motion. |
| [Lynn Fisher](https://lynnandtonic.com/) | 63 elements, 8 transitions, no canvas | One strong art direction; responsive composition is the signature | A tiny interaction set is memorable when the visual concept is singular. |
| [Wodniack](https://wodniack.dev/) | 40 active CSS animations, 2 canvases, 34 videos, 219 `will-change`, 20,389 px | Bold motion identity, section-scale kinetic transitions, animated typography | Very high media/layer count. Do not copy the payload or blanket layer promotion. |
| [Daniel Sun](https://danielsun.space/) | 2 canvases, 4 videos, 110 `will-change`, 5,568 px | Editorial grid, restrained bright field, work-first hierarchy | Scripted motion can be invisible to CSS inspection; visual restraint keeps it readable. |
| [Hugo Baron](https://nuageboi.fr/) | 1 canvas, 14 videos, 768 `will-change`, 8,422 px | A forceful numeric/typographic identity and cinematic project media | 768 promoted elements is a cautionary example; GPU memory and mobile behavior must be measured. |
| [Peter Tarka](https://petertarka.com/) | 187 elements, 1 video, cursor hidden on all sampled elements | Large project scenes make the work itself the animation | Custom cursors remove a familiar affordance and need a robust fallback. Not recommended here. |
| [Hen](https://hen-ry.com/) | 9 canvases, 36 transitioned, 25 `will-change` | Compact content with rich project canvases; motion lives inside work previews | Isolate heavy previews and pause offscreen; do not animate the entire reading surface. |
| [Andrew McCarthy](https://andrevv.com/) | 1 canvas, 19 videos, 26 fixed elements, 15,545 px | Scroll is a cinematic project reel; background symbols form a persistent identity | Long pinned/fixed experiences can exhaust users and complicate keyboard/mobile navigation. |
| [Anthony Fu](https://antfu.me/) | 16 animated, 46 transitioned, 1 canvas | Generative branches and small slide entrances add personality to a concise page | Great evidence that ambient motion can remain subordinate to dense technical content. |
| [Niccolò Miranda](https://www.niccolomiranda.com/) | GSAP + Locomotive Scroll detected; 2 canvases; marquee; 5,673 px | Every transition reinforces the newspaper metaphor; the intro is a spatial “paper throw” | Smooth-scroll interception and dramatic intro sequences must never delay access to content. |
| [Jhey Tompkins](https://jhey.dev/) | 7 CSS animations; SVG reveal/draw/fill/blink | A few technically expressive effects demonstrate CSS/UI expertise | The page is memorable without continuous motion; authored micro-demos beat generic particles. |
| [Jesse Zhou](https://www.jesse-zhou.com/) | 1 canvas, 35 DOM elements, viewport-height 3D world | The START reveal and cyberpunk ramen shop make a coherent navigable portfolio world | Requires deliberate entry and exploration; keep conventional alternate navigation for recruiter speed. |
| [Ed Hinrichsen](https://edh.dev/) | 1 canvas, 23,782 px, 8 fixed layers | CRT computer, typeable shell, scanline texture, and project story share one concept | Very long content plus immersive hero needs strong skip/navigation paths. |

## Cross-site findings

### 1. Signature interaction beats effect count

The most memorable sites can be summarized in one sentence: drive through Bruno Simon's work, browse Niccolò Miranda's newspaper, enter Jesse Zhou's ramen shop, or use Ed Hinrichsen's retro computer. A site with dozens of unrelated reveals is harder to remember than one with a single coherent interaction metaphor.

### 2. Motion is most credible when it visualizes real work

The strongest developer portfolios turn capabilities into interaction: live code, 3D scenes, generative art, architecture diagrams, responsive layouts, or playable interfaces. For this portfolio, the raw material is already excellent: 10k entities, 1k players, 60 FPS, TCP flows, ECS, GPU skinning, physics, and deployment pipelines.

### 3. Persistent state creates liveliness without distraction

Sticky navigation, active section markers, reading progress, selected filters, project state, and clear hover/focus feedback make a page feel responsive. Brittany Chiang is a useful counter-example to motion-heavy sites: almost no time-based animation is needed because navigation and layout continuously reflect context.

### 4. Project media should move before decoration does

Video loops, before/after comparisons, animated architecture diagrams, scrub-able timelines, and controlled previews communicate more than particles behind a headline. Decorative motion is valuable only after the work itself is vivid.

### 5. Kinetic typography is effective when it carries hierarchy

Character/line reveals, clipping masks, variable font axes, and counter motion work best on section transitions or evidence values. Applying text splitting to paragraphs harms selection, accessibility, translation, and performance.

### 6. Scroll-linked motion should be reversible and bounded

CSS scroll/view timelines are a better fit than continuous JavaScript scroll handlers for progress, image reveals, rail fills, and gentle section depth. Effects should complete while their subject is visible, reverse naturally, and disappear under reduced motion.

### 7. Ambient motion needs an idle policy

Infinite motion is common in award portfolios, but the best product-like sites pause it when offscreen, when the tab is hidden, under reduced motion, and sometimes after a few loops. This is especially important for this site's existing infinite experience-card bob and architecture pulse.

### 8. Loading sequences are justified only by real loading

Branded loaders work for multi-megabyte 3D worlds. Adding an artificial loader to a fast Vue portfolio would slow the visitor and imitate a problem the site does not have.

### 9. Custom cursors and smooth-scroll hijacking are poor default choices

They can be striking, but they replace learned behavior, complicate touch/pen support, and can reduce perceived performance. Use native cursor and native scroll; add localized pointer-reactive effects only inside optional showcase surfaces.

### 10. A motion system needs explicit performance and accessibility budgets

Several scanned sites promoted hundreds of elements with `will-change` or loaded dozens of video elements. Those approaches are not appropriate for a hiring portfolio whose content must work on ordinary laptops and phones.

## 112-site corpus

Legend: **B** = browser deep scan; **C** = curated-source review. The “pattern” column records the transferable idea or the specific question the site contributed to the audit; it is not a claim that every effect was exhaustively reverse engineered.

| # | Site | Mode | Transferable pattern / research value |
|---:|---|:---:|---|
| 1 | [Bruno Simon](https://bruno-simon.com/) | B | Portfolio-as-playable-proof; spatial navigation. |
| 2 | [Josh W. Comeau](https://www.joshwcomeau.com/) | B | Contextual delight, SVG drawing, interactive explanations. |
| 3 | [Brittany Chiang](https://brittanychiang.com/) | B | Persistent active navigation and restrained response. |
| 4 | [Lynn Fisher](https://lynnandtonic.com/) | B | Singular responsive concept instead of effect volume. |
| 5 | [Wodniack](https://wodniack.dev/) | B | Kinetic sections, typography, and high-motion caution. |
| 6 | [Daniel Sun](https://danielsun.space/) | B | Editorial composition with subtle scripted depth. |
| 7 | [Hugo Baron](https://nuageboi.fr/) | B | Numeric identity, project video, layer-promotion caution. |
| 8 | [Peter Tarka](https://petertarka.com/) | B | Work-as-motion and custom-cursor tradeoffs. |
| 9 | [Hen](https://hen-ry.com/) | B | Isolated interactive project canvases. |
| 10 | [Andrew McCarthy](https://andrevv.com/) | B | Cinematic vertical reel and persistent generative field. |
| 11 | [Anthony Fu](https://antfu.me/) | B | Generative ambience around concise technical content. |
| 12 | [Niccolò Miranda](https://www.niccolomiranda.com/) | B | One metaphor carried through loaders, transitions, and layout. |
| 13 | [Jhey Tompkins](https://jhey.dev/) | B | Small expressive CSS/SVG demonstrations. |
| 14 | [Jesse Zhou](https://www.jesse-zhou.com/) | B | Coherent 3D world with a deliberate entry moment. |
| 15 | [Ed Hinrichsen](https://edh.dev/) | B | CRT terminal metaphor and optional typed navigation. |
| 16 | [Jason Bergh](https://www.jasonbergh.com/) | C | Cinematic dark video portfolio; media-led transitions. |
| 17 | [Joshua Baker](https://www.joshuabaker.com/) | C | High-contrast typographic AI portfolio. |
| 18 | [Oliver Gareis](https://www.olivergareis.com/) | C | Editorial typography and project sequencing. |
| 19 | [Artiom Yakushev](https://www.art-yakushev.com/) | C | Red/black signal color and typographic motion. |
| 20 | [Dousan Miao](https://www.dousanmiao.com/) | C | Minimal light layout; subtle transitions. |
| 21 | [Sofia Khegai](https://khegai.com/) | C | Music/media portfolio; expressive color and type. |
| 22 | [Juan Mora](https://juanmora.co/) | C | 3D object as personal identity anchor. |
| 23 | [Philip Readman](https://www.philipreadman.com/) | C | Minimal grid; quiet project hover states. |
| 24 | [Alvin Leung](https://alvinn.design/) | C | Dark typographic work index. |
| 25 | [Maximilian Kaspar](https://www.maximiliankaspar.com/) | C | Oversized type and project rhythm. |
| 26 | [Daniil Chebotarev](https://www.daniilch.design/) | C | Monochrome portfolio; motion reserved for hierarchy. |
| 27 | [Vladimir Pushkarev](https://puschkarew.com/) | C | Light-blue typographic identity. |
| 28 | [Christopher Koziol](https://koziol.design/) | C | Minimal case-study transitions. |
| 29 | [Viacheslav Novoseltsev](https://vshslv.com/) | C | Orange accent and typographic navigation. |
| 30 | [Gianluca Patti](https://glcpatti.com/) | C | Black/white project staging. |
| 31 | [Artem Shcherban](https://artemshcherban.com/) | C | Calm light portfolio and progressive reveal. |
| 32 | [Joffrey Spitzer](https://joffreyspitzer.com/) | C | Minimal portfolio and hover-first response. |
| 33 | [Awais Razzaque](https://www.awaisrazzaque.com/) | C | Dark design portfolio and media emphasis. |
| 34 | [Amna Javed](https://amnajaved.com/) | C | Playful color and illustration response. |
| 35 | [Samuel Scalzo](https://www.scalzodesign.be/) | C | Black-and-white motion identity. |
| 36 | [Jordan Gilroy](https://www.jordangilroy.com/) | C | Typographic project index and restrained media. |
| 37 | [Elliott Mangham](https://elliott.mangham.dev/) | C | Development portfolio with dark editorial framing. |
| 38 | [ATOM63](https://atom63.io/) | C | Clean dark studio motion; team/portfolio crossover. |
| 39 | [Jon Howell](https://www.jonhowell.com/) | C | 3D design work used as hero proof. |
| 40 | [Mikki Sindhunata](https://mikkisindhunata.com/) | C | Video, display type, and texture. |
| 41 | [Eliot Besson](https://www.eliotbesson.com/) | C | Noise texture and dark cinematic pacing. |
| 42 | [Sergey Lisovskiy](https://lisovskiy.work/) | C | Light 3D portfolio; object-led transitions. |
| 43 | [Eduard Bodak](https://www.eduardbodak.com/) | C | Monospace/sans pairing and modular motion. |
| 44 | [Willy Brauner](https://willybrauner.com/) | C | Colorful development portfolio with compact interactions. |
| 45 | [Yianni Mathioudakis](https://www.yiannifive.com/) | C | Dark work index; bold selection transitions. |
| 46 | [Flayks](https://flayks.com/) | C | Colorful creative-development identity. |
| 47 | [Vucko](https://vucko.co/) | C | Motion studio restraint and typography. |
| 48 | [Character](https://www.character.studio/) | C | Narrow editorial composition and project transitions. |
| 49 | [Mat Voyce](https://matvoyce.tv/) | C | Character animation as primary portfolio content. |
| 50 | [Eva Sánchez](https://evasanchez.info/) | C | Monochrome/beige editorial sequencing. |
| 51 | [Jim Schachterle](https://jschachterle.com/) | C | Pattern-led personal identity. |
| 52 | [Devon Stank](https://devonstank.com/) | C | Hero video with simple dark layout. |
| 53 | [Michael Mannucci](https://michaelmannucci.com/) | C | Minimal one-page navigation. |
| 54 | [Diogo Correia](https://diogotc.com/) | C | Particle background and sticky hero navigation. |
| 55 | [Alex Naraghi](https://www.alexnaraghi.com/) | C | Text-first hero; evidence over spectacle. |
| 56 | [La Playa](https://laplaya.studio/) | C | Work grid first; local-time detail. |
| 57 | [Sharlee](https://itssharl.ee/) | C | Interactive background and day/night mode. |
| 58 | [Lauren Waller](https://www.lauren-waller.com/) | C | Large menu hover responses. |
| 59 | [Adenekan Wonderful](https://www.codewonders.dev/) | C | Subtle name glitch and inline navigation. |
| 60 | [Tania Rascia](https://www.taniarascia.com/) | C | Theme tools, code proof, and project demos. |
| 61 | [Kenneth Jimmy](https://kenjimmy.xyz/) | C | Framed/boxed scrolling experience. |
| 62 | [Tamal Sen](https://tamalsen.dev/) | C | Floating header, colored scroll details, back-to-top. |
| 63 | [Arpit Bhayani](https://arpitbhayani.me/) | C | Backend work explained with compact project evidence. |
| 64 | [Tom Weightman](https://www.tomweightman.com/) | C | Shipped-product list; role and outcome first. |
| 65 | [Koysor Abdul](https://www.koysor.me/) | C | Smooth long-form project browsing. |
| 66 | [Lars Olson](https://www.lars-olson.com/) | C | Personality-rich hover details. |
| 67 | [Niall McDermott](https://niallmcdermott.webflow.io/) | C | Static/dynamic split screen. |
| 68 | [Leland Jansen](https://www.lelandjansen.com/) | C | Blueprint motif and measurable project outcomes. |
| 69 | [Tim Gesemann](https://www.tim-gesemann.dev/) | C | Creative timeline with clear project simplicity. |
| 70 | [Keita Yamada](https://p5aholic.me/) | C | Small information architecture plus theme transition. |
| 71 | [Braydon Coyer](https://www.braydoncoyer.dev/) | C | Bento composition and Framer Motion. |
| 72 | [Matt Farley](https://mattfarley.ca/) | C | Friendly illustration and clear CTA hierarchy. |
| 73 | [Eric Van Holtz](https://www.ericvanholtz.com/) | C | Project-heavy presentation and strong transitions. |
| 74 | [Olaolu Olawuyi](https://olaolu.dev/) | C | Personal voice and compact development proof. |
| 75 | [Paco Coursey](https://paco.me/) | C | Text-first design-engineering credibility. |
| 76 | [Adham Dannaway](https://www.adhamdannaway.com/) | C | Split designer/developer illustration as the core metaphor. |
| 77 | [Ram Maheshwari](https://rammaheshwari.com/) | C | Clear conventional flow; useful restraint benchmark. |
| 78 | [Max Böck](https://mxb.dev/) | C | Content, open source, and whimsical experiments. |
| 79 | [Seán Halpin](https://www.seanhalpin.xyz/) | C | Illustration-led personality and availability clarity. |
| 80 | [Lazar Nikolov](https://nikolovlazar.com/) | C | Code-like layout with playful moving visuals. |
| 81 | [Sara Soueidan](https://www.sarasoueidan.com/) | C | Accessibility-led frontend expertise and case-study clarity. |
| 82 | [Cyd Stumpel](https://cydstumpel.nl/) | C | Creative-development experiments and work showcase. |
| 83 | [Lee Robinson](https://leerob.io/) | C | Writing-first personal site; calm benchmark. |
| 84 | [ithinkitschris](https://www.ithinkitschris.com/) | C | Handwriting detail over dark personal introduction. |
| 85 | [Ashley Willis](https://ashley.dev/) | C | Résumé represented as code and tabbed files. |
| 86 | [Roman Oganesian](https://www.rrr.berlin/) | C | Paper texture and link-marker system. |
| 87 | [Fedir Studio](https://fedir.studio/) | C | Dark cards and colorful work presentation. |
| 88 | [Hipe](https://hipe.rocks/) | C | Gradient identity and wireframe text depth. |
| 89 | [Ahmet Simsek](https://www.ahmetsimsek.dev/) | C | Productized bento rows and directional cues. |
| 90 | [Alec Jang](https://www.alecjang.dev/) | C | Bold condensed keyword block. |
| 91 | [Ameer Khan](https://iamameerkhan.com/) | C | Portrait layering and vertical type. |
| 92 | [Flagstaff Websites](https://flagstaffwebsites.ca/) | C | Process diagram as navigable proof. |
| 93 | [Sammy](https://smzr.co.uk/) | C | Grid field, portrait, and oversized serif identity. |
| 94 | [Abhijith A S](https://iabhi.dev/) | C | GitHub-like dark UI and technical card rhythm. |
| 95 | [Billy Baggerman](https://bbag.github.io/) | C | Code-block bio and device mockup. |
| 96 | [Aditya Singh](https://adityasingh.io/) | C | Staggered masonry work cards. |
| 97 | [Aitor Ezcurra](https://aitortita.com/) | C | Neon gradient glows and horizontal light streaks. |
| 98 | [Anish Biswas](https://www.anish7.me/) | C | Geometric portrait framing and accent typography. |
| 99 | [Dhruv Bakshi](https://www.dhruvbakshi.com/) | C | Retro 3D type and humorous positioning. |
| 100 | [Sehapa](https://www.sehapa.de/) | C | Developer portfolio from the Create Today cohort. |
| 101 | [Alan Hamlett](https://ahamlett.com/) | C | Founder/engineer credibility and product proof. |
| 102 | [Ali Younes](https://aliyounes.dev/) | C | Systems/full-stack personal portfolio benchmark. |
| 103 | [Allan Im](https://allanim.com/) | C | Software-engineer personal site benchmark. |
| 104 | [Althruist](https://althruist.fyi/) | C | Game-developer portfolio relevance. |
| 105 | [Aman Mittal](https://amanhimself.dev/) | C | Developer-education and mobile-focused proof. |
| 106 | [Aman Rai](https://obliviousaman.netlify.app/) | C | Vue/GSAP animation-focused portfolio. |
| 107 | [Anton Manaev](https://antonmanaev.name/) | C | Developer/designer crossover. |
| 108 | [Anup Pradhan](https://www.anuppradhan.in/) | C | Terminal-portfolio implementation benchmark. |
| 109 | [Aries Chang](https://ariesjchang.com/) | C | Software-engineer personal site benchmark. |
| 110 | [Arsh Mishra](https://windows-xp-portfolio-tau.vercel.app/) | C | OS-interface metaphor and nostalgia tradeoffs. |
| 111 | [Artur Bień](https://expensive.toys/) | C | UI/frontend developer identity and experimental naming. |
| 112 | [Aycan Öğüt](https://aycan.dev/) | C | Personal developer site from the community corpus. |

## Patterns worth adapting to this site

1. One signature systems metaphor, repeated at multiple scales.
2. Motion based on real metrics and architecture, not fake command-line copy.
3. Active navigation and progress that visibly reflect scroll state.
4. Project media that starts as a still image and comes alive on intent.
5. Scroll-linked architecture and evidence diagrams.
6. Reversible hover/focus/touch feedback with shared geometry.
7. Section transitions differentiated by content type, not a universal fade-up.
8. Small authored Easter eggs that relate to Unreal/networking systems.
9. Optional high-fidelity mode rather than forcing every visitor through it.
10. A complete static/reduced-motion experience.

## Patterns to reject or constrain

- Artificial preloaders for a fast static page.
- Global custom cursors.
- Smooth-scroll hijacking.
- Paragraph-by-paragraph text splitting.
- Infinite bobbing on many cards.
- Blanket `will-change`.
- Dozens of simultaneous autoplay videos.
- Long pinned sequences that trap scrolling.
- Decorative particle fields unrelated to the work.
- Sound that starts without explicit opt-in.

## Technical references

- MDN, CSS scroll-driven animations: <https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations>
- MDN, animation timelines: <https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations/Timelines>
- Chrome, same-document View Transitions: <https://developer.chrome.com/docs/web-platform/view-transitions/same-document>
- web.dev, animation performance: <https://web.dev/articles/animations-guide>
- W3C, animation from interactions: <https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions>
- W3C technique C39, `prefers-reduced-motion`: <https://www.w3.org/WAI/WCAG22/Techniques/css/C39>

## Research limitations

- Browser observations are a snapshot, not a DevTools performance trace or cross-device test.
- Many creative sites implement motion in canvas/WebGL or runtime transforms, so CSS counts under-report activity.
- Catalogue-level entries were used to identify patterns and breadth; they were not all subjected to full interaction-path testing.
- Sites change frequently. URLs and implementations should be rechecked when a specific pattern is selected for production.
