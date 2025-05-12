  import { computed, onMounted, ref, watch } from "vue";
  import { createUser, deleteUser, fetchUsers, updateUser } from "../service";
  import { User } from "../types/user.types";
  import { debounce } from "lodash-es";
  export function useUser () {
    const isModalOpen = ref(false);
    const users = ref<any[]>([]);
    const searchQuery = ref('')
    const isLoading = ref(false);
    const error = ref<string | null>(null);
    const user = ref<User>({
      id: 0,
      userName: '',
      role: '',
      email: '',
      password: ''
    });
    const isEditMode = computed(() => Boolean(user.value?.id));
    const openModal = () => {
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
      user.value = {
        id: 0,
        userName: '',
        role: '',
        password: '',
        email: '',
      };
    };
    const columns = [
      { key: 'userName', label: 'Имя' },
      { key: 'email', label: 'email' },
      { key: 'role', label: 'Роль' },
      { key: 'actions', label: 'Действия' },
    ];
    const loadUsers = async () => {
      try {
        isLoading.value = true;
        users.value = await fetchUsers(searchQuery.value);
      } catch (err) {
        error.value = 'Ошибка при загрузке пользователей';
        console.error(err);
      } finally {
        isLoading.value = false;
      }
    };
  
    const debouncedSearch = debounce(async (query: string) => {
      await loadUsers();
    }, 300);
  
    watch(searchQuery, (newQuery) => {
      debouncedSearch(newQuery);
    });
  
    const handleCreateUser = async (userData: User) => {
      try {
        const {id, ...user} = userData
        await createUser(user);
        closeModal()
        await loadUsers();
      } catch (err) {
        error.value = 'Ошибка при создании пользователя';
        console.error(err);
      }
    };
    const handleUpdateUser = async (userData: User) => {
      await updateUser(userData)
      closeModal()
      await loadUsers();
    };
    const handleDeleteUser = async (userData: User) => {
      await deleteUser(userData)
      await loadUsers();
    };
    const handleUserSubmit = (userData: User) => {
      user.value.id 
        ? handleUpdateUser(userData) 
        : handleCreateUser(userData);
    };
    const onEdit = (userData: User) => {
      openModal()
      user.value = userData
    }
    onMounted(() => {
      loadUsers();
    });

    return {
      columns,
      user,
      users,
      isLoading,
      error,
      handleCreateUser,
      handleUpdateUser,
      handleDeleteUser,
      isModalOpen,
      openModal,
      closeModal,
      onEdit,
      handleUserSubmit,
      isEditMode,
      searchQuery
    }
  };