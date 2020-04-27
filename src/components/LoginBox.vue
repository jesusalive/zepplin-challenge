<template>
  <div id="login-box" class="bg-darker">
    <h2>Zepplin</h2>
    <div>
      <div id="form-div">
        <label for="email">Email</label>
        <br />
        <input
          type="text"
          v-model="email"
          id="email"
          placeholder="email@dominio.com.br"
        />
      </div>
      <div id="form-div">
        <label for="password">Senha</label>
        <br />
        <input
          type="password"
          v-model="password"
          id="password"
          placeholder="********"
        />
      </div>
      <div class="errorDiv" v-if="error != ''">
        <span style="color: #fff">{{ error }}</span>
      </div>
      <button @click="checkFields">ENTRAR</button>
      <span>esqueci minha senha</span>
      <div class="qrCode">
        <span>logar com QR Code</span>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../services/api";
import * as yup from "yup";

export default {
  name: "LoginBox",
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    signIn() {
      const credentials = {
        email: this.email,
        password: this.password,
      };

      api
        .post("/auth/master-users", credentials)
        .then((res) => {
          console.log(res);
        })
        .catch(({ response }) => {
          switch (response.data.message) {
            case "Invalid email":
              this.error = "Email não encontrado";
              break;
            case "Invalid password":
              this.error = "Senha incorreta";
              break;
            default:
              this.error = "Houve um erro inesperdo, tente novamente";
              break;
          }
        });
    },

    checkFields() {
      schema
        .validate({
          email: this.email,
          password: this.password,
        })
        .then(() => this.signIn())
        .catch((err) => (this.error = err.message));
    },
  },
};

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Digite um email válido")
    .required("Campo email requerido"),
  password: yup
    .string()
    .required("Campo senha requerido")
    .min(8, "A senha deve ter no mínimo 8 caracteres"),
});
</script>

<style scoped>
#login-box {
  padding: 20px 70px;
  text-align: center;
  max-width: 300px;
}

#login-box h2 {
  color: #e0e0e0;
  font-size: 2rem;
}

#login-box span {
  color: #e0e0e0;
  font-size: 0.7rem;
  margin-top: 5px;
}

button {
  background-color: #b8b8b8;
  cursor: pointer;
  color: #6f8bc5;
  font-weight: bold;
  border: none;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
  width: 100%;
  transition: all 200ms;
}

button:hover {
  background: transparent;
  border: 1px solid #b8b8b8;
  color: #b8b8b8;
}

#form-div {
  text-align: left;
  margin-bottom: 15px;
}

#form-div label {
  color: #e7e7e7;
  font-size: 0.8rem;
}

#form-div input {
  color: #e7e7e7;
  background: transparent;
  border: none;
  border-bottom: 1px solid #e7e7e7;
  padding-top: 10px;
  padding-bottom: 5px;
  margin-top: 10px;
  width: 100%;
}

#form-div input::placeholder {
  font-size: 1rem;
}

#form-div input:focus {
  border: none;
}

.qrCode {
  padding: 20px;
}

.errorDiv {
  padding: 5px 20px;
}

.errorDiv span {
  color: #dc3545 !important;
}

@media (min-width: 700px) {
  #login-box {
    width: 300px;
  }
}
</style>
