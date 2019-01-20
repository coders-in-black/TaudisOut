<template>
  <div>
    <h4>Sélectionner votre addresse : </h4>
    <spinner v-if="0 === addresses.length" class="spinner"></spinner>
    <v-ons-list>
      <v-ons-list-item v-for="(_address, $index) in addresses" :key="$index" tappable>
        <label class="left">
          <v-ons-radio
            :input-id="'radio-' + $index"
            :value="_address"
            modifier="material"
            v-model=" address"
          >
          </v-ons-radio>
        </label>
        <label :for="'radio-' + $index" class="center">
          {{ _address }}
        </label>
      </v-ons-list-item>
    </v-ons-list>
    <div class="btn__content mtm">
      <v-ons-button :disabled="!address || sending" @click="submit()">Envoyer</v-ons-button>
    </div>
  </div>
</template>

<script>
import config from '../../config'
import shared from '../../shared.js'
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
      shared.address = this.address
      shared.location = this.location
      const response = await this.$http.post(config.http.api + '/diagnostic', shared.payload())
      console.log('response', response);
      this.$router.push({
        name: 'DiagnosticResults'
      })

    }
  }
}
</script>
