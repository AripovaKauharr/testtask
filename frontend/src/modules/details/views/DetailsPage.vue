<template>
<div>
    <div class="filters">
      <Input
        v-model="filters.from"
        label="Дата от"
        placeholder="Выберите дату"
        type="date"
        @change="updateFilter('from', $event.target.value)"
      />
      <Input
        v-model="filters.to"
        label="Дата до"
        placeholder="Выберите дату"
        type="date"
        @change="updateFilter('to', $event.target.value)"
      />
      <Select
        v-model="filters.category"
        label="Категория"
        placeholder="Выберите категорию"
        :options="categoryOptions"
        @change="e => updateFilter('category', e.target.value)"
      />
      <Select
        v-model="filters.status"
        label="Статус"
        placeholder="Выберите статус"
        :options="statusOptions"
        @change="e => updateFilter('status', e.target.value )"
      />
    </div>

    <ReusableTable 
      :columns="columns" 
      :rows="calls?.data || []" 
      :loading="isLoading"
      :pagination="pagination"
      :onPageChange="handlePageChange"
    >
      <template #cell-status="{ value }">
        <StatusBadge :value="formatCallStatus(value)" :type="value" />
      </template>
      <template #cell-start_time="{ value }">
        <p>{{formatDate(value)}}</p>
      </template>
      <template #cell-duration="{ row }">
        <p>{{formatCallDuration(row.start_time, row.end_time)}}</p>
      </template>
    </ReusableTable>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ReusableTable from '../../../components/ReusableTable.vue';
import { useDetails } from '../composables/useDetails';
import StatusBadge from '../../../components/StatusBadge.vue';
import { formatCallStatus } from '../../../utils/formating';
import { formatDate } from '../../../utils/formatDate';
import { formatCallDuration } from '../../../utils/formatTimeToDuration';
import Input from '../../../components/Input.vue';
import Select from '../../../components/Select.vue';
import {categoryOptions, statusOptions} from '../../../data/filter.data'
export default defineComponent({
  name: 'DetailsPage',
  components: {
    ReusableTable,
    StatusBadge,
    Input,
    Select
  },
  setup() {
    const {
      columns,
      calls,
      isLoading,
      filters,
      error,
      updateFilter,
      pagination,
      handlePageChange
    } = useDetails()

    return {
      columns,
      calls,
      isLoading,
      error,
      filters,
      formatCallStatus,
      formatDate,
      formatCallDuration,
      categoryOptions,
      statusOptions,
      updateFilter,
      pagination,
      handlePageChange
    };
  }
});
</script>

<style scoped>
.filters{
  display: flex;
  gap: 10px
}
</style>