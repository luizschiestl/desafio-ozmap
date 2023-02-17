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
                    class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Idade
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  ></th>
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
                    <div class="text-sm text-center text-gray-900">
                      {{ user.idade }}
                    </div>
                  </td>
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm font-medium"
                    @click="() => openDialog(user)"
                  >
                    <button class="text-indigo-600 hover:text-indigo-900">
                      Editar
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="w-full flex justify-end items-center p-2 gap-2">
              <button
                class="disabled:bg-blue-200 disabled:select-none bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                @click="openDialog"
              >
                Criar
              </button>
              <button
                class="disabled:bg-blue-200 disabled:select-none bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                :disabled="!response.hasPrev"
                @click="
                  () => loadUsers({ page: response.currentPage + 1 })
                "
              >
                Anterior
              </button>
              <button
                class="disabled:bg-blue-200 disabled:select-none bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
  <UserDetail
    v-model:show="dialogOpen"
    v-bind:user="currentUser"
    :close="closeDialog"
  />
</template>

<script lang="ts">
import { getAllUsers } from '@/services/userService';
import { UsersResultType, UserType } from '@/types/UserType';
import { defineComponent } from 'vue';
import UserDetail from './UserDetail.vue';

export default defineComponent({
  data() {
    return {
      response: {} as UsersResultType,
      dialogOpen: false,
      currentUser: {} as UserType | undefined,
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
    openDialog(user?: UserType) {
      this.dialogOpen = true;
      this.currentUser = user;
    },
    closeDialog() {
      this.dialogOpen = false;
      this.currentUser = undefined;
      this.loadUsers({ page: this.response.currentPage });
    },
  },
  components: { UserDetail },
});
</script>
