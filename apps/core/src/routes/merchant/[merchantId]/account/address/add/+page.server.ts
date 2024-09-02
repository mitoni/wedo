import { fail, message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';

const addressSchema = z.object({
	address: z.string().min(1),
	instructions: z.string().optional(),
	lat: z.number(),
	lng: z.number(),
	place_id: z.string()
});

export async function load() {
	const form = await superValidate(zod(addressSchema));
	return { form };
}

export const actions = {
	async default({ request }: { request: Request }) {
		console.log(request);
		const form = await superValidate(request, zod(addressSchema));
		console.log(JSON.stringify(form, null, 2));

		if (!form.valid) {
			return fail(400, { form });
		}

		return message(form, 'Address added');
	}
};
