---
title: "Migrate from Vuejs SPA to SSR with Astro - Routing"
description: "Taking a look at Astro's file-based routing, and how to use it to migrate a Vuejs SPA to an SSR, and how to force specific pages to be rendered as static or server-rendered, and guarding specific routes that need authentication."
pubDate: "10 Nov 2023"
categories: ["frontend"]
tags: ["astro", "vuejs", "javascript", "spa", "ssr"]
related:
  [
    "migrate-vuejs-spa-to-ssr-with-astro/intro",
    "migrate-vuejs-spa-to-ssr-with-astro/rendering",
    "migrate-vuejs-spa-to-ssr-with-astro/state-management",
  ]
---

In Vuejs, you'll a library like VueRouter to configure your routes and route-guards, but Astro uses a technique to configure your routes with conventions. Astro uses **file-based routing**, you create your pages in _src/pages_ directory, and it maps the page to a route in a conventional way.

```md
src/pages/index.astro -> mysite.com/
src/pages/about.astro -> mysite.com/about
src/pages/about/index.astro -> mysite.com/about
src/pages/about/me.astro -> mysite.com/about/me

<!-- dealing with parameters, like posts/42142 -->

src/pages/posts/[id].astro -> mysite.com/posts/:id
```

## Cool, but why?

As for my self, I didn't have any problem using an external file to map my site's routes to specific pages, I didn't think it worth the headache to add such a feature, and I didn't know why a lot of frameworks put it in the front page of their docs as an **important** feature.

But I've changed my mind about it, when I used it in Astro, because it makes you think about the big picture. File-based routing make things compact, so that you can always think about how your rendering relates to your route, you can see your data fetching, your route's guards, you can also see how individual components renders.

It's always in front of you, you can't miss it. Also, when you delete the file, you delete every thing related to this route, and this is very efficient.

And all of that happens without being a huge cognitive-load, an example from my project ["Adeeb"](https://github.com/M-Shrief/Adeeb_Astro_SSR "Github repo"), it's simple, clear and effective:

```astro

---
// src/pages/index.astro
// Layout
import Layout from "../layouts/Layout.astro";
// Components
import ShowCasePoems from "../components/ShowCasePoems.vue";
import ShowCasePoets from "../components/ShowCasePoets.vue";
import ShowCasePoetry from "../components/ShowCasePoetry.vue";
import SelectedPrints from "../components/SelectedPrints.vue";
// Stores
import { getPoems, fetchPoems } from "../stores/poems";
import { getPoets, fetchPoets } from "../stores/poets";
import { getPoetry, fetchPoetry } from "../stores/poetry";

await Promise.allSettled([
  await fetchPoems(),
  await fetchPoets(),
  await fetchPoetry(),
]);
---

<Layout title="أديب" description="Adeeb for printing Arabic literature, with various colors and fonts.">
  <main>
    <h1>أديب</h1>
    <p>لطباعة الادب العربي شعراً ونثراً</p>

    <div class="poet-poem-container">
      <ShowCasePoems poems={getPoems.value} grid={"grid"}>
        <h2 class="poems-title">القصائد</h2>
      </ShowCasePoems>

      <ShowCasePoets poets={getPoets.value}>
        <h2 class="poets-title">الشعراء</h2>
      </ShowCasePoets>
    </div>

    <ShowCasePoetry poetry={getPoetry.value} routeName="index" client:idle />

    <SelectedPrints client:only="vue" />
  </main>
</Layout>
```

I only wanted to say that this feature is very helpful, even if it's so simple. Astro's docs cover the topic greatly.

## Route guards

An important note that costed me sometime, you need to make sure that the page is server-rendered, so the guards actually works correctly. If you set your SSR adapter's output to _hybrid_, you need to opt-out of pre-rendering:

```astro

---
// src/pages/*.astro
// forcing server-rendering
export const prerender = false;
// Guards
const isAuthenticated = Astro.cookies.has('accessToken')
if (!isAuthenticated) return Astro.redirect("/partners/auth");
---
```

If you set the SSR adapter's output to _server_, then you're fine with only declaring your guards.

## Resources

- [Astro's Docs: Routing](https://docs.astro.build/en/core-concepts/routing/ "Astro's Documentation")
