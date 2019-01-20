<template>
  <div>
    <l-map
      :zoom="zoom"
      :center="center"
      @update:zoom="zoomUpdated"
      @update:center="centerUpdated"
      @update:bounds="boundsUpdated"
    >
      <l-tile-layer :url="url"></l-tile-layer>
      <l-feature-group ref="features">
        <l-popup>
          <div v-show='false'>{{selected_marker}}</div><!-- Hack to prevent empty popup -->
          <div v-if="selected_marker">
            <span>address: {{selected_marker.address}}</span>
            <img v-for="(image, idx) in selected_marker.images" v-bind:key='idx' :src="image" width='80%'/>
            <v-ons-button @click="detail(selected_marker)">Détail</v-ons-button>
          </div>
        </l-popup>
      </l-feature-group>
      <l-marker
        v-for="marker in markers"
        v-bind:key="marker._id"
        :lat-lng="marker.location.coordinates"
        @click="openPopUp(marker.location.coordinates, marker)"
      >
        <l-icon
          :icon-anchor="iconAnchor"
          class-name="marker"
        >
          <img :src="marker.icon">
        </l-icon>
      </l-marker>
    </l-map>
  </div>
</template>

<style>
.leaflet-popup-content {
  width: 250px !important;
}
.marker {
  padding: 18px;
  background-position: 0px 0px;
  width: auto !important;
  height: auto !important;
  outline: none;
}
</style>

<script>
import config from '../config'
import {LMap, LTileLayer, LMarker, LFeatureGroup, LPopup, LIcon } from 'vue2-leaflet'
import _ from 'lodash'
import shared from '../shared'

export default {
  name: 'TaudisMap',
  components: {
      LMap,
      LTileLayer,
      LMarker,
      LFeatureGroup,
      LPopup,
      LIcon
  },
  data () {
    return {
      iconAnchor: [23, 23],
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      zoom: 13,
      selected_marker: null,
      center: [43.2923576651113, 5.383435562252999],
      bounds: null,
      markers: [
      ]
    };
  },
  async mounted() {
    const response = await this.$http.get(config.http.api + '/poi')
    this.markers = response.body.data.map( marker => shared.toView(marker));
  },
  methods: {
    zoomUpdated (zoom) {
      this.zoom = zoom;
    },
    centerUpdated (center) {
      this.center = center;
    },
    boundsUpdated (bounds) {
      this.bounds = bounds;
    },
    openPopUp (latLng, caller) {
      this.selected_marker = caller;
      this.$refs.features.mapObject.openPopup(latLng);
    },
    detail (selected_marker) {
      this.$router.push({
        name: 'DiagDetail',
        params: {
          id: selected_marker._id
        }
      })
    }
  }
}
</script>
