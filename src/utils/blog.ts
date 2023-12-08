import { getCollection } from "astro:content";

const posts = async () => {
  return await getCollection("blog", ({ data }) => {
    return import.meta.env.PROD ? data.isDraft !== true : true;
  });
};

export const getSet = async (name: string) => {
  const singlePages = await posts();
  const taxonomyPages = singlePages.map((page: any) => page.data[name]);
  let taxonomies = new Set<string>();
  for (let i = 0; i < taxonomyPages.length; i++) {
    const categoryArray = taxonomyPages[i];
    for (let j = 0; j < categoryArray.length; j++) {
      taxonomies.add(categoryArray[j]);
    }
  }
  const taxonomy = [...taxonomies];
  return taxonomy;
};