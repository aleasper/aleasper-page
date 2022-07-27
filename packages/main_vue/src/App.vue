<template>
  <div id="nav">
    ALEASPER PAGE
    <router-link to="/" class="nav-btn">HOME</router-link>
    <router-link to="/info-security" class="nav-btn">SECURITY</router-link>
  </div>
  <router-view/>
</template>

<style lang="scss">
@use "@/consts/colors" as colors;

body {
  background-color: colors.$background;
  color: colors.$basic-font;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
}

main {
  width: 1200px;
}

#nav {
  top: 0;
  position: sticky;
  width: 100%;
  box-sizing: border-box;
  font-weight: 700;
  height: 100px;
  border-bottom: 2px solid colors.$divider;
  background-color: colors.$background;
  padding: 0 100px;
  display: flex;
  align-items: center;
  gap: 40px;

  &.nav-btn {
    font-size: 26px;
  }
}
</style>
