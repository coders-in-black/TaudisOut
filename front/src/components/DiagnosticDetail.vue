<template>
  <v-ons-page shown>
   <v-ons-card>
      <img v-for="(image, idx) in diagnostic.images" v-bind:key='idx' :src="image" width='80%'/>
      <div class="title">
        {{diagnostic.address}}
      </div>
      <div class="content">
        <div>
          <v-ons-button><v-ons-icon icon="ion-thumbsup"></v-ons-icon></v-ons-button>
          <v-ons-button><v-ons-icon icon="ion-share"></v-ons-icon></v-ons-button>
        </div>
        <v-ons-list>
          <template v-for="(questions, diagType) in diagnostic.questions">
            <v-ons-list-header :key="diagType">{{diagType}}</v-ons-list-header>
            <v-ons-list-item v-for="(question, idx) in questions" v-bind:key='idx'>{{question}}</v-ons-list-item>
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
    const response = await this.$http.get(config.http.api + '/diagnostic/' + this.$route.params.id, shared.payload())
    this.diagnostic = response.body.data
    this.diagnostic.images = this.diagnostic.images.map(img => config.http.api + '/' + img)
    this.diagnostic.questions = _.chain(this.diagnostic.questions)
        .groupBy('type')
        .mapValues( (questions) => {
          return questions.map(({q, a}) => q + ' ? ' + a)
        })
        .value()
  },
  data() {
    return { diagnostic: null};
  }
}
</script>
