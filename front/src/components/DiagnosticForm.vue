<template>
  <div>
    <h3>Évaluation (étape {{ currentStep.index }})</h3>
    <component :is="currentStep.component" @filled="stepFilled"/>
  </div>
</template>

<script>

import QuestionInsalubre from './questions/Insalubre'
import QuestionHumidite from './questions/Humidite'
// import QuestionFissures from './questions/Fissures'

export default {
  data () {
    return {
      currentStepId: 'insalubre',
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
        {
          id: 'humidite',
          component: QuestionHumidite,
          index: 2
        },

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
    }
  }
}
</script>
