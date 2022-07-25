import Vue from 'vue'
import Vuex from 'vuex'
import EventService from '@/services/EventService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: { id: 'abc123', name: 'David' },
    events: [],
    eventsTotal: 0,
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
    SET_EVENTS(state, events) {
      state.events = events
    },
    SET_EVENTS_TOTAL(state, eventsTotal) {
      state.eventsTotal = eventsTotal
    },
  },
  actions: {
    createEvent({ commit }, event) {
      return EventService.addEvent(event).then(() => commit('ADD_EVENT', event))
    },
    fetchEvents({ commit }, { perPage, page }) {
      EventService.getEvents(perPage, page)
        .then((response) => {
          commit('SET_EVENTS_TOTAL', response.headers['x-total-count'])
          commit('SET_EVENTS', response.data)
        })
        .catch((error) => console.error(error.response))
    },
  },
  modules: {},
})
