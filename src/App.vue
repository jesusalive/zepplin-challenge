<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
@keyframes fade {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

body {
  padding: 0;
  margin: 0;
  font-family: "Montserrat", sans-serif;
  animation: fade 500ms ease-in-out;
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
