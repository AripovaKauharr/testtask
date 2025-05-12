import { onMounted, ref, watch } from "vue";
import { fetchCalls } from "../service";
import { GetCalls, CallFilterParams, Pages } from "../types/details.types";

export function useDetails() {
  const calls = ref<GetCalls>(
  {
    data: [],
    page: 1, 
    total: 10,
    lastPage: 1
  }  
  );
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  
  const filters = ref<CallFilterParams & { page?: number; limit?: number }>({
    from: undefined,
    to: undefined,
    category: undefined,
    status: undefined,
    agentId: undefined,
    page: 1,    
    limit: 10     
  });

  const pagination = ref<Pages>({
    page: 1,
    lastPage: 1,
    total: 0
  });

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'caller_number', label: 'Номер звонящего' },
    { key: 'start_time', label: 'Время начала' },
    { key: 'duration', label: 'Длительность' },
    { key: 'status', label: 'Статус' },
    { key: 'category', label: 'Категория' },
    { key: 'agent_id', label: 'Оператор' }
  ];

  const loadCalls = async (params: Partial<CallFilterParams> = {}) => {
    try {
      isLoading.value = true;
      const queryParams = { ...filters.value, ...params };
      
      const response = await fetchCalls(queryParams);
      const {data, page, total, lastPage} = response
      calls.value.data = data;
      
      if (response) {

        pagination.value = {page, total, lastPage};
        
        filters.value.page = pagination.value.page;
      }
    } catch (err) {
      error.value = 'Ошибка при загрузке звонков';
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  };

  const handlePageChange = (page: number) => {
    if(!(page <= calls.value.lastPage && page < 1))
      filters.value.page = page;
      
      loadCalls();
  };

  watch(filters, (newVal) => {
    if (newVal.page === undefined || newVal.page === 1) {
      loadCalls(newVal);
    }
  }, { deep: true });

  const updateFilter = <K extends keyof CallFilterParams>(key: K, value: CallFilterParams[K]) => {
    filters.value = {
      ...filters.value,
      [key]: value,
      page: 1
    };
  };

  onMounted(() => {
    loadCalls();
  });

  return {
    columns,
    calls,
    isLoading,
    error,
    filters,
    pagination,
    updateFilter,
    loadCalls,
    handlePageChange
  };
}