import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import VueOnsen from 'vue-onsenui'
import { L } from 'vue2-leaflet'

import 'leaflet/dist/leaflet.css'
import 'onsenui/css/onsenui.css'
import 'onsenui/css/onsen-css-components.css'

Vue.use(Router)
Vue.use(VueOnsen)

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
      path: '/',
      name: 'Home',
      component: Home,
      props: (route) => ({ step: route.query.step })
    }
  ]
})
