<template>
  <GMapMap
   :center="center"
   :zoom="7"
   map-type-id="terrain"
   style="width: 1000px; height: 800px"
  >
  </GMapMap>
 </template>
 
 <script>
  export default {
   name: "App",
   data() {
    return {
     center: { lat: 51.093048, lng: 6.84212 },
    };
   },
  };
 </script>