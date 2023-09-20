<template>
  <header>
    <h1>Vue 3 Google Maps</h1>
  </header>
  <main>
    <!-- Rendering the map component -->
    <Map></Map>
  </main>
</template>

<script>
import Map from './components/map.vue'
export default {
  name: 'App',
  components: {
    Map
  }
}
</script>
