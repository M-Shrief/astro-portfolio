---
# Complete: True
title: 'Migrate from Vuejs SPA to SSR with Astro - Strategy'
description: "Recommending a form of steps to accomplish a complete migration from Vuejs SPA to SSR with Astro."
pubDate: '03 Nov 2023'
---

This is an opinionated recommendation from my experience in the form of steps to accomplish a complete migration from Vuejs SPA to SSR with Astro in a simple and pragmatic way to get a SEO and performance boost.

## Start with your home page
Our main priority is to improve our site's SEO and performance. Normally our first target is our home page, and we'll try to get the best of Astro practices to prove its benefits for our team and directors.

You'll use Astro file-based routing to create your main page (e.g., _src/pages/index.astro_).
We'll copy all of its components into _src/components_ file, and we will modify them as needed for our [state management](/blog/migrate-vuejs-spa-to-ssr-with-astro/state-management/).

We'll do our data fetching in Astro's frontmatter. Now, we'll import our components to our page, and customize which component will be static and which will be reactive for our needs by using Astro's [client-directives](https://docs.astro.build/en/reference/directives-reference/#client-directives 'Astro docs').

This is an example from my project "Adeeb أديب", you can look at it to get the picture:

```astro
---
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

<style lang="scss">
</style>

```
In this way, we have improved our main page’s SEO and performance. But we don’t want to hinder ourselves from using this boost by waiting to make a full migration for our site, so we’ll be more pragmatic with other pages.
Pragmatic Migration for Other Pages

A very fast way to migrate other pages is to make a pragmatic use of Astro’s client-directives.

We’ll copy our Vuejs SPA pages to a new folder named something like “src/clientOnlyPages”. And we’ll copy their inner components also to src/components then we’ll align them with our state management.

Then you’ll import them into their respective Astro page for routing, and you’ll use client-directives to render them as they are for now. We’ll just use them as our SPA website, except that we use Astro for routing.

It will look like this:
```astro
---
// Layout
import Layout from "../layouts/Layout.astro";
// Client Page
import Poem from "../clientPages/Poem.vue";
// To opt-out from pre-rendering, because we're using hybrid output in our SSR adapter
export const prerender = false; 

const { id } = Astro.params;
if (!id) return Astro.redirect("/");
await fetchPoem(id);

const {intro, poet} = getPoem.value;
---

<Layout title={intro} description={intro + ' - ' + poet}>
  <main>
    <Poem client:only="vue" />
  </main>
</Layout>

<style lang="scss">
</style>

```

## Completing Our Migration
Then we'll migrate every page, one at a time, extracting their content, and modify it to use Astro's features and get the best performance we can.

A modified page might be something like this:

```astro
---
// Layout
import Layout from "../../layouts/Layout.astro";
// Components
import ShowCasePoem from "../../components/ShowCasePoem.vue";
import ShowCasePoems from "../../components/ShowCasePoems.vue";
import ShowCasePoet from "../../components/ShowCasePoet.vue";
import SelectedPrints from "../../components/SelectedPrints.vue";
import HttpPopUp from "../../components/notifications/HttpPopUp.vue";
// Stores
import { getPoem, getOtherPoems, fetchPoem } from "../../stores/poems";
// To opt-out from pre-rendering, because we're using hybrid output in our SSR adapter
export const prerender = false;

const { id } = Astro.params;
if (!id) return Astro.redirect("/");
await fetchPoem(id);

const {intro, poet} = getPoem.value;
---

<Layout title={intro} description={intro + ' - ' + poet}>
  <HttpPopUp slot="http-popup"/>
  <main>
    <div class="container">
      <section id="related-data">
        <a href=`/poet/${getPoem.value.poet.id}` class="link">
          <ShowCasePoet details={getPoem.value.poet} client:idle />
        </a>

        <ShowCasePoems poems={getOtherPoems.value}>
          <h2>قصائد اخري</h2>
        </ShowCasePoems>
      </section>
      <ShowCasePoem verses={getPoem.value.verses} client:idle />
    </div>
    <SelectedPrints client:only="vue" />
  </main>
</Layout>

<style lang="scss">
</style>
```

You may decide that some pages don't need to be migrated because you don't need them to have great SEO — like your cart for instance — and you've got the complete freedom to do them or not. And that's the great thing about Astro, it gives you control.

## Summary
- You'll focus on migrating  your Home page and try to get the best of Astro practices.
    - You'll use Astro file-based routing to create your main page (/pages/index.astro).
    - You'll need to align your State Management with Astro.
    - Customizing which component will be static and which is reactive for your needs.
- Then you'll copy your Vuejs SPA pages to a new folder named something like "clientOnlyPages" 
- We will copy the rest of your pages' components and modify them as needed (state management, ...and on)
- Then you'll import them in their respective Astro's routes (e.g., /pages/*) file as they are, and you'll use **client-directives** to render them as they are for now.
- Then we'll take a page at a time to migrate it, extract its content, and modify it so that we can use Astro's true potential.

That's a smooth way to migrate and achieve your business needs while proving Astro's benefits for your team and directors. And it'll not give your team a bad time, and it'll open a ton of choices to extend your website's capabilities.

## Resources:

- [Astro's client-directives](https://docs.astro.build/en/reference/directives-reference/#client-directives "Astro docs")
- [Migrate from Vuejs SPA to SSR with Astro - State Management](http://localhost:4321/blog/migrate-vuejs-spa-to-ssr-with-astro/state-management/)