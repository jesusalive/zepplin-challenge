import Vue from "vue";
import Router from "vue-router";
import Login from "./pages/Login.vue";
import Dashboard from "./pages/Dashboard.vue";
import Create from "./pages/CreateProduct.vue";
import Edit from "./pages/EditProduct.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      component: Login,
    },
    {
      path: "/dashboard",
      component: Dashboard,
    },
    {
      path: "/create",
      component: Create,
    },
    {
      path: "/edit/:id",
      component: Edit,
    },
  ],
});
