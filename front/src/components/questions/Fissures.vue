<template>
  <div>
    <h4>Les murs de votre logement présentent-ils des fissures?</h4>
    <div v-if="cracks === null">
      <v-ons-button @click="cracks = true">Oui</v-ons-button>
      <v-ons-button @click="$emit('filled', {answer: false, next: null})">Non</v-ons-button>
    </div>
    <div v-if="cracks">Vous avez des fissures
      <v-ons-button @click="$emit('filled', {answer: {cracks: true}, next: null})">Oui</v-ons-button>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      cracks: null
    }
  }
}
</script>
