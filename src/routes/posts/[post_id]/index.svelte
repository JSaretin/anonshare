<script lang="ts">
	import { browser } from '$app/env';
	import { page } from '$app/stores';
	import RenderPost from '$lib/componets/RenderPost.svelte';
	import Render404Error from '$lib/Page/Render404Error.svelte';
	import type { Post } from '$lib/structure';
	import { writable, type Writable } from 'svelte/store';

	export let post: Post | undefined;
	export let status: number | undefined;
	let loaded = false;

	const postStore: Writable<Post | undefined> = writable(post);

	const parsePost = () => {
		if (post && post.save_to_client) {
			localStorage.setItem($page.params.post_id, JSON.stringify($postStore));
			return;
		}

		if (status !== 404) return;
		post = JSON.parse(localStorage.getItem($page.params.post_id) || '{}');
		if (!post || Object.keys(post || {}).length === 0) return;

		post.views++;

		if (
			post.local.should_delete &&
			post.local.after_option === 'views' &&
			post.views < post.local.delete_after
		) {
			localStorage.setItem($page.params.post_id, JSON.stringify(post));
			return;
		}
		if (
			post.local.should_delete &&
			post.local.after_option !== 'views' &&
			new Date().getTime() > post.local.delete_after
		)
			localStorage.removeItem($page.params.post_id);
		$postStore = post;
	};

	if (browser) {
		parsePost();
		loaded = true;
	}
</script>

{#if !loaded}
	loading
{:else if $postStore}
	<RenderPost post={$postStore} />
{:else}
	<Render404Error message="post not found" />
{/if}
