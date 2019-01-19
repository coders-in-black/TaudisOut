<template>
  <div>
    <h4>Ajouter des photos</h4>
    <div class="pictures">
      <picture-input
        v-for="(image, idx) in images"
        v-bind:key="idx"
        ref="pictureInput"
        @change="onChange"

        margin="16"
        accept="image/jpeg,image/png"
        size="10"
        :removable="image !== null"
        buttonClass="btn"
        @remove="deleteImage(idx)"
        :customStrings="{
          tap: 'Ajouter une photo',
          remove: 'Supprimer'
        }">
      </picture-input>
    </div>
    <v-ons-button
      @click="$emit('filled', {next: 'address'})"
    >Étape suivante</v-ons-button>
  </div>
</template>

<script>
import config from '../../config'
import PictureInput from 'vue-picture-input'
import _ from 'lodash'
import shared from '../../shared.js'

export default {
  components: {
    PictureInput
  },
  data () {
    return {images: shared.images}
  },
  mounted() {
    console.log('mounted', this.$http);
    this.$getLocation({enableHighAccuracy: true})
    .then(coordinates => {
      console.log('coordinates', coordinates);
      this.location = coordinates;
      this.$http.post(config.http.api + '/reverse_geocoding', {location: coordinates})
      .then(response => {
        console.log('addresses', response.body)
        this.address = response.body[0]
      });
    })
    .catch(e => console.error(e));
  },
  methods: {
    declare () {
    },
    onChange (image) {
      if (image) {
        console.log('Picture loaded.')
        this.images[this.images.length - 1] = image;
        this.images.push(null);
      }
    }
  }
}
</script>
