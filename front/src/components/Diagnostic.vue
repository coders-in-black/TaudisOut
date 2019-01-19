<template>
  <div>
    <div v-if="!showDiagnostic">
      <h2>Évaluer mon logement</h2>
      <div>
        <p>Cette évaluation réalisable en quelques minutes vous permettra de :</p>
        <v-ons-list>
          <v-ons-list-item>Connaître l'état de votre logement et son niveau de dangerosité</v-ons-list-item>
          <v-ons-list-item>Recevoir une aide personnalisée pour entamer d'éventuelle démarches</v-ons-list-item>
        </v-ons-list>
      </div>
      <v-ons-button @click="startDiagnostic" modifier="large">Démarrer l'évaluation</v-ons-button>
    </div>
    <diagnostic-form v-else></diagnostic-form>
  </div>
</template>

<script>

import DiagnosticForm from './DiagnosticForm'

export default {
  components: {DiagnosticForm},
  data () {
    return {
      showDiagnostic: false
    };
  },
  methods: {
      startDiagnostic () {
          this.showDiagnostic = true
      }
  }
}
</script>
