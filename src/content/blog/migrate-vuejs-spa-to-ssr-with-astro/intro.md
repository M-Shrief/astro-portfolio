---
title: 'Migrate from Vuejs SPA to SSR with Astro - Intro'
description: "We'll take another route for migrating your Vuejs SPA with Astro instead of Nuxt, we'll discuss the difference between both, and why you should choose Astro instead."
pubDate: '01 Nov 2023'
categories: ["frontend"]
tags: ["astro", 'vuejs', "javascript", "spa", 'ssr']
related: ["migrate-vuejs-spa-to-ssr-with-astro/setup", "migrate-vuejs-spa-to-ssr-with-astro/strategy", "migrate-vuejs-spa-to-ssr-with-astro/state-management", "migrate-vuejs-spa-to-ssr-with-astro/routing"]
---

## Vuesjs SSR solutions

The go-to solution for SSR in Vuejs ecosystem is Nuxt. It's a framework built on top of the Vuejs ecosystem, which provides a streamlined development experience and gives you utilities for data fetching, testing and more. And of course, the Nuxt ecosystem was an important pillar of the [UnJS](https://unjs.io/) project.

Nuxt is built on top of Vuejs, you need to start with Vuejs complexity, then add more complexity by using Nuxt, so that you're able to tune it for your business needs.

The other solution I want to suggest here is Astro. Astro give you the ability start from a static site then with its **Island Architecture**, it gives you the ability to use any UI framework like Vuejs to make certain components reactive. So it'll only make you add this complexity when you need it, only where you need it. And it have an outstanding performance and optimized SEO.  

So with Astro you start from the base, and increamentally scale up in complexity, theoriticaly in one way. But with Nuxt, you add Vuejs complexity, then you take out what you don't need by adding Nuxt - adding more complexity - to tune it down for your needs.

I think, most of the time, scaling up in some linear way - adding things step by step when their time comes — is easier than scaling up then scaling down again to remove things you didn't need.

Especially if scaling down requires you to add another layer of complexity rather than just removing it. 

### Why not just use a plugin?

But wait a second, why don't we just use a plugin? You know, "do one thing and do it right", it's way simpler than using Nuxt and Astro.

Well, decreasing complexity is not the only goal, we want more power, better developer experience as developers, and of course, these frameworks are better for marketing ourselves as developers and companies -- I've never seen a plugin in a job description.

But actually, there's a business need for using them, these frameworks are greetly supported by cloud and edge providers, and we can deploy them in most -- if not all, of providers -- with ease in operation, scaling, serving over CDNs and more. They also have bigger communities to move them forward and fix things, so they're a better choice from my point of view.

## Series introduction
I wanted to make a series showing what I've experienced while migrating my SPA project "Adeeb أديب" to SSR with Astro. 

The SPA version was:
- Mainly using TypeScript
- Leveraging Vuejs with Pinia and VueRouter with other libraries from Vuejs ecosystem like VueUse and Vee-Validate.
- Using Vite and having Component testing with Cypress
- Integrated with a Nodejs Rest API with MongoDB and Redis.

The SSR version was the same, except it was:
- Using Astro for SSR with Vuejs.
- Using Vitest for Component testing and Unit testing (in-source).
- integrated with a Nodejs Rest API with Postgres and Redis.
- More support for SEO, sitemap and more...

You can see their repos:
- [SPA version](https://github.com/M-Shrief/Adeeb_Vue_TS 'Github repo')
- [SSR version](https://github.com/M-Shrief/Adeeb_Astro_SSR 'Github repo')

I will publish the series, taking each point, like:
- State Management
- Routing
- Component Testing
- ...etc

### Prerequisites

I expect you to be familiar with:

- Vuejs:
    - Composition API.
    - Project Structure
    - Routing and State management

- Get a first look on Astro's docs, read their reasons and way of thinking. And keep it open while reading. 
