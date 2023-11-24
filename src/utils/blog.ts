import { getCollection } from "astro:content";

const posts = async () => {
    return await getCollection("blog", ({data}) => {
        return import.meta.env.PROD ? data.isDraft !== true : true;
    })
}

export const getClassificationsList = async ( name: string) => {
    const singlePages = await posts();
    const taxonomyPages = singlePages.map((page: any) => page.data[name]);
    let taxonomies: string[] = [];
    for (let i = 0; i < taxonomyPages.length; i++) {
      const categoryArray = taxonomyPages[i];
      for (let j = 0; j < categoryArray.length; j++) {
        taxonomies.push(categoryArray[j]);
      }
    }
    const taxonomy = [...new Set(taxonomies)];
    return taxonomy;
  };
  
  export const getAllClassifications = async (name: string) => {
    const singlePages = await posts();
    const taxonomyPages = singlePages.map((page: any) => page.data[name]);
    let taxonomies: string[] = [];
    for (let i = 0; i < taxonomyPages.length; i++) {
      const categoryArray = taxonomyPages[i];
      for (let j = 0; j < categoryArray.length; j++) {
        taxonomies.push(categoryArray[j]);
      }
    }
    return taxonomies;
  };