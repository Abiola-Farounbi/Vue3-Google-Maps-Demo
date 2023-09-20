import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
//Imports the map package
import VueGoogleMaps from "@fawmi/vue-google-maps";

const app = createApp(App);
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
app.use(VueGoogleMaps, {
  load: {
    key: GOOGLE_MAPS_API_KEY,
    libraries: "places"
  },
})
  .mount("#app");


