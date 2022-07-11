<script lang="ts">
	import '../app.css';
</script>

<div class="w-full border-b-[1px]">
	<div class="max-w-screen-lg p-4 mx-auto w-full flex justify-between">
		<a href="/" class="flex-1">
			<h class="text-lg font-bold ">AnonShare</h>
		</a>
		<ul class="flex justify-between flex-1">
			<li><a href="/">Feed</a></li>
			<li><a href="/liked">Liked</a></li>
			<li><a href="/terms">Terms</a></li>
		</ul>

		<ul class="flex flex-1 justify-end gap-6">
			<a
				href=""
				class="w-1/3 flex justify-center place-items-center bg-opacity-80 py-1 px-6 text-teal-900 border-[1px] outline-none border-solid border-teal-900 rounded-sm"
				>Login</a
			><a
				href=""
				class="w-1/3 flex justify-center place-items-center bg-teal-600 bg-opacity-80 py-1 px-6 text-teal-900 border-[1px] outline-none border-solid border-teal-900 rounded-sm"
				>Register</a
			>
		</ul>
	</div>
</div>
<div class="max-w-2xl w-full mx-auto min-h-screen border-r-[1px] border-l-[1px]">
	<slot />
</div>
