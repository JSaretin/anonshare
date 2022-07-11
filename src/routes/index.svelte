<script lang="ts">
	import CreatePost from '$lib/componets/CreatePost.svelte';
	import ShortPost from '$lib/componets/Post.svelte';
	import type { Alert, ReturnedPost } from '$lib/structure';
	import { getContext, setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	export let returnedPost: (ReturnedPost)[];

	const posts: Writable<(ReturnedPost)[]> = writable(returnedPost);

	const alerts: Writable<Alert[]> = getContext('alerts');

	setContext('posts', posts);
	setContext('alerts', alerts);
</script>

<CreatePost />

<div class="w-full flex flex-col gap-4 p-6">
	<h2 class="font-medium text-gray-800">Public Posts</h2>
	<div class="flex flex-col gap-4">
		{#each $posts as anonpost (anonpost.id)}
			<ShortPost post={anonpost} />
		{/each}
	</div>
</div>
