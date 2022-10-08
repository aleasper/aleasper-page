<template>
  <div>
    <react-app></react-app>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import ReactApp from "@/components/reactApp.vue"; // @ is an alias to /src


export default defineComponent({
  name: 'Home',
  components: {
    ReactApp,
  },
});
</script>
