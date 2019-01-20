<template>
  <v-ons-page shown>
   <v-ons-card>
      <img v-for="(image, idx) in diagnostic.images" v-bind:key='idx' :src="image" width='80%'/>
      <div class="title">
        {{diagnostic.address}}
      </div>
      <div class="content">
        <v-ons-list>
          <template v-for="(questions, diagType) in diagnostic.questions">
            <v-ons-list-header :key="diagType">{{diagType}}</v-ons-list-header>
            <v-ons-list-item v-for="(question, idx) in questions" v-bind:key='idx'>
              {{question}}
              <span class="right" v-if="question.indexOf('Ne sais pas') >= 0">
                <span v-if="answers[idx] === true">
                  <v-ons-icon icon="check" modifier="light"></v-ons-icon>
                </span>
                <span v-if="answers[idx] === false">
                  <v-ons-icon icon="times" modifier="light"></v-ons-icon>
                </span>
                <span v-if="answers[idx] === null">
                  <v-ons-button @click="answer(idx, true)"><v-ons-icon icon="check" modifier="light"></v-ons-icon></v-ons-button>
                  &nbsp;
                  <v-ons-button @click="answer(idx, false)"><v-ons-icon icon="times" modifier="light"></v-ons-icon></v-ons-button>
                </span>
              </span>
            </v-ons-list-item>
          </template>
        </v-ons-list>
      </div>
    </v-ons-card>
  </v-ons-page>
</template>

<script>
import config from '../config.js'
import shared from '../shared.js'

export default {
  async mounted() {
    if (!this.$route.params.id) return;
    const response = await this.$http.get(config.http.api + '/diagnostic/' + this.$route.params.id)
    this.diagnostic = shared.toView(response.body.data)
  },
  data() {
    return {
      diagnostic: {},
      answers: {
        0: null,
        1: null,
        2: null,
        3: null,
        4: null,
        5: null,
        6: null,
        7: null,
        8: null,
        9: null,
        10: null,
      }
    };
  },
  methods: {
    answer(question, value) {
      console.log('answer', question, value, this.answers);
      this.answers[question] = value
    }
  }
}
</script>
