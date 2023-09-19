<template>
  <h1> Vue 3 Google Maps </h1>
<!-- Rendering the map component -->
  <Map></Map>
 </template>
 
 <script>
 import Map from './components/map.vue'
  export default {
   name: "App",
   components: {
     Map
   }
  };
 </script>