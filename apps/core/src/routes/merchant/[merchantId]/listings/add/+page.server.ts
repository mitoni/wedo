import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';

const listingSchema = z.object({
	category: z.string().min(1),
	description: z.string().min(1),
	quantity: z.number().min(1),
	unit: z.string().min(1),
	location_id: z.string().min(1)
});

export async function load() {
	const form = await superValidate(zod(listingSchema));

	return { form };
}

export const actions = {
	async default({ request }: { request: Request }) {
		const form = await superValidate(request, zod(listingSchema));

		if (!form.valid) {
			return fail(400, { form });
		}
	}
};
