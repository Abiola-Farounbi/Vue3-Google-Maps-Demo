<template>
  <div>
    <GMapMap
    :center="center"
    :zoom="7"
    map-type-id="terrain"
    style="width: 500px; height: 500px"
    >
    <GMapMarker
      :key="index"
      v-for="(m, index) in markers"
      :position="m.position"
      :clickable="true"
      :draggable="true"
    />
    </GMapMap>
  </div>
</template>
<script>
  import { ref} from 'vue';
 
  export default {
    name: 'Map',
    setup() {
        const currPosition = ref({})
        

}

};
</script>

