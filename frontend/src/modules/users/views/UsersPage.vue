<template>
  <div>
    <div class="action-block">
      <Input
        v-model="searchQuery"
        placeholder="Поиск..."
      />
      <Button
        type="submit"
        text="Добавить пользователя"
        :onClick="openModal"
        buttonType="primary"
      />
    </div>
    <ReusableTable
    :columns="columns"
    :rows="users"
    :loading="isLoading"
  >
    <template #cell-actions="{ row }">
      <div class="actions">
        <Button
          :isLoading="false"
          :onClick="() => onEdit(row)"
          buttonType="outlined"
          class="icons"
        >
          <font-awesome-icon icon="edit" />
        </Button>
        <Button
          :isLoading="false"
          :onClick="() => handleDeleteUser(row)"
          buttonType="outlined"
          class="icons"
        >
          <font-awesome-icon icon="trash" />
        </Button>
      </div>
    </template>

    <template #cell-role="{ value }">
      <StatusBadge :value="value" type="value" />
    </template>
  </ReusableTable>
  </div>
  <Modal :isOpen="isModalOpen" :title="
  isEditMode? 'Изменить пользователя' :'Добавить пользователя'
  "
  @close="closeModal">
      <CreateUserForm @submit="handleUserSubmit" :initialData="user">
        <template #footer>
          <div class="form-actions">
            <Button
              type="button"
              text="Отмена"
              :onClick="closeModal"
              buttonType="secondary"
            />
            <Button
              type="submit"
              :text="isEditMode? 'Изменить' :'Создать'"
              :isLoading="isLoading"
              :onClick="() => {}"
              buttonType="primary"
            />
          </div>
        </template>
      </CreateUserForm>
    </Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ReusableTable from '../../../components/ReusableTable.vue';
import { useUser } from '../composables/useUser';
import Modal from '../../../components/Modal.vue';
import CreateUserForm from '../components/CreateUserForm.vue'
import Input from '../../../components/Input.vue';
import Button from '../../../components/Button.vue';
import StatusBadge from '../../../components/StatusBadge.vue';

export default defineComponent({
  name: 'UsersPage',
  components: {
    ReusableTable,
    Button,
    Input,
    StatusBadge,
    Modal, 
    CreateUserForm, 
  },
  setup() {
    const {
      columns,
      user,
      users,
      isLoading,
      error,
      handleUserSubmit,
      handleDeleteUser,
      isModalOpen,
      openModal,
      closeModal,
      onEdit,
      isEditMode,
      searchQuery
    } =useUser()
    return {
      columns,
      user,
      users,
      isLoading,
      error,
      handleUserSubmit,
      handleDeleteUser,
      isModalOpen,
      openModal,
      closeModal,
      onEdit,
      isEditMode,
      searchQuery
    };
  }
});
</script>

<style scoped>
.form-actions{
  display: flex;
  justify-content: space-between;
  gap: 10px;
  > button {
    width: 100%;
  }
}
.action-block{
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 20px;
  }
  .icons{
    padding: 10px 13px
  }
  .actions{
    display: flex;
    gap: 10px
  }

</style>