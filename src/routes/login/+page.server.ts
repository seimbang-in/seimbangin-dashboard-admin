import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
		return redirect(302, '/');
	}
	return {};
};

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const identifier = formData.get('identifier');
		const password = formData.get('password');

		if (!identifier) {
			return fail(400, { message: 'Invalid username/email' });
		}
		if (!password) {
			return fail(400, { message: 'Invalid password' });
		}

		const response = await fetch(
			'https://seimbangin-api-175982326551.asia-southeast2.run.app/auth/login',
			{
				method: 'POST',
				body: JSON.stringify({ identifier, password }),
				headers: { 'Content-Type': 'application/json' }
			}
		);

		if (!response.ok) {
			return fail(401, { message: 'Invalid credentials' });
		}

		const { data } = await response.json();

		const token = data.token;

		event.cookies.set('jwt', token, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: true,
			maxAge: data.expiresIn
		});

		console.log('data', data);

		throw redirect(302, '/admin/dashboard');
	}
};
