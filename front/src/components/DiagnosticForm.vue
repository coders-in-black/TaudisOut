<template>
  <v-ons-page>
    <div v-if="currentStep">
      <h3>Évaluation (étape {{ currentStep.index }})</h3>
      <component :is="currentStep.component" @filled="stepFilled"/>
    </div>
    <diagnostic-results v-if="currentStepId === 'results'" :answers="answers"></diagnostic-results>
  </v-ons-page>
</template>

<script>

import DiagnosticResults from './DiagnosticResults'
import QuestionInsalubre from './questions/Insalubre'
// import QuestionHumidite from './questions/Humidite'
import QuestionFissures from './questions/Fissures'

export default {
  props: ['step'],
  components: {
    DiagnosticResults
  },
  data () {
    return {
      currentStepId: this.step || 'insalubre',
      answers: {}
    };
  },
  computed: {
    steps () {
      return [
        {
          id: 'insalubre',
          component: QuestionInsalubre,
          index: 1
        },
        {
          id: 'fissures',
          component: QuestionFissures,
          index: 2
        },
        // {
        //   id: 'humidite',
        //   component: QuestionHumidite,
        //   index: 2
        // },

      ]
    },
    currentStep () {
      return this.stepsById[this.currentStepId]
    },
    stepsById () {
      let data = {}
      this.steps.forEach(s => {
        data[s.id] = s
      })
      return data
    }
  },
  methods: {
    stepFilled ({answer, next}) {
      this.answers[this.currentStepId] = answer
      this.currentStepId = next
      if (next) {
        this.$router.push({
          query: {
            step: next,
          }
        })
      }
    }
  }
}
</script>
