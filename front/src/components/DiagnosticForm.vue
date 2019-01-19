<template>
  <v-ons-page shown>
    <div v-if="currentStep">
      <h3>Évaluation (étape {{ num_step }})</h3>
      <component :is="currentStep.component" @filled="stepFilled"/>
    </div>
  </v-ons-page>
</template>

<script>

import QuestionInsalubre from './questions/1_Insalubre'
// import QuestionHumidite from './questions/Humidite'
import QuestionFissures from './questions/2_Fissures'
import QuestionPhotos from './questions/3_Photos'
import QuestionAddress from './questions/4_Address'
import shared from '../shared.js'

export default {
  props: ['step'],
  data () {
    return {
      num_step: 1,
      currentStepId: this.step || 'insalubre'
    };
  },
  computed: {
    steps () {
      return [
        {
          id: 'insalubre',
          component: QuestionInsalubre
        },
        {
          id: 'fissures',
          component: QuestionFissures
        },
        {
          id: 'photos',
          component: QuestionPhotos
        },
        {
          id: 'address',
          component: QuestionAddress
        }
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
    stepFilled ({next}) {
      this.num_step++
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
