<template>
  <div>
    <h1>Event listing</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<script>
import EventService from '@/services/EventService'
import EventCard from '@/components/EventCard'

export default {
  components: {
    EventCard,
  },
  data() {
    return {
      events: [],
    }
  },
  created() {
    EventService.getEvents()
      .then((response) => (this.events = response.data))
      .catch((error) => console.error(error.response))
  },
}
</script>

<style></style>
