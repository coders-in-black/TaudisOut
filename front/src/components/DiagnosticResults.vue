<template>
  <div>
    <h4>Votre diagnostic est terminé, voici vos résultats :</h4>
    <p>Sur la base de vos déclarations, nous pensons que :</p>
    {{ results }}
    <div class="dangerosity" :data-level="results.dangerosity">
      <div v-if="results.dangerosity === 0">Votre logement ne comporte pas de problème particulier</div>
      <div
        v-if="results.dangerosity === 1"
      >L'état de votre logement est bon, mais certaines choses sont à surveiller</div>
      <div v-if="results.dangerosity === 2">Votre logement présente des problèmes graves</div>
      <div v-if="results.dangerosity === 3">Votre logement est dangereux</div>
    </div>
  </div>
</template>

<script>
import shared from '../shared.js'

export default {
  mounted() {
    console.log('results answers', this.params, this.answers)
  },
  data () {
    return {
      // answers: shared.answers,
      answers: {
        // insalubre: true,
        insalubre: null,
        fissures: {
          cracks: false,
          detail: {
            lieu: 'escalier',
            forme: 'droite',
            traversante: false,
            escalierPenche: false
          }
        }
      }
    };
  },
  computed: {
    results () {
      let result = {}
      if (this.answers.insalubre) {
        result.dangerosity = 3
        return result
      }
      if (!this.answers.fissures.cracks) {
        result.dangerosity = 0
        return result
      } else {
        let d = this.answers.fissures.detail
        result.dangerosity = 1
        if (d.lieu === 'escalier' && d.escalierPenche) {
          result.dangerosity = 3
        }
      }
      return result
      }
  }
}
</script>
<style>
.dangerosity {
  background-color: rgba(0, 0, 0, 0.1);
  padding: 1em;
}
.dangerosity[data-level="0"] {
  color: green;
}
.dangerosity[data-level="1"] {
  color: rgb(167, 150, 0);
}
.dangerosity[data-level="2"] {
  color: orange;
}

.dangerosity[data-level="3"] {
  color: red;
}
</style>
