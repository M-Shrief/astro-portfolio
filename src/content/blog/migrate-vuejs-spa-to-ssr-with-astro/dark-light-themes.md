---
title: 'Migrate from Vuejs SPA to SSR with Astro - Dark/Light Themes'
description: "We'll discus how to add Dark/Light Themes to Astro projects, using a native approach."
isDraft: true
pubDate: '01 Nov 2023'
---

As for myself, I use the suggested way to change color themes from **web.dev**, it's very simple and efficient, and it uses HTML, CSS and Native JavaScript and that means I can use it in any framework.

It's efficient, simple and stupid, and that's it.

## HTML and SVGs
I take the suggested SVGs for [moon and sun](https://web.dev/patterns/theming/theme-switch?hl=en "web.dev - Theme Switch") and paste them simply:

```astro
<!-- ThemeSwitch.astro -->
<button class="theme-toggle" id="theme-toggle" title="Toggles light and dark themes"
  aria-label="auto" aria-live="polite">
  <svg class="sun-and-moon" aria-hidden="true" width="24" height="24"
    viewBox="0 0 24 24">
    <mask class="moon" id="moon-mask">
      <rect x="0" y="0" width="100%" height="100%" fill="white" />
      <circle cx="24" cy="10" r="6" fill="black" />
    </mask>
    <circle class="sun" cx="12" cy="12" r="6" mask="url(#moon-mask)"
      fill="currentColor" />
    <g class="sun-beams" stroke="currentColor">
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </g>
  </svg>
</button>
```

## JavaScript

Then I take the [native JavaScript](https://web.dev/patterns/theming/theme-switch?hl=en#js "web.dev - Theme Switch javascript") and put it in a normal script tag, because we'll use the localStorage.

If you're using ViewTransitions, you should notice that it work after the first page load, but when you start navigating other pages, your theme won't respond!
You need to add another listen for ViewTransitions event named: _"astro:page-load"_, so you'll add:

```astro
<!-- ThemeSwitch.astro -->
<script>
  // ReflectPrefernce, and addEventListener on ViewTransition
  document.addEventListener('astro:page-load', () => {
    // set on load so screen readers can see latest value on the button
    reflectPreference();
    // now this script can find and listen for clicks on the control
    document.querySelector('#theme-toggle')?.addEventListener('click', onClick)
  });
</script>
```

## CSS and Styling

Now, put the recommended [CSS](https://web.dev/patterns/theming/theme-switch?hl=en#css "web.dev - Theme Switch CSS") in the style tag, and make sure you add the *is:inline* so the icon changes:

```astro
<!-- ThemeSwitch.astro -->
<style is:inline>


</style>
```
Note: you don't need to use *open-props.easings*, if you don't want to.

### With Tailwind

If you're using tailwind, make sure to change it's darkMode config:

```js
// tailwind.config.cjs
/** @type {import('tailwindcss').Config} */
module.exports = {
  // ...............
  darkMode: ['class', '[color-scheme="dark"]'],
  // ..........
}
```

## Resources

- [Patterns and Theming from web.dev](https://web.dev/patterns/theming/ "web.dev")
- [Tailwind Config](https://tailwindcss.com/docs/dark-mode "tailwind.com")