<template>
  <div>olá</div>
</template>

<script>
export default {
  async mounted() {
    const token = await localStorage.getItem("UserToken");

    token == "" && this.$router.push("/login");
  }
};
</script>

<style>
</style>