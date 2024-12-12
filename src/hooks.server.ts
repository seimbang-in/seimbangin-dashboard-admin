import type { Handle } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '$env/static/private';

const handleAuth: Handle = async ({ event, resolve }) => {
	const cookies = event.cookies.get('jwt');

	if (cookies) {
		const user = jwt.verify(cookies, JWT_SECRET);

		if (user) {
			event.locals.user = user;
		}
	}
	return resolve(event);
};

export const handle: Handle = handleAuth;
