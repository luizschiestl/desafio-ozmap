<template>
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col mt-4">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div
          class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
        >
          <div
            class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
          >
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Nome
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Nome Completo
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Idade
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr
                  v-for="user in response.rows"
                  :key="user.id"
                >
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">
                      {{ user.nome }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">
                      {{ user.email }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">
                      {{ user.nomeCompleto }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">
                      {{ user.idade }}
                    </div>
                  </td>
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm font-medium"
                  >
                    <button
                      class="text-indigo-600 hover:text-indigo-900"
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="w-full flex justify-end items-center p-2">
              <button
                class="rounded-lg bg-slate-300 text-base font-bold uppercase p-3"
                :disabled="!response.hasPrev"
                @click="
                  () => loadUsers({ page: response.currentPage + 1 })
                "
              >
                Anterior
              </button>
              <button
                class="rounded-lg bg-slate-300 text-base font-bold uppercase p-3"
                :disabled="!response.hasNext"
                @click="
                  () => loadUsers({ page: response.currentPage + 1 })
                "
              >
                Próxima
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getAllUsers } from '@/services/userService';
import { UsersResultType } from '@/types/UserType';
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      response: {} as UsersResultType,
    };
  },
  computed: {},
  mounted() {
    this.loadUsers();
  },
  methods: {
    async loadUsers(options?: { limit?: number; page?: number }) {
      try {
        const response = await getAllUsers(options);
        this.response = response.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
</script>
