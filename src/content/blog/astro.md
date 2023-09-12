---
title: 'Astro distilled'
description: '          Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore hic sint quaerat temporibus quidem expedita harum? Alias sequi sit, repellendus eius quo excepturi facilis nulla omnis in perferendis temporibus maiores ullam dolorum nisi quod? Incidunt molestiae laborum, necessitatibus minus fugit unde. Recusandae ducimus expedita velit harum natus, quam laboriosam impedit error qui a reprehenderit ab enim tempore nesciunt voluptatem commodi optio quia provident eos obcaecati quas tempora corrupti rerum architecto. Quis, aspernatur, aliquid quaerat velit possimus alias ut tenetur tempora fugiat saepe inventore? Cum quam pariatur distinctio quaerat. Fugiat quae hic vitae porro voluptates at sed suscipit. Ipsa inventore numquam nam fugiat rem dicta iusto expedita sunt laudantium optio, recusandae necessitatibus accusantium molestias dignissimos. Inventore quasi quia neque, fuga impedit placeat mollitia odit vitae ad commodi nihil dolorum voluptate aliquam iusto deleniti, illum odio ipsum, laboriosam obcaecati amet! Fugit reiciendis dignissimos consequatur quidem quod accusantium quisquam expedita provident! Porro, repudiandae id. Iste ut fugiat ad rem ea. Voluptatem eius ipsa sequi numquam et temporibus qui similique voluptas laboriosam repudiandae ullam quod quam illo omnis, ex officia odit animi! Explicabo enim magnam tenetur quibusdam odit maiores molestias. Suscipit, labore adipisci, nisi fuga aperiam unde explicabo ad eum a asperiores reprehenderit voluptates?
'
pubDate: '12 Aug 2023'
heroImage: '/blog-placeholder-3.jpg'
relatedPosts: 
- signals
- mpa-vs-spa
---

# An Introduction to Astro

Astro is an all-in-on web framework for building fast & content-rich websites this includes most marketing & publishing sites, blogs, portfolios and some e-commerce sites.

By contrast, most modern frameworks are build for web applications and they're best for building more complex, and application-like experience in the browser.

This is very important, Astro's focus on content, make it easy for it to make tradeoffs and deliver unmatched performance features that wouldn't make sense for application-focused web frameworks.

Key Concepts:

- **Component Islands**
- **Server-first API Design**: Astro leverages server-side rendering over client-side rendering as much as possible to move expensive hydration off of your users' devices.

In contrast with other modern web frameworks, which follows the SPA model like Nextjs, Nuxtjs and others, these frameworks require client-side rendering of your entire website and include server-side rendering mainly to address performance and optimizations needs.

The SPA model has its benefits, like moving state management from servers to the client, however it comes at the expense of additional complexity and performance tradeoffs. This tradeoffs should be taken with awareness and careful measurment for your needs.

- **Fast by Default**: for content-focused websites, performance is especially critical, without it, you lose engagement, conversions and money.
  It's easy to build a website that looks great during development only to load slowly once deployed, especially with users' phones and lowered-powered devices.
  Out of the box With Astro, and its tradeoffs, It should be nearly impossible to build a slow website

- **Zero JS by default**, and don't get me wrong, zero JavaScript is not a goal, you'll need JavaScript most of the time any way, it's about only shipping the JavaScript you need and nothing more or less.
- **Edge-ready**: In this days, you can't develop your website or app without thinking about deployment, Astro can be deployed anywhere as a traditional static website to Nodejs (For SSR use-cases) to Netlify or Vercel or global edge runtime like Cloudflare.

- **Top tooling CLI** to customize your project, with 100+ integrations, easily integrate TypeScript, TailwindCSSS, Partytown, and more without getting lost on some problem or wasting your time for a mistake that you don't see, and that CLI is name **Houston**.

- **UI agnostic** you can easily add UI framework with Astro's CLI to work with Vuejs, React, Solid Qwik and more.

<!-- ----------------------------------------------- -->

With the increasing number of meta frameworks in the frontend atmosphere, there was something flying in space swimmingly, it was as astro.

The greatest thing I encountered this year was Astro, it was something very different from the emerging meta frameworks, it was like a **platform** or a **base**, it should be your first stop after learning the base of frontend development (e.g. HTML, CSS and JavaScript).

With Astro you stay close to your base knowledge, and you add important concepts bit by bit, and in some time you'll have great content-based sites which are optimized and performant, and with that you can start freelancing in this area (very good for career shifters)

# Astro for Juniors

Astro’s goal is to be accessible to every web developer, regardless of skill level or past experience with web development.

It'll introduce you to important concepts, without needing a big jump from the basics you learned.

For instance, you'll learng component architecture Astro's team made sure that they have great built-in componenet language, any valid HTML snippit is valid Astro component. it'll introduce you features borrowed from other component langauges like JSX expression (React), CSS Scoping (Vuejs & Svelte), because of its closeness to HTML, it's easier to use common accessibility patterns, and advanced concepts like **Progressive enhancements**.

Astro includes file-based routing, asset handling, a buid process, bundling, optimizations and data fetching.

Because of it Server-first rendering, Astro is designed to be less complex that other UI frameworks, you don't need to worry about hooks, stale closures refs, observables and on by default, you only start with what you need then increamentally add on it.

As a junior, you won't waste hours again struggling with your configuration, Astro well help you to easily configure things like TypeScript, TailwindCSS and even more.
You can easily integrate any framework with Astro, and as a Junior, Astro well ease your decision on which framework to learn, because you try using all of them in astro as components to see with your own eye their syntax, directive, component design,...etc.
With Astro you can do that _bad-idea-you-shouldn't-do_ a.k.a **Microfrontend**, I can't see any reasonable cause to approach it with out a business need, like changing teams, migrations, preventing lock-in to a single framework, etc.

Astro is like a gate, or should be, to increase your site reactivity if needed and because of it's island Architecture it will only make reactivity in the place and time needed.

# Astro in the Market

Astro'll open the way for frontend developers who were struggling to freelance because they shine at SPA frameworks only, and they can hardly deal with a customer because they take SEO & Performance as a garantee, and UX as an add-on.
With Astro, new developers will be able to make modular, performant landing pages, blogs, publishing/marketing sites and portfolios, and that's what you expect from a newbie, then they'll be able to add small reactive features to this sites, to improve their UX.
And they'll only move to Single Page Applications when need, and not the opposite

## Astro Islands

The term “Astro Island” refers to an interactive UI component on an otherwise static page of HTML. Multiple islands can exist on a page, and an island always renders in isolation. Think of them as islands in a sea of static, non-interactive HTML.

In Astro, you can use any supported UI framework to render islands in the browser. This is known as **partial** or **selective hydration**. Astro leverages this technique behind the scenes, powering your islands automatically.

### How Do Islands Work in Astro?

Astro generates every website with zero client-side JavaScript, by default. When using any UI framework, Astro will atomatically render it to HTML ahead of time and then strip out all of the JavaScript for performance.

Sometimes, client-side JavaScript is required for creating interactive UI. With Astro instead of forcing your entire page to become an SPA, Astro enable you to make an islolated & interactive island.

### What are the benefits of Islands?

The most obvious benefit is performance: the majority of your website is converted to fast, static HTML and JavaScript is only loaded for the individual components that need it. JavaScript is one of the slowest assets that you can load per-byte, so every byte counts.

Another benefit is parallel loading. The low-priority island doesn’t need to block the high-priority island. The two load in parallel and hydrate in isolation.

Even better, you can tell Astro exactly how and when to render each component with client directives. If that component is really expensive to load, you can attach a special client directive that tells Astro to only load the carousel when it becomes visible on the page. If the user never sees it, it never loads.

In Astro, it’s up to you as the developer to explicitly tell Astro which components on the page need to also run in the browser. Astro will only hydrate exactly what’s needed on the page and leave the rest of your site as static HTML.
