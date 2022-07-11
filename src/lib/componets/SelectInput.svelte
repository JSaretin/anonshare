<script lang="ts">
	export let title: string;
	export let value: any;

	export let options: { [K: string]: string };
</script>

<div class="w-full p-2 my-1 border-2 rounded-md border-solid border-gray-100">
	<label class="flex justify-between flex-col gap-2 text-gray-700">
		{title}
        <select bind:value class='p-2 rounded-md'>
            {#each Object.keys(options) as option}
                <option selected={option == value}>{option}</option>
            {/each}
        </select>
		
	</label>

	<slot />
</div>
