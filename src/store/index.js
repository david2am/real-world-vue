import Vue from 'vue'
import Vuex from 'vuex'
import EventService from '@/services/EventService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: { id: 'abc123', name: 'David' },
    events: [
      { id: 1, title: '...', organizer: '...' },
      { id: 2, title: '...', organizer: '...' },
      { id: 3, title: '...', organizer: '...' },
      { id: 4, title: '...', organizer: '...' },
    ],
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
  getters: {
    getEventById: (state) => (id) => state.events.filter((e) => (e.id = id))[0],
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
  },
  actions: {
    createEvent({ commit }, event) {
      return EventService.addEvent(event).then(() => commit('ADD_EVENT', event))
    },
  },
  modules: {},
})
