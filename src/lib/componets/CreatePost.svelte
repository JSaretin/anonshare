<script lang="ts">
	import type { Alert, NewPost, Post, ReturnedPost } from '$lib/structure';
	import { getContext } from 'svelte';

	import { writable, type Writable } from 'svelte/store';

	import CheckInput from './CheckInput.svelte';
	import SelectInput from './SelectInput.svelte';
	import TextInput from './TextInput.svelte';

	const deleteOption = {
		views: 'views',
		days: 'days',
		minutes: 'minutes',
		hours: 'hours',
		weeks: 'weeks'
	};

	const defaltPost: NewPost = {
		post: '',
		password: '',
		can_react: true,
		is_private: false,
		is_protected: false,
		save_to_client: false,
		local: {
			should_delete: false,
			delete_after: 0,
			after_option: 'views'
		},
		server: {
			delete_after_open: false,
			delete_after: 0,
			after_option: 'views'
		}
	};

	const post: Writable<NewPost> = writable(defaltPost);

	let showAdvance: boolean;

	const alerts: Writable<Alert[]> = getContext('alert');
	const posts: Writable<({ id: string } & Post)[]> = getContext('posts');
	const popUp: Writable<{ msg: string } | null> = getContext('popUp');

	let form: HTMLFormElement;
	const createPost = async () => {
		if (!$post.post) {
			$alerts = [
				...$alerts,
				{
					msg: 'post is required',
					type: 'warning'
				}
			];
			return;
		}
		const req = await fetch('', {
			method: 'POST',
			headers: {
				accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify($post)
		});
		const res = await req.json();

		if (!req.ok) {
			alerts.update((alts) => {
				return [...alts, res.error];
			});
			return;
		}
		const newPost: ReturnedPost = res.post;

		if (newPost.is_private) {
			popUp.set({ msg: 'post created \n' + newPost.id });
			return;
		}
		$posts = [newPost, ...$posts];
		form.reset();
		$post.post = '';
		$post = defaltPost;
	};

	let configServer: boolean;
</script>

<form
	on:submit|preventDefault={createPost}
	bind:this={form}
	class="p-6 w-full flex flex-col gap-2 border-b-[1px] mb-6"
>
	<div
		class="relative w-full p-2 border-2 min-h-[9rem] isolate border-gray-200 rounded-md overflow-hidden text-gray-400"
	>
		{#if !$post.post}
			what's on your mind?
		{/if}
		<div
			contenteditable="true"
			bind:innerHTML={$post.post}
			cols="30"
			rows="4"
			class="text-gray-800 absolute inset-0 border-solid  p-2 outline-none resize-y"
		/>
	</div>
	<CheckInput title="Show advance settings" bind:checked={showAdvance}>
		{#if showAdvance}
			<CheckInput title="enable reaction" bind:checked={$post.can_react} />
			<CheckInput title="is private" bind:checked={$post.is_private}>
				{#if $post.is_private}
					<CheckInput title="enable password" bind:checked={$post.is_protected}>
						{#if $post.is_protected}
							<TextInput title="password" type="password" bind:value={$post.password} />
						{/if}
					</CheckInput>
				{/if}
			</CheckInput>

			<CheckInput title="save to client device" bind:checked={$post.save_to_client}>
				{#if $post.save_to_client}
					<CheckInput title="set delete" bind:checked={$post.local.should_delete}>
						{#if $post.local.should_delete}
							<TextInput
								title="delete duration"
								type="number"
								bind:value={$post.local.delete_after}
							>
								<SelectInput
									bind:value={$post.local.after_option}
									title="delete after"
									options={deleteOption}
								/>
							</TextInput>
						{/if}
					</CheckInput>
				{/if}
			</CheckInput>

			<CheckInput title="configure server" bind:checked={configServer}>
				{#if configServer}
					{#if $post.is_private}
						<CheckInput title="disable liking" />
					{/if}
					<CheckInput title="set delete" bind:checked={$post.server.delete_after_open}>
						{#if $post.server.delete_after_open}
							<TextInput
								title="delete duration"
								type="number"
								bind:value={$post.server.delete_after}
							>
								<SelectInput
									bind:value={$post.server.after_option}
									title="delete after"
									options={deleteOption}
								/>
							</TextInput>
						{/if}
					</CheckInput>
				{/if}
			</CheckInput>
		{/if}
	</CheckInput>

	<div class="w-full flex justify-end">
		<button
			class="w-1/5 py-2 bg-teal-700 rounded-md transition-colors duration-200 ease-in hover:bg-teal-500"
			>Post</button
		>
	</div>
</form>
