<template>
  <div class="container bg-veryDark">
    <dashboard-header />
    <div id="centerBox">
      <div id="products_title" class="justify-content-between">
        <span>PRODUTOS</span>
        <button @click="createNew()">+</button>
      </div>
      <div v-if="loading">
        <span>Carregando...</span>
      </div>
      <div v-if="!loading">
        <table>
          <thead>
            <th width="60%">Nome</th>
            <th width="20%">Categoria</th>
            <th width="20%"></th>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id">
              <td v-bind:class="{ inactive: product.status == 'inactive' }">
                {{ product.name }}
              </td>
              <td v-bind:class="{ inactive: product.status == 'inactive' }">
                {{ product.category.name }}
              </td>
              <td>
                <a @click="editProduct(product.id)" class="icon">
                  <font-awesome-icon icon="edit" />
                </a>
                <a @click="removeProduct(product.id)" class="icon">
                  <font-awesome-icon icon="window-close" />
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../services/api";
import Header from "../components/DashboardHeader.vue";

export default {
  data() {
    return {
      products: [],
      loading: true,
      token: "",
    };
  },
  methods: {
    async isLogged() {
      const token = await localStorage.getItem("UserToken");
      token == null ? this.$router.push("/") : (this.token = token);
    },

    async getProducts() {
      await api.get("/products").then((res) => {
        this.loading = false;
        this.products = res.data.data;
      });
    },

    createNew() {
      this.$router.push("/create");
    },

    async removeProduct(id) {
      await api
        .delete("/products/" + id, {
          headers: { Authorization: "Bearer " + this.token },
        })
        .then(() => this.getProducts());
    },

    editProduct(productId) {
      this.$router.push("/edit/" + productId);
    },
  },
  components: {
    "dashboard-header": Header,
  },
  mounted() {
    this.isLogged();
    this.getProducts();
  },
};
</script>

<style>
a {
  cursor: pointer;
}

table,
th,
td {
  border-collapse: collapse;
  text-align: left;
}

td {
  padding: 15px 0px;
}

tr:nth-child(odd) {
  background: #18191d;
}
tr:nth-child(even) {
  background: #17181c;
}

.bg-veryDark {
  background-color: #17181c;
}

#centerBox {
  color: #666970;
  min-width: 85%;
}

#centerBox div {
  margin-top: 30px;
}

#centerBox table {
  width: 100%;
}

.justify-content-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#products_title button {
  border: none;
  background: linear-gradient(to right, #067bd9, #1c96b6);
  padding: 0px 20px;
  color: #fff;
  font-size: 35px;
  border-radius: 20px;
  cursor: pointer;
}

.icon {
  margin-right: 10px;
}

.inactive {
  opacity: 0.3;
}
</style>
