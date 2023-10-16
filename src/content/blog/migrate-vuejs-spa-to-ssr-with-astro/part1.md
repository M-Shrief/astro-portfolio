---
title: 'Migrate from Vuejs SPA to SSR with Astro, part 1'
description: "We'll take another route for migrating your Vuejs SPA with Astro instead of Nuxt, we'll disucss the difference between both, and why you should choose Astro instead."
# isDraft: true
pubDate: '12 Aug 2023'
relatedPosts: 
- mpa-vs-spa
- astro
- signals
---

## Vuesjs SSR solutions

The go-to solution for SSR in Vuejs ecosystem is Nuxt, it's a framework built on top of the Vuejs ecosystem which provides a streamlined development experience, it gives you utilities for data fetching, testing and more. And of course, the Nuxt ecosystem was an important pillar in [UnJS](https://unjs.io/).

Nuxt is built on top of Vuejs, you need to start from Vuejs complexity then you need to add more complexity by using Nuxt, so that you're able to tune it for your business needs.

The other solution I want to suggest here is Astro. Astro give you the ability start from a static site then with its Island Architecture, it gives you the ability to use any UI framework like Vuejs to make this place reactive. So it'll only make you add this complexity when you need it, only where you need it. And it've an outstanding performance and optimized SEO.  

So with Astro you start from the base, and increamentally scale up in complexity, theoriticaly in one way. But with Nuxt, you add Vuejs complexity, then you take out what you don't need by adding Nuxt - adding more complexity - to tune it down and up for your needs.

### Why not just use a plugin?

But wait a second, why don't we use a plugin? You know "do one thing and do it right", it's way simpler than using Nuxt, and still simpler than using Astro.

Well, decreasing complexity in not the only goal, we want more power, better developer experience as developer, and of course this frameworks are better for marketing our selves as developers and companies -- I've never saw a plugin in a job description. But there's a business need actually in using them, these frameworks are greetly supported from Cloud and Edge providers, we can deploy them in most - if not all - of providers, with ease in operation, scaling, serving over CDNs and more, beside they've bigger communities to move them forward and fix things, so they're a better choice in overall in my point of view.

## Series's project

In this series, we will migrate one of my project "Adeeb", it's Vuejs SPA interacting with a Nodejs REST API.

Tech stack:
- Mainly TypeScript with HTML and SCSS
- Vuejs with Composition API, Pinia and VueRouter
Characteristics: 
- JWT Authentication and Authorization
- Data Validation with Vee-Validate and Yup.
- Dark/Light Themes
- Component testing