<template>
  <div>
    <div class="search-box">
      <GMapAutocomplete
        placeholder="Search for a location"
        @place_changed="setPlace"
        style="font-size: large"
      >
      </GMapAutocomplete>
    </div>

    <GMapMap :center="coords" :zoom="13" map-type-id="terrain" style="width: 500px; height: 500px">
      <GMapMarker :key="index" :position="coords" :clickable="true" :draggable="true">
        <GMapInfoWindow
          :opened="true"
          :options="{
            pixelOffset: {
              width: 10,
              height: 0
            },
            maxWidth: 320,
            maxHeight: 320
          }"
        >
         <p> {{ locationInfo }}</p>
        </GMapInfoWindow>
      </GMapMarker>
    </GMapMap>
  </div>
</template>
<script>
import { onMounted, ref } from 'vue'

export default {
  name: 'Map',
  setup() {
    const coords = ref({ lat: 51.5072, lng: 0.1276 })
    const locationInfo = ref('Your Location Address')

    // Get users current location
    const getUserLocation = () => {
      const isSupported = 'navigator' in window && 'geolocation' in navigator
      if (isSupported) {
        navigator.geolocation.getCurrentPosition((position) => {
          coords.value.lat = position.coords.latitude
          coords.value.lng = position.coords.longitude
        })
      }
    }

    const setPlace = (place) => {
      coords.value.lat = place.geometry.location.lat()
      coords.value.lng = place.geometry.location.lng()
      locationInfo.value = place.formatted_address
      console.log(place)
    }

    onMounted(() => {
      getUserLocation()
    })

    return { coords, getUserLocation, setPlace, locationInfo }
  }
}
</script>
<style scoped>
.search-box {
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}
</style>
