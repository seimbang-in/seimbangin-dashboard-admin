<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	export let form: ActionData;
	import { Button, Card, Input, Label } from 'flowbite-svelte';
</script>

<div class="flex h-screen w-full items-center justify-center">
	<Card>
		<h1 class="text-lg font-bold">Login to Seimbang.in</h1>
		<br />
		<form method="POST" use:enhance>
			<div>
				<Label for="identifier" class="mb-2">Username/Email</Label>
				<Input type="text" id="identifier" name="identifier" placeholder="Momo Ayase" required />
			</div>
			<div>
				<Label for="password" class="mb-2">Password</Label>
				<Input type="password" id="password" name="password" placeholder="********" required />
			</div>
			<br />
			<Button type="submit">Login</Button>
		</form>
		<br />
		<p style="color: red">{form?.message ?? ''}</p>
	</Card>
</div>
