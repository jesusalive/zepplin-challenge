<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
body {
  padding: 0;
  margin: 0;
  font-family: "Montserrat", sans-serif;
}

#app {
  padding: 0;
  margin: 0;
}

.bg-dark {
  background-color: #26262e;
}

.bg-darker {
  background-color: #121212;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
</style>
