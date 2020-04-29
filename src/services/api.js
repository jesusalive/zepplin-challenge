import Vue from "vue";
import axios from "axios";

const api = axios.create({
  baseURL: "https://challenge-api.zepplin.com.br",
});

Vue.use(api);

export default api;
