<template>
  <div
    v-if="show"
    @click="close"
    class="fixed inset-0 z-10 flex items-center justify-center bg-slate-600 bg-opacity-20"
  >
    <div class="bg-white rounded-lg shadow-2xl p-8">
      <h2 class="text-xl font-medium mb-4">
        {{ user.id ? 'Editar Usuário' : 'Criar Usuário' }}
      </h2>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label
            class="block font-medium mb-2"
            for="nome"
            >Nome:</label
          >
          <input
            class="border border-gray-300 rounded-md p-2 w-full"
            type="text"
            id="nome"
            v-model="form.nome"
            required
          />
        </div>
        <div class="mb-4">
          <label
            class="block font-medium mb-2"
            for="nomeCompleto"
            >Nome Completo:</label
          >
          <input
            class="border border-gray-300 rounded-md p-2 w-full"
            type="text"
            id="nomeCompleto"
            v-model="form.nomeCompleto"
          />
        </div>
        <div class="mb-4">
          <label
            class="block font-medium mb-2"
            for="idade"
            >Idade:</label
          >
          <input
            class="border border-gray-300 rounded-md p-2 w-full"
            type="number"
            id="idade"
            v-model="form.idade"
            required
          />
        </div>
        <div class="mb-4">
          <label
            class="block font-medium mb-2"
            for="email"
            >Email:</label
          >
          <input
            class="border border-gray-300 rounded-md p-2 w-full"
            type="email"
            id="email"
            v-model="form.email"
            required
          />
        </div>
        <div class="flex justify-end">
          <button
            type="submit"
            class="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md py-2 px-4 mr-2"
          >
            {{ user.id ? 'Salvar' : 'Criar' }}
          </button>
          <button
            v-if="user.id"
            type="button"
            class="bg-red-500 hover:bg-red-600 text-white font-medium rounded-md py-2 px-4 mr-2"
            @click="handleDelete"
          >
            Remover
          </button>
          <button
            type="button"
            class="bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium rounded-md py-2 px-4"
            @click="close"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { UserType } from '@/types/UserType';
import { createUser, editUser, deleteUser } from '@/services/userService';

export default defineComponent({
  props: {
    user: {
      type: Object as PropType<UserType>,
      default: null,
    },
    show: {
      type: Boolean,
      required: true,
    },
    close: {
      type: Function,
      default: () => {
        return 0;
      },
    },
  },
  data() {
    return {
      form: this.user,
      closeAction: this.close,
    };
  },
  beforeUpdate() {
    this.form = this.user;
  },
  methods: {
    async handleSubmit() {
      try {
        if (this.user.id) {
          await editUser(this.user.nome, this.form);
        } else {
          await createUser(this.form);
        }
        this.closeAction();
      } catch (err) {
        console.error(err);
      }
    },
    async handleDelete() {
      try {
        await deleteUser(this.user.nome);
        this.closeAction();
      } catch (err) {
        console.error(err);
      }
    },
  },
});
</script>
