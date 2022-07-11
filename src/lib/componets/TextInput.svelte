<script lang="ts">
	export let title: string;
	export let value: string | number;
	export let type: string;
</script>

<div class="w-full p-2 my-1 border-2 rounded-md border-solid border-gray-100">
	<label class="flex justify-between flex-col gap-2 text-gray-700">
		{title}
		<input
			{...{ type }}
			bind:value
			class="w-full outline-none border-2 p-1 border-solid border-gray-100"
		/>
	</label>

	<slot />
</div>
