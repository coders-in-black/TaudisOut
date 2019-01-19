<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="center">BalanceTonTaudis</div>
    </v-ons-toolbar>
    <v-ons-tabbar
      swipeable
      :tabs="tabs"
      :index.sync="tabbarIndex"
      :visible="tabbarVisibility"
      position="auto"
      @reactive="log('reactive')"
      @postchange="log('postchange')"
      @prechange="log('prechange')"
      @init.native="log('init')"
      @show.native="log('show')"
      @hide.native="log('hide')"
      @destroy.native="log('destroy')"
    ></v-ons-tabbar>
  </v-ons-page>
</template>

<script>

// import TaudisMap from './TaudisMap'
import Declare from './Declare'
import Diagnostic from './Diagnostic'

const home = {
  template: `
    <v-ons-page>
      Home page.
      <p>{{ test }}</p>
    </v-ons-page>
  `,
  props: ['test']
}
const news = {
  template: `
    <v-ons-page>
      News page
    </v-ons-page>
  `
}
const settings = {
  template: `
    <v-ons-page>
      Settings page
    </v-ons-page>
  `
}
export default {
  props: {
    step: {required: false}
  },
  data() {
    return {
      tabbarIndex: 0,
      tabbarVisibility: true,
      tabs: [
        {
          label: 'Mon logement',
          icon: 'home',
          page: Diagnostic,
          props: {step: this.step}
        },
        // {
        //   label: 'Carte',
        //   icon: 'map-marker-alt',
        //   page: TaudisMap
        // },
        {
          label: 'Signaler',
          icon: 'exclamation-triangle',
          badge: 7,
          page: Declare
        },
        {
          label: 'Guide',
          icon: 'question-circle',
          page: settings
        }
      ]
    }
  },
  methods: {
    log(...args) {
      console.log(...args)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495e;
}
</style>
