---
title: 'MPA VS SPA'
description: 'Multi-Page Application (MPA) VS Single-Page Application (SPA)'
pubDate: '12 Aug 2023'
heroImage: '/blog-placeholder-3.jpg'
relatedPosts: 
- signals
- astro
---

# Multi-Page Application (MPA) VS Single-Page Application (SPA)

**Multi-Page Application (MPA)** is a website consisting of multiple HTML pages, mostly rendered on a server. When you navigate to a new page, your browser requests a new page of HTML from the server. MPA frameworks includes Astro, Ruby on Rails, Python Django, PHP Laravel, WordPress and on.

**Single-Page Application (SPA)** is a website consisting of a single JavaScript application that loads in the user’s browser and then renders HTML locally. SPAs may also generate HTML on the server, but SPAs are unique in their ability to run your website as a JavaScript application in the browser to render a new page of HTML when you navigate. Next.js, Nuxtjs are examples of SPA frameworks.

There are three main differences to be aware of when comparing MPAs vs. SPAs:

- [Rendering](mpa-vs-spa#rendering)
- [State Management](mpa-vs-spa#state-management)
- [Routing](mpa-vs-spa#routing)

## Rendering

In MPAs, most of your page's HTML is rendered on the server, unlike SPAs which renders most of the HTML locally by running JavaScript on the client. This impacts site behavior, performance and SEO.

You may be think that rendering your HTML in the browser should be faster option taht requesting it from remote server, but actually a SPA will consistently perform slower first page load against an MPA, unless you used SSR.

This is because an SPA needs to download, parse, and run an entire JavaScript application in the browser just to render any HTML on the page. Then, your SPA will likely need to fetch remote data anyway, introducing even more wait time before your page is finished loading.

SPAs solve this problem with adding basic server rendering on first page load, but it introduces new complexity due to the implication of rendering in multiple ways, and in multiple environments. This also introduces a problem where the site appears loaded but is unresposive since the JavaScript logic is still loading.

But observe that, when MPAs have client-side updates, They'll have the same implication of rendering in multiple ways, and in multiple environments.

MPAs render all HTML on remote server, and don't require much, if any, JavaScript to run. This gives MPAs a much faster first load experience which is essential for content-focused websites.
But don't get this wrong, this comes with a tradeoff, future page navigation can't benefit from local rendering, and third party scripts must be evaluated on every page load, so long-lived user experience won't benefit as much after the first page load.
Unlike **SPA** which evaluate all of this on first page only.

If you're using MPA, check out [PartyTown](https://partytown.builder.io/ "Relocate resource intensive third-party scripts off of the main thread and into a web worker").

## State Management

SPAs are the superior architecture for websites that deal with complex, multi-page state management (think: Gmail). This is because an SPA runs the entire website as a single JavaScript application, which lets the application maintain state and memory across multiple pages. Interactive, data-driven experiences like inboxes and admin dashboards do well as SPAs because the website itself is inherently “app-like”.

MPAs add a burden to your backend, to manage your users' state. This add complexity and performance concern because this method need network requests, which means you need to handle erros between your frontend and backend, and the usual network concerns: **latency**, **bandwidth**, **security concerns** and on.

SPAs will be less resilient, because it won't work without JavaScript, and [JavaScript failing is something not rare](https://www.kryogenix.org/code/browser/everyonehasjs.html "Everyone has JavaScript, right").

## Routing

In MPAs, every request to the server decides which HTML to respond with, so routing lives on the server.
In SPAs, your router locally runs in the browser and hijacks any navigation to render the new page without hitting a server.

MPAs offer a faster first load experience, while SPAs may offer a faster second or third page load once the JavaScript application is fully loaded in the browser.

SPAs can also offer more powerful transitions across page navigation because they control so much about page rendering.
To match this support, MPAs leverage tools like Hotwire’s Turbo that mimic client routing by also controlling navigation in the browser.

## Which is better?

When comparing MPAs vs SPAs, there is no “better” or “worse” choice. It all comes down to tradeoffs.

Sometimes you need to prioritize MPAs because it makes the most sense for content-focused websites like blogs, landing pages/porfolios and a good portion of e-commerce sites. More stateful, interaction-heavy websites may benefit more from the app-like architecture that SPAs bring at the expense of first-load performance like a lot of e-commerce sites, social media and on.

So you need to evaluate your needs in terms of:

- Domain's complexity.
- Team structure, experience and how the communicate with each other.
- Suitable performance & SEO for your goal.
- UX & UI.
- Deployment strategy, and how it'll affect your website/application.

In upcoming blogs, we'll discuss current approaches and their strategies to get the most of MPAs SPAs for their business.

## Resources

- [Rich Harris on frameworks, the web, and the edge](https://www.youtube.com/watch?v=uXCipjbcQfM&pp=ygULcmljaCBoYXJyaXM%3D "On youtube")

- [Ryan Carniato, Islands, Partial Hydration, & JavaScript Frameworks](https://www.youtube.com/watch?v=Q0mXYbA86Qo "On youtube")

- [Ryan Carniato & Fred K. Scott, Astro SSR.](https://www.youtube.com/watch?v=2ZEMb_H-LYE "On youtube")

- [Have Single-Page Apps Ruined the Web? | Transitional Apps with Rich Harris, NYTimes](https://www.youtube.com/watch?v=860d8usGC0o "On youtube")