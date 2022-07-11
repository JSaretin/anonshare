<script lang="ts">
	import { browser } from '$app/env';

	import type { Alert, Post, ReturnedPost } from '$lib/structure';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	export let post: { id: string } & Post;
	const alerts: Writable<Alert[]> = getContext('alerts');
	let liked: boolean;
	let fade: boolean;

	if (browser) {
		const local = JSON.parse(localStorage.getItem('liked') || '{}');
		liked = local[post.id] || false;
	}

	const toggleLike = async () => {
		console.log('liking')
		liked = !liked;
		if (!liked && post.likes < 1) return;
		else post.likes--;
		const localLiked = JSON.parse(localStorage.getItem('liked') || '{}');
		localLiked[post.id] = liked;
		if (liked) post.likes++;
		const req = await fetch('/posts/' + post.id + '/like', {
			method: 'POST',
			headers: {
				accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ liked })
		});
		if (req.status === 404) {
			fade = true;
			return;
		}

		if (req.status > 499) {
			$alerts.unshift({
				msg: 'unkown error',
				type: 'warning'
			});
			$alerts = $alerts;
		}
		if (!req.ok) {
			liked = !liked;
			return;
		}
		const res: { post: ReturnedPost } = await req.json();
		post = res.post;
		localStorage.setItem('liked', JSON.stringify(localLiked));
		console.log('liked')
	};

	let deleted: boolean = true;

	if (browser) {
		deleted = JSON.parse(localStorage.getItem('deleted') || '{}')[post.id] || false;
	}

	const posts: Writable<ReturnedPost[]> = getContext('alerts');

	const deletePost = async () => {
		deleted = true;
		const deletedPosts: { [key: string]: boolean } = JSON.parse(
			localStorage.getItem('deleted') || '{}'
		);
		deletedPosts[post.id] = true;
		localStorage.setItem('deleted', JSON.stringify(deletedPosts));
		$posts = $posts.reduce((prev: ReturnedPost[], cur: ReturnedPost) => {
			return cur.id === post.id ? prev : [...prev, cur];
		}, []);
	};
</script>

{#if !deleted}
	<div
		class={'relative w-full rounded-md overflow-hidden border-2 border-solid border-gray-100 ' +
			(fade ? 'opacity-40' : '')}
	>
		<button
			class="absolute top-1 right-1 rounded-full w-8 aspect-square bg-gray-100 bg-opacity-40 hover:bg-red-400 hover:bg-opacity-100 transition-colors ease-in duration-200 text-center flex justify-center align-middle place-items-center"
			on:click={deletePost}>ˣ</button
		>
		<a href={'/posts/' + post.id}>
			<p class="p-6">{@html post.post}</p>
		</a>
		{#if post.can_react}
			<div class="flex justify-end border-t-[1px] p-4 place-items-center align-middle">
				<div class="flex-1 flex gap-4">
					<div class="flex gap-1 align-middle place-items-center">
						<p class="text-md text-lg text-gray-400">{post.views}</p>
						<svg
							class="w-8 aspect-square"
							fill="none"
							stroke="#cccccc"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="1"
								d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
							/><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="1"
								d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
							/></svg
						>
					</div>

					<div class="flex gap-2 align-middle place-items-center">
						<p class="text-gray-400 text-lg">{post.likes}</p>
						<svg
							class="w-8 aspect-square cursor-pointer"
							fill={liked ? 'red' : '#fff'}
							on:click={toggleLike}
							stroke="#cccccc"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="1"
								d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
							/></svg
						>
					</div>
				</div>

				<!-- <div class="flex-1 flex gap-4 justify-end ">
				<button
					on:click={deletePost}
					class="w-[90px] px-3 py-1 rounded-sm bg-red-400 bg-opacity-60 text-red-800 border-[1px] border-red-800 transition-colors ease-in duration-200 hover:bg-opacity-100 hover:bg-red-800 hover:text-red-400"
					>delete</button
					>
					
					<button
					on:click={editPost}
					class="w-[90px] px-3 py-1 rounded-sm bg-teal-400 bg-opacity-60 text-teal-800 border-[1px] border-teal-800 transition-colors ease-in duration-200 hover:bg-opacity-100 hover:bg-teal-800 hover:text-teal-400"
					>edit</button
					>
				</div> -->
			</div>
		{/if}
	</div>
{/if}
