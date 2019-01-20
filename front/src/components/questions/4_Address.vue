<template>
  <div>
    <h4>Confirmer votre addresse (optionnel)</h4>
    <p>Ceci nous permettra de conserver une trace de votre diagnostic pour soutenir la lutte contre le logement indigne.</p>
    <spinner v-if="0 === addresses.length" class="spinner"></spinner>
    <v-ons-list>
      <v-ons-list-item v-for="(_address, $index) in addresses" :key="$index" tappable>
        <label class="left">
          <v-ons-radio modifier="material" :input-id="'radio-' + $index" :value="_address" v-model=" address"></v-ons-radio>
        </label>
        <label :for="'radio-' + $index" class="center">{{ _address }}</label>
      </v-ons-list-item>
    </v-ons-list>
    <div class="btn__content mtm">
      <v-ons-button :disabled="!address || sending" @click="submit()">Envoyer</v-ons-button>
      <v-ons-button @click="submit()">Sauter cette étape</v-ons-button>
    </div>
  </div>
</template>

<script>
import shared from '../../shared.js'
import config from '../../config'
import spinner from '../assets/spinner'

export default {
  components: {
    spinner
  },
  async mounted() {
    const coordinates = await this.$getLocation({enableHighAccuracy: true})
    this.location = coordinates;
    const response = await this.$http.post(config.http.api + '/reverse_geocoding', {location: coordinates})
    this.addresses = response.body
  },
  data () {
    return {
      sending: false,
      addresses: [],
      location: null,
      address: null
    }
  },
  methods: {
    async submit() {
      this.sending = true
      if (this.address) {
        shared.address = this.address
        shared.location = this.location
      }
      this.$router.push({
        name: 'DiagnosticResults'
      })

    }
  }
}
</script>
