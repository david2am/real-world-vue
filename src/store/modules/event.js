import EventService from '@/services/EventService'

export const namespaced = true

export const state = {
  event: {},
  events: [],
  eventsTotal: 0,
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
  createEvent({ commit, dispatch }, event) {
    return EventService.addEvent(event)
      .then(() => {
        commit('ADD_EVENT', event)
        const notification = {
          type: 'success',
          message: `Your event has been created!`,
        }
        dispatch('notification/add', notification, { root: true })
      })
      .catch((error) => {
        const notification = {
          type: 'error',
          message: `There was a problem creating your event: ${error.message}`,
        }
        dispatch('notification/add', notification, { root: true })
        throw error
      })
  },
  fetchEvent({ commit, getters, dispatch }, id) {
    const event = getters.getEventById(id)
    if (event) {
      commit('SET_EVENT', event)
    } else {
      EventService.getEvent(id)
        .then((response) => commit('SET_EVENT', response.data))
        .catch((error) => {
          const notification = {
            type: 'error',
            message: `There was a problem fetching event: ${error.message}`,
          }
          dispatch('notification/add', notification, { root: true })
        })
    }
  },
  fetchEvents({ commit, dispatch }, { perPage, page }) {
    EventService.getEvents(perPage, page)
      .then((response) => {
        commit('SET_EVENTS_TOTAL', response.headers['x-total-count'])
        commit('SET_EVENTS', response.data)
      })
      .catch((error) => {
        const notification = {
          type: 'error',
          message: `There was a problem fetching events: ${error.message}`,
        }
        dispatch('notification/add', notification, { root: true })
      })
  },
}

export const getters = {
  getEventById: (state) => (id) =>
    state.events.find((event) => event.id === id),
}
