<template>
  <div>
    <h4>Votre logement présente-t'il des traces d'humidité ?</h4>
    <div v-if="value === null">
      <v-ons-button @click="value = true">Oui</v-ons-button>
      <v-ons-button @click="$emit('filled', {answer: false, next: null})">Non</v-ons-button>
    </div>
    <div v-if="value">
      <h5>Quels type de traces observez-vous ?</h5>
      <image-choice
        :id="suintement"
        @updated="handle('suintement', $event)"
        :src="'test.png'"
      >Suintements</image-choice>
      <image-choice :id="fuite" @updated="handle('fuite', $event)" :src="'test.png'">Fuites</image-choice>
      <div class="btn__content">
        <v-ons-button modifier="cta" @click="$emit('filled', {answer: {value: true, detail: null}, next: null})"
        >Passer à l'étape suivante</v-ons-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: null,
      detail: {

      }
    }
  },
  methods: {
    handle (type, value) {
      this.detail[type] = value
    }
  }
}
</script>
