<template>
  <div>
    <h4>Votre logement est-il insalubre ?</h4>
    <v-ons-button @click="answer(true)">Oui</v-ons-button>
    <v-ons-button @click="answer(false)">Non</v-ons-button>
    <v-ons-button @click="answer(null)">Je ne sais pas</v-ons-button>
  </div>
</template>

<script>
import shared from '../../shared.js'

export default {
  data () {
    return shared.answers
  },
  methods: {
    answer(value) {
      this.insalubre = {insalubre: value};
      const next = value || value === false ? 'photos': 'fissures'
      this.$emit('filled', {next});
    }
  }
}
</script>
