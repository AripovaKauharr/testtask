<template>
  <div class="table-container">
    <table class="table">
      <thead>
        <tr>
          <th v-for="column in columns" :key="column.key">
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
          <td v-for="column in columns" :key="column.key">
            <slot 
              :name="`cell-${column.key}`" 
              :value="row[column.key]" 
              :row="row"
              :column="column"
            >
              {{ row[column.key] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="loading" class="loading">Загрузка...</div>
    <div v-if="error" class="error">{{ error }}</div>
    
    <div v-if="!loading && !error && pagination" class="pagination">
      <Button 
        text="<"  
        @click="changePage(+currentPage - 1)" 
        :disabled="currentPage === 1"
      />

      <span class="page-info">
        {{ currentPage }} из {{ totalPages }}
      </span>
      <Button 
        text=">"  
        @click="changePage(+currentPage + 1)" 
        :disabled="currentPage === totalPages"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';
import { Pages } from '../modules/details/types/details.types';
import Button from './Button.vue';

interface Column {
  key: string;
  label: string;
}

export default defineComponent({
  name: 'ReusableTable',
  components: {
    Button
  },
  props: {
    columns: {
      type: Array as PropType<Column[]>,
      required: true
    },
    rows: {
      type: Array as PropType<any[]>,
      default: () => []
    },
    loading: Boolean,
    error: String,
    pagination: {
      type: Object as PropType<Pages>,
      default: null
    },
    onPageChange: {
      type: Function as PropType<(page: number) => void>,
      default: null
    }
  },
  setup(props) {
    const currentPage = computed(() => props.pagination?.page || 1);
    const totalPages = computed(() => props.pagination?.lastPage || 1);

    const changePage = (page: number) => {
      props.onPageChange(page)
    };

    return {
      currentPage,
      totalPages,
      changePage
    };
  }
});
</script>

<style scoped>
.table-container {
  overflow-x: auto;
  margin-bottom: 20px;
}
.table {
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff;
  border-radius: 8px;
}
th, td {
  padding: 12px 16px;
  text-align: left;
}
th {
  font-weight: 500;
}
.loading, .error {
  padding: 16px;
  text-align: center;
}
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 15px;
}
.pagination-button {
  padding: 8px 16px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
}
.pagination-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.page-info {
  font-size: 14px;
}
</style>