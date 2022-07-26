import Vue from 'vue'
import Vuex from 'vuex'

import { user, event, notification } from '@/store/modules'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community',
    ],
  },
  modules: {
    user,
    event,
    notification,
  },
})
