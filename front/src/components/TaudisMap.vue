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
            <div v-for="(questions, diagType) in selected_marker.questions" v-bind:key="diagType">
              <h4>{{diagType}}</h4>
              <div v-for="(question, idx) in questions" v-bind:key='idx'>{{question}}</div>
            </div>
            <img v-for="(image, idx) in selected_marker.images" v-bind:key='idx' :src="image" width='80%'/>
          </div>
        </l-popup>
      </l-feature-group>
      <l-marker
        v-for="marker in markers"
        v-bind:key="marker._id"
        :lat-lng="marker.location.coordinates"
        @click="openPopUp(marker.location.coordinates, marker)"
      ></l-marker>
    </l-map>
  </div>
</template>

<style>
.leaflet-popup-content {
  width: 250px !important;
}
</style>

<script>
import config from '../config'
import {LMap, LTileLayer, LMarker, LFeatureGroup, LPopup } from 'vue2-leaflet'
import _ from 'lodash'

export default {
  name: 'TaudisMap',
  components: {
      LMap,
      LTileLayer,
      LMarker,
      LFeatureGroup,
      LPopup
  },
  data () {
    return {
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
    this.markers = response.body.data;
    this.markers.forEach( marker => {
      marker.images = marker.images.map(img => config.http.api + '/' + img)
      marker.questions = _.chain(marker.questions)
        .groupBy('type')
        .mapValues( (questions) => {
          return questions.map(({q, a}) => q + ' ? ' + a)
        })
        .value()
    })
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
    }
  }
}
</script>
