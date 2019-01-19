<template>
  <div id="app">
    <v-ons-page>
      <v-ons-toolbar>
        <a href="/" class="center">BalanceTonTaudis</a>
      </v-ons-toolbar>
      <v-ons-tabbar
              swipeable
              position="auto"
              @reactive="log('reactive')"
              @postchange="log('postchange')"
              @prechange="log('prechange')"
              @init.native="log('init')"
              @show.native="log('show')"
              @hide.native="log('hide')"
              @destroy.native="log('destroy')"
      >
        <router-view slot="pages"></router-view>
        <!-- @todo : gérer les slot -->
        <!--<router-view slot="pages"></router-view>-->
        <v-ons-tab v-for="tab in tabs" :key="tab.name"
                   :label="tab.label"
                   :active="$route.name === tab.name"
                   @click.prevent="$router.push({name: tab.name})"
        ></v-ons-tab>
      </v-ons-tabbar>
    </v-ons-page>
  </div>
</template>

<script>

export default {
  name: 'app',
  props: {
      step: {required: false}
  },
  data() {
      return {
          tabs: [
              {
                  name: 'Diagnostic',
                  label: 'Mon logement',
                  icon: 'home',
                  // props: {step: this.step}
              },
              {
                  name: 'Declare',
                  label: 'Signaler',
                  icon: 'exclamation-triangle',
                  // badge: 7,
              },
              {
                  name: 'Settings',
                  label: 'Réglages',
                  icon: 'question-circle',
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

<style>
body {
  margin: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
  margin-top: 40px;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #35495e;
  color: #ffffff;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: 0.02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}
.page__content {
  padding: 8px;
}
</style>
