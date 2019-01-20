<template>
  <div id="app">
    <v-ons-page>
      <v-ons-toolbar>
        <a @click.prevent="$router.push({name: 'Diagnostic'})" class="center">BalanceTonTaudis</a>
      </v-ons-toolbar>
      <v-ons-tabbar
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
          :icon="tab.icon"
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
                  name: 'Carte',
                  label: 'Carte',
                  icon: 'map-marked-alt',
                  // badge: 7,
              },
              {
                  name: 'Guide',
                  label: 'Guide',
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
.btn__content {
  text-align: center;
}
.btn__content .button {
  margin: 5px;
}

/* Spacing Helpers */
/* --------------- */
.man,
.ma0 {
  margin: 0;
}

.pan,
.pa0 {
  padding: 0;
}

.mas {
  margin: 1rem;
}

.mam {
  margin: 2rem;
}

.mal {
  margin: 4rem;
}

.pas {
  padding: 1rem;
}

.pam {
  padding: 2rem;
}

.pal {
  padding: 4rem;
}

.mtn,
.mt0 {
  margin-top: 0;
}

.mts {
  margin-top: 1rem;
}

.mtm {
  margin-top: 2rem;
}

.mtl {
  margin-top: 4rem;
}

.mrn,
.mr0 {
  margin-right: 0;
}

.mrs {
  margin-right: 1rem;
}

.mrm {
  margin-right: 2rem;
}

.mrl {
  margin-right: 4rem;
}

.mbn,
.mb0 {
  margin-bottom: 0;
}

.mbs {
  margin-bottom: 1rem;
}

.mbm {
  margin-bottom: 2rem;
}

.mbl {
  margin-bottom: 4rem;
}

.mln,
.ml0 {
  margin-left: 0;
}

.mls {
  margin-left: 1rem;
}

.mlm {
  margin-left: 2rem;
}

.mll {
  margin-left: 4rem;
}

.mauto {
  margin: auto;
}

.mtauto {
  margin-top: auto;
}

.mrauto {
  margin-right: auto;
}

.mbauto {
  margin-bottom: auto;
}

.mlauto {
  margin-left: auto;
}

.ptn,
.pt0 {
  padding-top: 0;
}

.pts {
  padding-top: 1rem;
}

.ptm {
  padding-top: 2rem;
}

.ptl {
  padding-top: 4rem;
}

.prn,
.pr0 {
  padding-right: 0;
}

.prs {
  padding-right: 1rem;
}

.prm {
  padding-right: 2rem;
}

.prl {
  padding-right: 4rem;
}

.pbn,
.pb0 {
  padding-bottom: 0;
}

.pbs {
  padding-bottom: 1rem;
}

.pbm {
  padding-bottom: 2rem;
}

.pbl {
  padding-bottom: 4rem;
}

.pln,
.pl0 {
  padding-left: 0;
}

.pls {
  padding-left: 1rem;
}

.plm {
  padding-left: 2rem;
}

.pll {
  padding-left: 4rem;
}

</style>
