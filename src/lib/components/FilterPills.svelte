<script lang="ts">
	interface Filter {
		label: string;
		value: string;
	}

	interface Props {
		filters: Filter[];
		selected?: string;
		onselect?: (value: string) => void;
	}

	let { filters, selected = 'todos', onselect }: Props = $props();
</script>

<div class="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
	{#each filters as filter}
		<button
			class="pill {selected === filter.value ? 'pill-active' : ''}"
			onclick={() => onselect?.(filter.value)}
		>
			{filter.label}
		</button>
	{/each}
</div>

<style>
	.scrollbar-none {
		scrollbar-width: none;
	}
	.scrollbar-none::-webkit-scrollbar {
		display: none;
	}
</style>
