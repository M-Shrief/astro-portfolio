---
title: 'MPA VS SPA'
description: "We'll discuss Multi-Page Application (MPA) VS Single-Page Application (SPA) in terms of Rendering, State Management and Routing."
pubDate: '12 Aug 2023'
heroImage: ''
categories: ["frontend"]
tags: ["astro", "javascript", "mpa", "spa"]
related: ['intro-to-astro', 'migrate-vuejs-spa-to-ssr-with-astro/intro']
---

## Overview

**Multi-Page Application (MPA)** is a website consisting of multiple HTML pages, mostly rendered on a server. When you navigate to a new page, your browser requests a new page of HTML from the server. MPA frameworks include Astro, Ruby on Rails, Python Django, PHP Laravel, WordPress and on.

**Single-Page Application (SPA)** is a website consisting of a single JavaScript application that loads in the user’s browser and then renders HTML locally. SPAs may also generate HTML on the server, but SPAs are unique in their ability to run your website as a JavaScript application in the browser to render a new page of HTML when you navigate. React, Vuejs, Next.js, Nuxtjs are examples of SPA frameworks.

There are three main differences to be aware of when comparing MPAs and SPAs:

- [Rendering](#rendering)
- [State Management](#state-management)
- [Routing](#routing)

## Rendering

In MPAs, most of your page's HTML is rendered on the server, unlike SPAs which render most of the HTML locally by running JavaScript on the client. This impacts site behavior, performance and SEO.

You may think that rendering your HTML in the browser should be a faster option taht requesting it from a remote server, but actually, a SPA will consistently perform slower first page loads than an MPA unless you use SSR.

This is because an SPA needs to download, parse, and run an entire JavaScript application in the browser just to render any HTML on the page. Then, your SPA will likely need to fetch remote data anyway, introducing even more wait time before your page is finished loading.

SPAs solve this problem with adding basic server rendering on first page load, but it introduces new complexity due to the implication of rendering in multiple ways, and in multiple environments. This also introduces a problem where the site appears loaded but is unresponsive since the JavaScript logic is still loading.

But observe that, when MPAs have client-side updates, They'll have the same implication of rendering in multiple ways and in multiple environments.

MPAs render all HTML on a remote server and don't require much, if any, JavaScript to run. This gives MPAs a much faster first load experience, which is essential for content-focused websites.
But don't get this wrong, this comes with a tradeoff, future page navigation can't benefit from local rendering, and third-party scripts must be evaluated on every page load, so the long-lived user experience won't benefit as much after the first page load.
Unlike **SPA** which evaluates all of this on the first page only.

If you're using MPA, check out [PartyTown](https://partytown.builder.io/ "to Relocate resource intensive third-party scripts off of the main thread and into a web worker").

## State Management

SPAs are the superior architecture for websites that deal with complex, multi-page state management (think Gmail). This is because an SPA runs the entire website as a single JavaScript application, which lets the application maintain state and memory across multiple pages. Interactive, data-driven experiences like inboxes and admin dashboards do well as SPAs because the website itself is inherently “app-like”.

MPAs add a burden to your backend to manage your users' state. This adds complexity and performance concerns because this method requires network requests, which means you need to handle errors between your frontend and backend, as well as the usual network concerns: **latency**, **bandwidth**, **security concerns** and on.

SPAs will be less resilient because they won't work without JavaScript, and [JavaScript failing is not rare.](https://www.kryogenix.org/code/browser/everyonehasjs.html "Everyone has JavaScript, right?").

## Routing

In MPAs, every request to the server decides which HTML to respond with, so routing lives on the server.
In SPAs, your router runs locally in the browser and hijacks any navigation to render the new page without hitting a server.

MPAs offer a faster first load experience, while SPAs may offer a faster second or third page load once the JavaScript application is fully loaded in the browser.

SPAs can also offer more powerful transitions across page navigation because they control so much about page rendering.
To match this support, MPAs leverage tools like Hotwire’s Turbo that mimic client routing by also controlling navigation in the browser.

## Which is better?

When comparing MPAs vs SPAs, there is no “better” or “worse” choice, you need to choose the easier and better approach to reach your core goals, and then you'll work to minimize and blind the pitfalls of your choice with other solutions.

Most likely, you'll need to evaluate your needs in terms of:

- Domain's complexity.
- Team structure, experience and how they communicate with each other.
- Suitable performance and SEO for your goal.
- UX and UI.
- Deployment strategy, and how it'll affect your website/application.

In upcoming blogs, we'll discuss current approaches and their strategies to get the most of MPAs and SPAs for their businesses.

## Resources

- [Rich Harris on frameworks, the web, and the edge](https://www.youtube.com/watch?v=uXCipjbcQfMandpp=ygULcmljaCBoYXJyaXM%3D "On youtube")

- [Ryan Carniato, Islands, Partial Hydration, and JavaScript Frameworks](https://www.youtube.com/watch?v=Q0mXYbA86Qo "On youtube")

- [Ryan Carniato and Fred K. Scott, Astro SSR.](https://www.youtube.com/watch?v=2ZEMb_H-LYE "On youtube")

- [Have Single-Page Apps Ruined the Web? | Transitional Apps with Rich Harris, NYTimes](https://www.youtube.com/watch?v=860d8usGC0o "On youtube")
