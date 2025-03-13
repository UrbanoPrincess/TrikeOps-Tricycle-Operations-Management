<script lang="ts">
    import { onMount } from 'svelte';

    type Driver = {
        name: string;
        license_no: string;
        contact_no: string;
        address: string;
    };

    let drivers: Driver[] = [];
    let error: string = '';
    let loading: boolean = true;

    async function fetchDrivers() {
        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'; // Use environment variable
            const response = await fetch(`${API_URL}/api/drivers`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            drivers = await response.json() as Driver[];
        } catch (err) {
            error = (err as Error).message;
        } finally {
            loading = false;
        }
    }

    // 🔥 Move fetchDrivers inside onMount to avoid SSR errors
    onMount(() => {
        fetchDrivers();
    });
</script>

<h2>Drivers List</h2>

{#if loading}
    <p>Loading...</p>
{:else if error}
    <p>Error: {error}</p>
{:else}
    <ul>
        {#each drivers as driver}
            <li>{driver.name} - {driver.license_no} - {driver.contact_no} - {driver.address}</li>
        {/each}
    </ul>
{/if}
