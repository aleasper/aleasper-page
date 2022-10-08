<template>
  <main>
    <development/>
  </main>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import Development from '@/components/development.vue'


export default defineComponent({
  name: 'Home',
  components: {
    Development
  },
});
</script>

<style lang="scss" scoped>
.placeholder {
  width: 100%;
  height: 100%;
  background-color: palevioletred;
  height: 2000px;
}
</style>
