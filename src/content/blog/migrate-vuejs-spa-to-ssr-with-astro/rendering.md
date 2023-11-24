---
title: 'Migrate from Vuejs SPA to SSR with Astro - Rendering'
description: "We'll discus how to control your pages and components rendering."
pubDate: '9 Nov 2023'
categories: ["frontend"]
tags: ["astro", 'vuejs', "javascript", "spa", 'ssr']
---

We'll discuss how we'll deal with our adapter's output strategy and how to control your pages and components rendering, but take note that I'll refer a lot to Astro's docs, because it's the original source of information.

## Adapter's output

We've got 2 options:

- If most of your site is static, then choose **hybrid**, and you can make any individual page or endpoint can opt-out of pre-rendering.

```astro

---
// src/pages/*.astro
export const prerender = false;
---
```
- If most of your site should be server-rendered then choose **server**, and you can make any individual page or endpoint can opt-in to pre-rendering.

```astro

---
// src/pages/*.astro
export const prerender = true;
---
```

So let's talk more about specifics...

## Rendering Pages
In most of our applications, we have different needs for our pages, the decision is yours. A lot of times, your page is static by default, like your *about* and *authentication* pages.

But there are some cases where you need your page to be server-rendered:

- If you need to check if the user is authenticated or not so that you can guard the route:

```astro

---
// src/pages/partner/history

// Canceling prerender, because we use hybrid output so that we can read the cookie and act.
export const prerender = false; 

const isAuthenticated = Astro.cookies.has('accessToken')
if (!isAuthenticated) return Astro.redirect("/partners/auth");
---
```
- If the route depends on something like an *id* param to make a request to the database, because you don't want it to show the same content it loaded first for different parameters:
```astro

---
// GET /api/poet/:id
// src/pages/poet/[id].astro

// Canceling prerender, because we use hybrid output 
export const prerender = false;
const { id } = Astro.params;

if (!id) Astro.redirect("/");
else await fetchPoet(id);
---
```

Until now, I didn't meet any cases that made it a **must** to server-render a page, I prefer to make static rendering my default, it's just enough.

## Rendering Component
Now, let's talk about how we can use Astro's [client-directives](https://docs.astro.build/en/reference/directives-reference/#client-directives "Astro's docs: client-directives") to control which component is hydrated in the client or not and when it'll be hydrated, but it can only apply to other UI frameworks like Vuejs and React. Every directive has a priority level, so Astro knows which is more needed.

Astro has five directives:
- **client-load**: with a *high* priority, it loads and hydrates the component JavaScript immediately on page load.
- **client-idle**: with a *medium* priority, it's my default choice. It's used with components that don't need to be hydrated immediately. It hydrated after the page's initial load.
- **client-only**: it's the same as client-load, but it skips the HTML server-render and renders only in the client, it's very useful when you're using web-only APIs like session or local storage.
- **client-visible**: with a *low* priority, it loads and hydrates the component JavaScript once the component has entered the user’s viewport, which is very useful to use with content-intensive pages.
- **client-media**: with a *low* priority, it hydrates once a certain CSS media query is met.

The same component can have different **client-directive** on different pages>

As an example from my project ["Adeeb"](https://github.com/M-Shrief/Adeeb_Astro_SSR 'Github repo'), I have a component where I show most of my HTTP errors messages for users that take a client-directive on pages like the *authentication* page, *order* page and *history* page, so that it reacts to a failed login or invalid order:
```astro

<!-- ........... -->
<HttpPopUp client:idle slot="http-popup"/>
<!-- ........... -->
```

But it doesn't take any directives in */poem/[id]* or */poet/[id]* pages, so it reacts to non-existing IDs:
```astro

<!-- ........... -->
<HttpPopUp slot="http-popup"/>
<!-- ........... -->
```

Another component like *SelectPrints*, where I persist data on SessionStorage, uses a client-only directive:
```astro

<!-- src/pages/index.astro -->
<SelectedPrints client:only="vue" />
```

Astro gives you full control over your components, it only depends on your architecture and whether you make the right decision.

## Resources

- [Astro's SSR Adapters](https://docs.astro.build/en/guides/server-side-rendering/ "Astro Documentation")
- [Astro's client-directive](https://docs.astro.build/en/reference/directives-reference/#client-directives "Astro Documentation")
- [My project "Adeeb" as an example](https://github.com/M-Shrief/Adeeb_Astro_SSR "Github repo")