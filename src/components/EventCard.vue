<template>
  <router-link
    class="event-link"
    :to="{ name: 'event-show', params: { id: event.id } }"
  >
    <div class="event-card -shadow">
      <span class="eyebrow">@{{ event.time }} on {{ date }}</span>
      <h4 class="title">{{ event.title }}</h4>
      <BaseIcon name="users"> {{ event.attendees.length }} attending</BaseIcon>
    </div>
  </router-link>
</template>

<script>
import BaseIcon from './BaseIcon.vue'
export default {
  props: {
    event: Object,
  },
  components: { BaseIcon },
  computed: {
    date() {
      const options = { year: 'numeric', month: 'short', day: 'numeric' }
      return new Date(this.event.date).toLocaleDateString('en', options)
    },
  },
}
</script>

<style scoped>
.event-card {
  padding: 20px;
  margin-bottom: 24px;
  transition: all 0.2s linear;
  cursor: pointer;
}
.event-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2), 0 1px 15px 0 rgba(0, 0, 0, 0.19);
}
.event-card > .title {
  margin: 0;
}

.event-link {
  color: black;
  text-decoration: none;
  font-weight: 100;
}
</style>
