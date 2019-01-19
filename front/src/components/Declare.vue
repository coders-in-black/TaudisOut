<template>
  <v-ons-page>
    <v-ons-list-title>Mes Signalement</v-ons-list-title>
    <v-ons-list>
      <v-ons-list-item>Item A</v-ons-list-item>
      <v-ons-list-item>Item B</v-ons-list-item>
      <v-ons-list-item>Item C</v-ons-list-item>
    </v-ons-list>
    <v-ons-button @click="declare($event)">Signaler</v-ons-button>
    <!-- <img v-for="image in images" v-bind:key="image.id" :src="image.data" class="uploading-image" />
    <span>{{images.length}}</span>
    <span v-for="image in images" v-bind:key="image.id">{{image.id}}</span>
    <input type="file" accept="image/*" @change="onFileChanged">
    <button @click="onUpload">Upload!</button> -->

    <div class="location">{{location}}</div>
    <div class="address">{{address}}</div>
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
    <v-ons-button :disabled="!address" @click="submit">Envoyer</v-ons-button>

  </v-ons-page>
</template>

<style>

.preview-container {
  width: 40% !important;
  height: 150px !important;
}
.picture-inner {
  font-size: 10px !important;
}
</style>

<script>
import config from '../config'
import PictureInput from 'vue-picture-input'
import _ from 'lodash'

export default {
  name: 'Declare',
  components: {
    PictureInput
  },
  data () {
    return {
        location: null,
        address: null,
        images: [
          null
        ]
    };
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
    },
    deleteImage(image_idx) {
      this.images = this.images.filter((data, idx) =>{
        console.log('idx', idx, image_idx);
        return idx !== image_idx
      })
    },
    answers2arr() {
      const answers = {
        "insalubre": null,
        "fissures": {
          "cracks": true,
          "detail": {
            "lieu": "appartement",
            "forme": "escalier",
            "traversante": true,
            "murPorteur": true,
            "plusieursMurs": true,
            "cloisonSol": true
          }
        }
      };
      return _.chain(answers)
        .toPairs()
        .filter(1)
        .tap(console.log)
        .map( ([diag_type, diag_answers]) =>
          _.chain(diag_answers).keys().without('detail').map((q) => {
            return {
              type: diag_type,
              q,
              a: diag_answers[q]
            }
          })
          .tap(console.log)
          .value()
          .concat(
            _.map(diag_answers.detail, (a, q) => {
              return {
                type: diag_type,
                q,
                a
              }
            })
          )
        )
        .flatten()
        .tap(console.log)
        .value()
    },
    async submit() {
      response = await this.$http.post(config.http.api + '/diagnostic', {
        images: this.images.filter(image => image),
        location: this.location,
        address: this.address,
        questions: this.answers2arr()
      })
      console.log('response', response);
    }
  }
}
</script>
