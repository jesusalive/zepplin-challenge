<template>
  <div class="container bg-dark">
    <dashboard-header />
    <div>
      <h3>Novo Produto</h3>
      <input type="text" v-model="name" placeholder="Nome" />
      <select v-model="category">
        <option value="none">Selecione uma opção</option>
        <template v-for="cat in categories">
          <option
            v-if="cat.status == 'active'"
            v-bind:value="cat.id"
            v-bind:key="cat.id"
          >{{ cat.name }}</option>
        </template>
      </select>
      <div class="errorDiv" v-if="error != ''">
        <span>{{ error }}</span>
      </div>
      <div id="btnSalvar">
        <button @click="verifyFields()">Salvar</button>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../services/api";
import Header from "../components/DashboardHeader.vue";
import * as yup from "yup";

export default {
  data() {
    return {
      name: "",
      category: "none",
      categories: [],
      error: "",
      token: ""
    };
  },
  methods: {
    async getCategories() {
      await api
        .get("/categories")
        .then(res => (this.categories = res.data.data));
    },

    async newProduct() {
      const credentials = {
        name: this.name,
        categoryId: this.category
      };

      await api
        .post("/products", credentials, {
          headers: { Authorization: "Bearer " + this.token }
        })
        .then(() => {
          this.$router.push("/dashboard");
        })
        .catch(({ response }) => {
          if (
            response.data.message ==
            '"categoryId" failed custom validation because must be Object Id'
          ) {
            this.error = "Problema no backend em relação a categorias";
          }
        });
    },

    async isLogged() {
      const token = await localStorage.getItem("UserToken");
      token == null ? this.$router.push("/") : (this.token = token);
    },

    verifyFields() {
      if (this.category == "none") {
        this.error = "Selecione uma categoria";
        return;
      }

      schema
        .validate({
          name: this.name
        })
        .then(() => this.newProduct())
        .catch(err => (this.error = err.message));
    }
  },
  async mounted() {
    this.isLogged();
    this.getCategories();
  },
  components: {
    "dashboard-header": Header
  }
};

const schema = yup.object().shape({
  name: yup.string().required("Campo nome requerido")
});
</script>

<style scoped>
h3 {
  color: #666970;
}

input {
  color: #e7e7e7;
  background: transparent;
  border: none;
  border-bottom: 1px solid #e7e7e7;
  padding-top: 10px;
  padding-bottom: 5px;
  margin-top: 10px;
  width: 100%;
}

select {
  color: #e7e7e7;
  background: transparent;
  border: none;
  border-bottom: 1px solid #e7e7e7;
  padding-top: 10px;
  padding-bottom: 5px;
  margin-top: 10px;
  width: 100%;
}

option {
  background-color: #333;
  border: none;
}

.container div {
  min-width: 65%;
}

#btnSalvar {
  width: 100%;
  margin-top: 20px;
  text-align: center;
}

#btnSalvar button {
  padding: 10px 30px;
  background: linear-gradient(to right, #067bd9, #1c96b6);
  border: none;
  color: #fff;
  font-weight: bold;
  border-radius: 10px;
  cursor: pointer;
}

.errorDiv {
  padding: 5px 20px;
  width: 100%;
  text-align: center;
  margin: 10px 0px;
}

.errorDiv span {
  color: #dc3545 !important;
  font-size: 15px;
}

.icon {
  color: #fff;
  cursor: pointer;
}
</style>
