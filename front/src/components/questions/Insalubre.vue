<template>
  <div>
    <h4>Votre logement est-il insalubre ?</h4>
    <v-ons-button @click="$emit('filled', {answer: true, next: null})">Oui</v-ons-button>
    <v-ons-button @click="$emit('filled', {answer: false, next: null})">Non</v-ons-button>
    <v-ons-button @click="$emit('filled', {answer: null, next: 'fissures'})">Je ne sais pas</v-ons-button>
  </div>
</template>

<script>

export default {}
</script>
