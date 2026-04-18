<script lang="ts">
	import '../app.css';
	import { browser } from '$app/environment';
	import { locale, waitLocale } from 'svelte-i18n';
	import '$lib/i18n';

	let { children } = $props();

	if (browser) {
		locale.set(window.navigator.language.split('-')[0]);
	}
</script>

{@render children()}
