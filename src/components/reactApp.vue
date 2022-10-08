<template>
  <div id="react">
  </div>
</template>

<script>

const reactApp = import('Remote/App');

export default {
  name: "reactApp",
  mounted() {
    reactApp.then(app => app.mount('react'));
  }
}
</script>

<style scoped>

</style>