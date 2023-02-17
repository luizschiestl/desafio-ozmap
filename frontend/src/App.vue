<template>
  <UsersList />
</template>

<script lang="ts">
import '@/assets/tailwind.css';
import { defineComponent } from 'vue';
import UsersList from './components/UsersList.vue';

export default defineComponent({
  name: 'App',
  components: {
    UsersList,
  },
});
</script>
