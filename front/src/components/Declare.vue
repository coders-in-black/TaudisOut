<template>
  <v-ons-page>
    <v-ons-list-title>Mes Signalement</v-ons-list-title>
    <v-ons-list>
      <v-ons-list-item>Item A</v-ons-list-item>
      <v-ons-list-item>Item B</v-ons-list-item>
      <v-ons-list-item>Item C</v-ons-list-item>
    </v-ons-list>
    <v-ons-button @click="declare($event)">Signaler</v-ons-button>
  </v-ons-page>
</template>

<script>
import {LMap, LTileLayer, LMarker } from 'vue2-leaflet';

export default {
  name: 'Declare',

  data () {
    return {

    };
  },
  methods: {
    declare () {
    },
  }
}
</script>
