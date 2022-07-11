<script lang="ts">
	export let title: string;
    export let checked: boolean = false;
</script>

<div class="w-full p-2 my-1 border-2 rounded-md border-solid border-gray-100 transition-all duration-200 ease-in">
	<label class="flex justify-between text-gray-700">
		{title}
		<input bind:checked
			type="checkbox"
		/>
	</label>

	<slot />
</div>
