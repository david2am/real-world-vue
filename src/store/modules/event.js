import EventService from '@/services/EventService'

export const state = {
  event: {},
  events: [],
  eventsTotal: 0,
}

export const getters = {
  getEventById: (state) => (id) => state.events.filter((e) => (e.id = id))[0],
}

export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event)
  },
  SET_EVENT(state, event) {
    state.event = event
  },
  SET_EVENTS(state, events) {
    state.events = events
  },
  SET_EVENTS_TOTAL(state, eventsTotal) {
    state.eventsTotal = eventsTotal
  },
}

export const actions = {
  createEvent({ commit }, event) {
    return EventService.addEvent(event).then(() => commit('ADD_EVENT', event))
  },
  fetchEvent({ commit, getters }, id) {
    const event = getters.getEventById(id)
    if (event) {
      commit('SET_EVENT', event)
    } else {
      EventService.getEvent(id)
        .then((response) => commit('SET_EVENT', response.data))
        .catch((error) => console.error(error.response))
    }
  },
  fetchEvents({ commit }, { perPage, page }) {
    EventService.getEvents(perPage, page)
      .then((response) => {
        commit('SET_EVENTS_TOTAL', response.headers['x-total-count'])
        commit('SET_EVENTS', response.data)
      })
      .catch((error) => console.error(error.response))
  },
}
