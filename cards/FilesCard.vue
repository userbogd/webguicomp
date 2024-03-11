<template>
  <q-card flat class="card">
    <q-card-section>
      <div class="text-h6">Home</div>
    </q-card-section>
    <q-card-section class="q-pt-none">
      <div class="q-pa-md">
        <q-table title="File system" :rows="data.file_list" :columns="columns" row-key="name" />
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { computed, onUnmounted, reactive, onMounted } from "vue";
import { PostData } from "components/webguicomp//network";
import { secondsToHms } from "components/webguicomp/helpers"

const columns = [
  {
    name: 'fname',
    required: true,
    label: 'File name',
    align: 'left',
    field: 'name',
    sortable: true
  },
  { name: 'ftype', label: 'File type', field: 'type', sortable: true },
  { name: 'fsize', label: 'Size ', field: 'size' }
]

defineOptions({
  name: 'FilesCard'
})

const init_list = [
  {
    name: '',
    type: '',
    size: '',

  }
]

const init = {
  file_list: [init_list]
}
const data = reactive(init);

PostData(data, 2, 0, null);
</script>
