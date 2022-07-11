<script lang="ts">
	import type { Alert } from '$lib/structure';

	import { setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	const alerts: Writable<Alert[]> = writable([]);
	const popUp: Writable<{ msg: string } | null> = writable(null);

	setContext('alerts', alerts);
	setContext('popUp', popUp);

	const deleteAlert = (idx: number) => {
		$alerts = $alerts.reduce((prev: Alert[], cur: Alert, index: number) => {
			return idx === index ? prev : [...prev, cur];
		}, []);
	};
</script>

{#if $popUp}
	<div
		on:click|self={() => {
			$popUp = null;
		}}
		class="fixed inset-0 z-20 backdrop:blur-3xl bg-opacity-80 bg-gray-900 flex justify-center place-items-center align-middle "
	>
		<div class="max-w-sm w-full bg-white shadow-md rounded-md p-2 aspect-square">
			{$popUp.msg}
		</div>
	</div>
{/if}

<div class="fixed p-10 max-w-md w-full right-0">
	<div class="w-full relative flex flex-col gap-2">
		{#each $alerts as alt, idx}
			<div
				class="p-2 rounded-md border-2 flex justify-between align-middle place-items-center border-solid bg-opacity-90 text-red-500 bg-red-900 border-red-500"
			>
				{alt.msg}
				<button
					class="border-none outline-none text-red-900 font-bold bg-red-500 flex justify-center align-middle place-items-center rounded-full h-5 aspect-square text-center text-md cursor-pointer"
					on:click={() => deleteAlert(idx)}>ˣ</button
				>
			</div>
		{/each}
	</div>
</div>

<slot />
