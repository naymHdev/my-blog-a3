import { z } from 'zod';

const blogValidationSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    content: z.string({
      required_error: 'Content is required',
    }),
    isPublished: z.boolean().default(true).optional(),
  }),
});

const updateBlogValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    isPublished: z.boolean().default(true).optional(),
  }),
});

export const BlogValidations = {
  blogValidationSchema,
  updateBlogValidationSchema,
};
