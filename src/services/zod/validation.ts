import * as z from 'zod';

export * as z from 'zod';

export function validate<Data extends object, Schema extends z.Schema> (data: Data, schema: Schema ) {
  const validationResult = schema.safeParse(data);
  const { success } = validationResult; 
  const errors = success ? {} : validationResult.error.flatten().fieldErrors;
  const _data = success ? data as z.infer<typeof schema> : data;
  return { success, errors, data: data as z.infer<typeof schema>};
}