import Vue from 'vue'
import Router from 'vue-router'
import VueOnsen from 'vue-onsenui'
import { L } from 'vue2-leaflet'
import VueResource from 'vue-resource'
import VueGeolocation from 'vue-browser-geolocation'

import 'leaflet/dist/leaflet.css'
import 'onsenui/css/onsenui.css'
import 'onsenui/css/onsen-css-components.css'

import TaudisMap from '@/components/TaudisMap'
import Declare from '@/components/Declare';
import Diagnostic from '@/components/Diagnostic';
import DiagnosticForm from '@/components/DiagnosticForm';
import DiagnosticResults from '@/components/DiagnosticResults';

const Settings = {
  template: `
<div>
  Settings page
</div>
`
}

Vue.use(Router)
Vue.use(VueOnsen)
Vue.use(VueResource)
Vue.use(VueGeolocation)

// this part resolve an issue where the markers would not appear
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/accueil',
      alias: '/',
      name: 'Home',
      component: TaudisMap,
      // props: (route) => ({ step: route.query.step })
    },
    {
      path: '/diagnostic',
      alias: '/',
      name: 'Diagnostic',
      component: Diagnostic,
      // props: (route) => ({ step: route.query.step })
    },
    {
      path: '/diagnostic/new',
      alias: '/',
      name: 'DiagnosticForm',
      component: DiagnosticForm,
      // props: (route) => ({ step: route.query.step })
    },
    {
      path: '/diagnostic/result',
      alias: '/',
      name: 'DiagnosticResults',
      component: DiagnosticResults,
      // props: (route) => ({ step: route.query.step })
    },
    {
      path: '/declarer',
      name: 'Declare',
      component: Declare,
      // props: (route) => ({ step: route.query.step })
    },
    {
      path: '/reglages',
      name: 'Settings',
      component: Settings,
      // props: (route) => ({ step: route.query.step })
    },
  ]
})
