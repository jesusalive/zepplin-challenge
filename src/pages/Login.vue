<template>
  <div class="bg-dark container">
    <login-box />
  </div>
</template>

<script>
import LoginBox from "../components/LoginBox.vue";

export default {
  name: "Login",
  components: {
    "login-box": LoginBox
  },
  async mounted() {
    const token = await localStorage.getItem("UserToken");

    token != null && this.$router.push("/dashboard");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
