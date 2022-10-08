<template>
<div class="development">
    <h2>This page under construction</h2>
    <img class="development__img" src="../assets/under-construction.svg" alt="road-sign"/>
</div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';


export default defineComponent({
  name: 'Development',
  components: {
  },
});
</script>

<style lang="scss" scoped>
.development {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &__img {
    width: 100%;
    max-height: 70vh;
  }
}
</style>
