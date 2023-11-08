---
title: 'Migrate from Vuejs SPA to SSR with Astro - Setup'
description: "Setting up our project's boilerplate and configuration"
pubDate: '02 Nov 2023'
---

## Initial Boilerplate

Create your first Astro project:

```bash
$ npm create astro@latest
```
You'll find Hueston (Astro's Cli) helping you out. Choose the recommended skeleton, choose whether you'll use TypeScript or not (choose strict if so), and install dependencies.


You'll have something like:

- **src**: for project source code (components, pages, styles, etc.)
- **public**: for non-code, unprocessed assets (fonts, icons, etc.)
- **package.json**
- **astro.config.mjs**: Astro configuration file.
- ...etc

## UI framework and SSR adapter

Now we'll install Vuejs with Astro's Cli:

```bash
$ npx astro add vue node
```
It'll add Vuejs integration, so we can use Vuejs and .vue files, the Nodejs integration is to serve the SSR website.

```js

// astro.config.mjs
export default defineConfig({
    // ................
    integrations: [
        vue(),
    ],
    output: "hybrid",
    adapter: node({
        mode: "standalone"
    })
    // ....................
});
```

We need to choose our output strategey and adapter mode:
- **output**: choose *hyprid* if the most of your website content is static, choose *server* if most of it is dynamic
- **adapter mode**: we'll choose *standalone* to ease our development, and it helps us to seperate our backend and frontend, so both can scale seperately, it's not a must still.

In the **src** file, we'll have three main files inside it:
- **components**: contains Astro & Vuejs components (common convention, not required).
- **layouts**: define the UI structure shared by one or more pages. (common convention, not required)
- **pages**: A special folder that defines your website pages and routes (required)

## Styling

Usually I use SCSS for styling, you only need to install:

```bash
$ npm install sass
```

Then declare the style language in your Astro component:

```astro

<style lang="scss">
</style>
```

If you're using Tailwind, check Astro's [integeration](https://docs.astro.build/en/guides/integrations-guide/tailwind/ "Astro docs"). All you need to start is:

```bash
$ npx astro add tailwind
```

## Resources

- [Astro's Docs](https://docs.astro.build/ 'Documentation')