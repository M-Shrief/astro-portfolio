---
title: "An introduction to Astro "
description: "Breaking Astro main concepts and advantages, and it's impact on developers and the market, in my view"
pubDate: "23 Sep 2023"
heroImage: ""
categories: ["frontend"]
tags: ["astro", "javascript", "mpa"]
related: ["mpa-vs-spa", "migrate-vuejs-spa-to-ssr-with-astro/intro"]
---

Nowaday in the frontend sphere, it's almost required to work in a _Meta framework_ that gives you _more features_, even if you don't need it because of a technical problem. It's needed because you're pushed to use it!

All developers and businesses try to use big and sophisticated technologies to get hired or to market themselves, even if it doesn't help them reach their goal.

Now, there's a solution for that that gives you what you need, only when you need it, with no over-opinionated way of using it, it's Astro.

## What's Astro?

Astro is an all-in-one web framework that scales in complexity with you as a business or a developer, it's not like a _Meta_ framework but a **platform**, a base you start from. Rather than being pushed to use a framework, and getting surprised after knowing its disadvantages, with Astro, you can scale its complexity when you actually need it.

Astro makes you make these tradeoffs with awareness, only where you need to make these tradeoffs with **Islands architecture** to make only the parts you want reactive in the time you want them to be, rather than making the whole site reactive like SPAs -- engineering wise that's feels better.

Plus, it's **Server-first API Design** leverages server-side rendering over client-side rendering as much as possible to move expensive hydration off of your users' devices.

The SPA model has its benefits, like moving state management from servers to the client; however, it comes at the expense of additional complexity and performance tradeoffs. These tradeoffs should be made with awareness and careful measurement of your needs.

Astro provides **zero JavaScript by default**, and don't get me wrong, zero JavaScript is not a goal; you'll need JavaScript most of the time anyway; it's about shipping only the JavaScript you need and nothing more or less.

### Islands distilled

Islands are interactive UI components on an otherwise static page of HTML. Multiple islands can exist on a page, and an island always renders in isolation. Think of them as islands in a sea of static, non-interactive HTML.

In Astro, you can use any supported UI framework to render islands in the browser. This is known as **partial** or **selective hydration**. Astro leverages this technique behind the scenes, powering your islands automatically.

**What are the benefits of Islands?**

The most obvious benefit is performance: the majority of your website is converted to fast, static HTML and JavaScript is only loaded for the individual components that need it. JavaScript is one of the slowest assets that you can load per-byte, so every byte counts.

Another benefit is parallel loading. The low-priority island doesn’t need to block the high-priority island. The two load in parallel and hydrate in isolation.

Even better, you can tell Astro exactly how and when to render each component with client directives. If that component is really expensive to load, you can attach a special client directive that tells Astro to only load it when it becomes visible on the page. If the user never sees it, it never loads.

In Astro, it’s up to you as the developer to explicitly tell Astro which components on the page need to also run in the browser. Astro will only hydrate exactly what’s needed on the page and leave the rest of your site as static HTML.

## Astro for Businesses

As previously said, with Astro you'll only scale your website complexity as you need it, not getting your site fully reactive with a SPA framework just because you need a little reactivity here and there. You just do what you need when you need it.

Besides you'll not lose any core business values like SEO and performance, you can't just ignore these core values in the market, except in special cases. But if you choose a SPA framework like _React_, you'll need to solve these things by adding more complexity with something like _Nextjs_ or a plugin, and these things are great, but if you don't actually need them, they're wasting time and money.

And you can achieve a great user experience with features like **ViewTransitions**, which take advantage of the browser APIs to give smooth transitions between your pages without needing to convert your site to a SPA only for that thing.

Because Astro is UI-Agnostic, you can use it as a base to fix multiple business problems in terms of migrations, staffing, eliminating some costs and more. You can combine different frameworks easily, solve problems and move on to your core goal.

## Astro for Developers

Astro is accessible to every web developer, regardless of skill level or experience with web development, especially if you're a junior. You'll easily get started with base HTML, CSS and JavaScript, then you can learn core/shared frontend concepts step by step, like components, slots, using JSX, scoped styling in components, and more.

It has a top-notch CLI to customize your project and easily integrated with TypeScript, TailwindCSSS, Partytown, and more without getting lost in some problem or wasting your time on a mistake that you don't see.

Plus, Server-first rendering enables Astro to be less complex than other UI frameworks, you don’t need to worry about hooks, stale closures, refs, observables, and so on by default, you only start with what you need and then incrementally add on it.

You can play with JavaScript in astro components to add reactivity manually or deal with browser APIs like Sessions and Cookies, which will lead you to use client-directives to control how and when to render/hydrate the component as an Island. That's not what we should do, we can combine a SPA framework like _React, Vue, Solid, Svelte, and many more_ to write reactive components in your astro site.

The best thing, it can ease your choice of framework a bit, because you can easily try several frameworks in the same Astro project, combining them together, learning their concepts, and even using their state management libraries like _Pinia_.

So again, you learn step-by-step, and then, if you need to, you can choose to migrate easily to use them as a full SPA.

## Conclusion

Astro's architecture provides alot of advantages, you maintain core values (e.g. performance, SEO and on), being UI agnostic make it easier to migrate and onboard on, it provide more options for management and the developers to reach their goal, and it's edge-ready to deploy anywhere.

Astro's still have a little share on the market, but it's growing and getting big attention, especially because it benchmarks and integrations. And Astro have the potential to be used from companies and freelancers in small and big projects.

With more adaption, Astro'll have more issues, but I think they can take it far because it's divearse contribiuter from various ecosystems.

Note: if you're a junior, maybe it's still better to learn React and TypeScript to land a job, but learning Astro surelly will give you a boost, especially because you'll think about somethings that gets ignored alot of time.

## Resources

- [Astro's docs](https://docs.astro.build "open the docs")
- [Ryan Carniato and Fred Scot chat about Astro and SSR](https://www.youtube.com/watch?v=2ZEMb_H-LYE "youtube video")
- [Fred K. Schott: Astro, Open Source, and the Web](https://www.youtube.com/watch?v=9196iQJtK4s "Youtube video")
- [Theo t3 with Fred Schott, Astro version](https://youtu.be/CYuujJvgmns "youtube video")
