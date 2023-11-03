---
title: 'Migrate from Vuejs SPA to SSR with Astro - State Management'
description: "We'll discuss how to manage your state in as SSR that uses Astro and Vuejs, either by using Pinia or just using Composition API."
pubDate: '03 Nov 2023'
---

Every framework have its way to address State Management, and not one but many libraries for that purpose. Unlike the most, Astro needs to be compatible so that it can be a platform that different users can use their favorite framework and state management library. 

When using Astro and Vuejs, there are three options:

## Nano Stores

Astro docs recommends using [Nano stores](https://github.com/nanostores/nanostores 'Nano stores github repo') because they're very lightweight and shipping the minimum JS you’ll need with zero dependencies. And it's framework-agnostic, so you can use it with multiple frameworks.

```ts

// src/stores/chosenVerses.ts
import {atom, action, computed} from 'nanostores';
// Composables
import {useAxiosError} from '../composables/errors'
// Utils
import {baseHttp} from '../utils/axios';
// Types
import type {ChosenVerse} from './__types__';
import {AxiosError} from 'axios';

export const $randomChosenVerses = atom<ChosenVerse[]>([]);

// you pass the reactive primative, then you use it
export const getRandomChosenVerses = computed($randomChosenVerses, randomChosenVerses => {
  // This callback will be called on every `chosenVerses` changes
  return randomChosenVerses
})

// you pass the reactive primative, then you pass it as a first argument in the callback function, then every other parameter, it the one you call the action with, like fetchRandomChosenVerses(4).
export const fetchRandomChosenVerses = action($randomChosenVerses, 'fetchRandomChosenVerses',
async(randomChosenVerses, num: number) => {
    try {
      const req = await baseHttp.get(`/chosenverses/random?num=${num}`);
      randomChosenVerses.set(req.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        useAxiosError(error);
        return;
      }
      alert(error);
    }
})
```

It's very good library, I'm glad it exists, I used it at first in my project "Adeeb أديب" and I'd no problems. You can try it out, it'll be helpful as a fullback in the very least, and Astro have a very good [documentation](https://docs.astro.build/en/core-concepts/sharing-state/#why-nano-stores "Share State Between Islands") about it.

## Pinia

Pinia is the standard library for State Management in Vuejs's ecosystem, especially version 3. It's a lightweight library above the Composition API.

It's main benefits:
- DevTools support
  -  A timeline to track actions, mutations
  -  Stores appear in components where they are used
  -  Time travel and easier debugging
- Ability to add Plugins to persist data, add a logger, and even Pinia ORM.

Its syntax is like a function that encapsulate your day-to-day Vuejs script, this is a Pinia setup store:

```ts

// src/stores/prints.ts
import { defineStore } from 'pinia'
import {ref, computed} from '@vue/reactivity';
// Types
import type { Print, ChosenVerse, Prose } from './__types__';
// Composables
import {useSessionStorage} from '@vueuse/core';

export const usePrintsStore = defineStore('prints', () => {
  // To perserve the state on reload, use useSessionStorage()
  const prints =  ref(useSessionStorage('prints', [] as Print[]));

  const getPrints =  computed<Print[]>(() => {
    return prints.value;
  });

  function addPrint(print: Print) {
    const printsIds = prints.value.map((printItem) => printItem.id);
    if (!printsIds.includes(print.id)) {
      prints.value.push(print);
    }
  };

  function removePrint(print: Print) {
    let printIndex = prints.value
      .map((verse) => verse.id)
      .indexOf(print.id);
    prints.value.splice(printIndex, 1);
  };

  return {  add: addPrint, remove: removePrint };
})
```

Unlike using Pinia in Vuejs, In Astro, if you used it in Vuejs' [appEntrypoint](https://docs.astro.build/en/guides/integrations-guide/vue/#appentrypoint 'Astro docs') it'll initialize a new store with every component! 

You'll not be able to maintain a shared store, so you'll need to create a Pinia store in a separate file:

```ts

// a file like ./src/store.ts
import { createPinia } from 'pinia'
export const appStore = createPinia();
```

Then pass the Pinia store to the store composable  to use the same state:
```vue

<script setup>
import { appStore } from '../store.ts';
const appStore = useAppStore(appStore);
</script>
```

## Vuejs Reactivity API

My Choice is just using Vuejs Reactivity API, I've even recommended it before in [Astro's docs discussions](https://github.com/withastro/docs/discussions/4215).

It's the same as the Pinia store example without Pinia encapsulation:
```ts

// src/stores/prints.ts 
import {ref, computed} from '@vue/reactivity';
// Types
import type { Print, ChosenVerse, Prose } from './__types__';
// Composables
import {useSessionStorage} from '@vueuse/core';

// Use VueUse's useSessionStorage() or useLocalStorage() to persist the store data.
export const prints =  ref(useSessionStorage('prints', [] as Print[]));

export const getPrints =  computed<Print[]>(() => {
  return prints.value;
});

function addPrint(print: Print) {
  const printsIds = prints.value.map((printItem) => printItem.id);
  if (!printsIds.includes(print.id)) {
    prints.value.push(print);
  }
};

function removePrint(print: Print) {
  let printIndex = prints.value
    .map((verse) => verse.id)
    .indexOf(print.id);
  prints.value.splice(printIndex, 1);
};

// We can export the Store's functions directly, but I'm exporting them in a single object, so that I can use Vitest spyOn()
export const actions = {
  add: addPrint,
  remove: removePrint,
};
```

It has a multiple benefits:

### Maintained by Vuejs core team

Maintained by a big player in JavaScript community, with great focus in performance. And They're providing a top-notch API with first-class TypeScript support.

### Saving a lot of Boilerplate

More importantly, saving a lot of boilerplate, unlike Pinia, I'm just using the state directly, managing the store as a normal TypeScript module.

I'm using it directly in my Astro's pages frontmatter like this:
```astro

---
// src/pages/index.astro
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

<!-- ........ -->
 <div class="poet-poem-container">
    <ShowCasePoems poems={getPoems.value} grid={"grid"}>
      <h2 class="poems-title">القصائد</h2>
    </ShowCasePoems>
    <ShowCasePoets poets={getPoets.value}>
      <h2 class="poets-title">الشعراء</h2>
    </ShowCasePoets>
  </div>
  <ShowCasePoetry poetry={getPoetry.value} routeName="index" client:idle />
<!-- ........ -->
```

In Vuejs components:
```vue

<!-- src/components/ShowCasePoetry.vue -->
<template>
<!-- ..... -->
  <button
    @click="printsActions.add({ id: singlePiece.id, verses: singlePiece.verses })"
    class="print-button">
    أضف للطباعة
  </button>
<!-- ..... -->
</template>

<script lang="ts" setup>
// Stores
import {actions as printsActions} from '../stores/prints'
// Types
import type { Poetry } from '../stores/__types__';
defineProps<{
    poetry: Poetry[];
    routeName?: string
}>()
</script>
```

And as a man who depends a lot on Component testing, it saves me the cognitive load when using Pinia because it requires using *createTestingPinia()* so that I can spy and mock the store's getters and setters. 

Don't get me wrong, Pinia provides very good methods to help you, but for my use cases, I didn't need it, so I'm just keeping it simple and stupid. I'm just using Vitest spy and mock functions and accessing the store directly:
```ts

// src/components/ShowCasePoetry.spec.ts
import { describe, expect, it, vi } from 'vitest'
// Componetns
import ShowCasePoetry from './ShowCasePoetry.vue';
// Stores
import {actions as printsActions} from '../stores/prints';
// Types
import  type { Poetry } from '../stores/__types__'

describe.concurrent('<ShowCasePoetry />', () => {
  it('Renders a ChosenVerse on Poet page with two Verse', async () => {
    const wrapper = mount(ShowCasePoetry, {
      props: {
        poetry: [
          //
        ]
      }
    })  
    const printSpy = vi.spyOn(printsActions, 'add');
    await wrapper.find('.print-button').trigger('click');

    expect(printSpy).toHaveBeenCalled()
    expect(printSpy).toHaveBeenCalledWith({
      //
    })
  })
})
```

And Unit testing is even easier, without Pinia boilerplate, you can just use in-source testing in the same file:

```ts

// src/stores/prints.ts
// ............
if (import.meta.vitest) {
  const { describe, it, expect, afterEach } = import.meta.vitest
  describe.concurrent('Testing Prints actions', () => {
    afterEach(() => { prints.value = []})
    it('addPrint(): addPrint correctly, and it do not duplicate existing prints', async ({ expect }) => {
      const print: Print = {id: '12', qoute: 'aaa'};
      addPrint(print);
      expect(prints.value).toStrictEqual([print]); 
      addPrint(print);
      expect(prints.value).toStrictEqual([print]);
    })
    it('removePrint(): it remove specified prints after mapping prints array to know print.id', async({expect}) => {
      const preparedPrints = [
        {id: '1', poet: {id: "1"}, tags: 'الشجاعة', reviewed: true, qoute: 'aaa'},
        {id: '2', poet: {id: "1"}, tags: 'الشجاعة', reviewed: true, qoute: 'bbb'},
        {id: '3', poet: {id: "1"}, tags: 'الشجاعة', reviewed: true, qoute: 'ccc'},
      ] as Prose[];
      prepPrints(preparedPrints);
      removePrint(preparedPrints[1]);
      expect(prints.value).toMatchInlineSnapshot([
        {id: '1', poet: {id: "1"}, tags: 'الشجاعة', reviewed: true, qoute: 'aaa'},
        {id: '3', poet: {id: "1"}, tags: 'الشجاعة', reviewed: true, qoute: 'ccc'},
      ])
    })
  })
}
```

## Summary

In Astro there are many ways to manage your state, we discussed the default recommendation Nano Stores and how it's lightweight and framework-agnostic. We discussed how to use Pinia in Astro, and configuring it to ensure it's only one store.

Then we finished with my recommendation to use Vuejs Reactivity API because:
- Maintained by Vuejs core team
- It's simple and stupid
- Very easy to spy and mock in Unit testing and Component testing.

## Resources

- [Nano Store](https://github.com/nanostores/nanostores "Nano Store's github repo").
- [Pinia docs](https://pinia.vuejs.org/ "Pinia docs").
- [Vuejs's Reactivity API](https://vuejs.org/api/reactivity-core.html), and make sure to read [Vuejs's Reactivity Fundamentals](https://vuejs.org/guide/essentials/reactivity-fundamentals.html).