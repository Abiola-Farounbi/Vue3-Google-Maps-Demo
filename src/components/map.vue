<template>
  <div>
    <!-- input search box for google places autocomplete -->
    <div class="search-box">
      <GMapAutocomplete
        placeholder="Search for a location"
        @place_changed="setPlace"
        style="font-size: medium"
      >
      </GMapAutocomplete>
    </div>

    <!-- rendering the map on the page -->
    <GMapMap :center="coords" :zoom="10" map-type-id="terrain" style="width: 80vw; height: 20rem">

      <!-- Marker to display the searched location -->
      <GMapMarker
        :key="markerDetails.id"
        :position="markerDetails.position"
        :clickable="true"
        :draggable="false"
        @click="openMarker(markerDetails.id)"
      >
        <!-- InfoWindow to display the searched location details -->
          <GMapInfoWindow
            v-if="locationDetails.address != ''"
            :closeclick="true"
            @closeclick="openMarker(null)"
            :opened="openedMarkerID === markerDetails.id"
            :options="{
              pixelOffset: {
                width: 10,
                height: 0
              },
              maxWidth: 320,
              maxHeight: 320
            }"
           
          >
            <div class="location-details">
              <h3>Location Details</h3>
              <p>Address: {{ locationDetails.address }}</p>
              <p>
                URL: <a :href="locationDetails.url" target="_blank"> {{ locationDetails.url }}</a>
              </p>
            </div>
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
    // Setting the default coordinates to London
    const coords = ref({ lat: 51.5072, lng: 0.1276 })
    // Marker Details
    const markerDetails = ref({
      id: 1,
      position: coords.value
    })
    const openedMarkerID = ref(null)

    // Places Details
    const locationDetails = ref({
      address: '',
      url: ''
    })

    // Get users current location using the browser's geolocation API
    const getUserLocation = () => {
      // Check if Geolocation is supported by the browser
      const isSupported = 'navigator' in window && 'geolocation' in navigator
      if (isSupported) {
        // Retrieve the user's current position
        navigator.geolocation.getCurrentPosition((position) => {
          coords.value.lat = position.coords.latitude
          coords.value.lng = position.coords.longitude
        })
      }
    }

    // Set the location based on the place selected
    const setPlace = (place) => {
      coords.value.lat = place.geometry.location.lat()
      coords.value.lng = place.geometry.location.lng()

      // Update the location details
      locationDetails.value.address = place.formatted_address
      locationDetails.value.url = place.url
    }

    // Open the marker info window
    const openMarker = (id) => {
      openedMarkerID.value = id
    }

    onMounted(() => {
      getUserLocation()
    })

    return {
      coords,
      markerDetails,
      openedMarkerID,
      openMarker,
      getUserLocation,
      setPlace,
      locationDetails
    }
  }
}
</script>
<style scoped>
.search-box {
  margin: 10px 0px;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}
.location-details {
  color: black;
  font-size: 12px;
  font-weight: 500;
}
</style>
