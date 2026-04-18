<script lang="ts">
	interface Props {
		placeholder?: string;
		value?: string;
		onchange?: (value: string) => void;
	}

	let { placeholder = '¿A dónde quieres ir?', value = $bindable(''), onchange }: Props = $props();
</script>

<div class="relative w-full">
	<span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
		<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
			<circle cx="11" cy="11" r="8"/>
			<path d="m21 21-4.35-4.35"/>
		</svg>
	</span>
	<input
		type="search"
		bind:value
		oninput={() => onchange?.(value)}
		{placeholder}
		class="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-full text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-950/20 focus:border-teal-950 transition-colors"
	/>
</div>
