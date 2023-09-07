// import { defineCollection, z } from 'astro:content';
import { defineCollection, reference, z } from "astro:content";

const blog = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z
			.string()
			.or(z.date())
			.transform((val) => new Date(val)),
		updatedDate: z
			.string()
			.optional()
			.transform((val) => (val ? new Date(val) : undefined)),
		heroImage: z.string().optional(),
		// Reference an array of related posts from the `blog` collection by `slug`
		relatedPosts: z.array(reference('blog')),
	}),
});

export const collections = { blog };