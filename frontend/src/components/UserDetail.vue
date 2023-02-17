<template>
  <form @submit.prevent="handleSubmit">
    <label>
      Nome:
      <input
        type="text"
        v-model="user.nome"
      />
    </label>
    <label>
      Email:
      <input
        type="email"
        v-model="user.email"
      />
    </label>
    <label>
      Nome Completo:
      <input
        type="text"
        v-model="user.nomeCompleto"
      />
    </label>
    <label>
      Idade:
      <input
        type="number"
        v-model="user.idade"
      />
    </label>
    <button type="submit">Salvar</button>
  </form>
</template>

<script lang="ts">
import { createUser, editUser } from '@/services/userService';
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    username: String,
  },
  data() {
    return {
      user: {
        nome: '',
        email: '',
        nomeCompleto: '',
        idade: 0,
      },
    };
  },
  methods: {
    async handleSubmit() {
      try {
        if (this.username) {
          const response = await editUser(this.username, this.user);
          console.log(response.data);
        } else {
          const response = await createUser(this.user);
          console.log(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
});
</script>
