<script lang="ts">
	import type { Post } from '../structure';

	export let post: Post;
</script>

<!-- {post.views} -->
<div class=" border-t-[1px] border-b-[1px] p-8">
	<p class="py-4">
		{post.post}
	</p>

	<div class="flex gap-4 border-t-2 py-4 justify-between">
		<div class="flex gap-6">
			<button class="">
				{post.views} views
			</button>

			<button>like</button>
		</div>

		<span>
			{new Date(post.created_at).toLocaleString()}
		</span>
	</div>
</div>
