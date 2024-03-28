<template>
  <q-card flat class="card">
    <q-card-section>
      <div class="text-h6">FILES</div>
    </q-card-section>
    <q-card-section class="q-pt-none">
      <div class="q-pa-none">
        <q-table :rows="data.file_list" :columns="columns" row-key="name" selection="single" v-model:selected="selected"
          :flat="true" :bordered="false" :rows-per-page-options="[10, 20, 30, 0]" />
      </div>
      <div class="q-pa-md">
        <div><q-file v-model="file" label="Select file to upload" /></div>
      </div>
      <div class="q-pa-md">
        <q-btn class="btn q-ma-xs" flat label="DOWNLOAD" @click="DownloadFile"></q-btn>
        <q-btn class="btn q-ma-xs" flat label="UPLOAD" @click="UploadFile"></q-btn>
        <q-btn class="btn q-ma-xs" flat label="DELETE" @click="DeleteFile"></q-btn>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { computed, onUnmounted, reactive, onMounted, ref } from "vue";
import { GetBlockObject, PutBlockObject, PostData } from "components/webguicomp//network";
import { useQuasar, Dialog } from 'quasar';
const $q = useQuasar();

const columns = [
  { name: 'fname', required: true, label: 'File name', align: 'left', field: 'name', sortable: true },
  { name: 'fsize', label: 'Size ', align: 'left', field: 'size' }
]

defineOptions({
  name: 'FilesCard'
})

const BLOCK_SIZE = 5120;
const init_list = [
  {
    sel: false,
    name: '',
    size: '',
  }
]

async function SaveFile(data, fn) {
  let blobData = new Blob([data]);
  let url = window.URL.createObjectURL(blobData);
  let a = document.createElement("a");
  a.style = "display: none";
  document.body.appendChild(a);
  a.href = url;
  a.download = fn;
  a.click();
  window.URL.revokeObjectURL(urlFile);
  a.remove();
}

async function DownloadFile() {
  if (selected.value[0]) {
    const buf = new Uint8Array(selected.value[0].size);
    //await ReveiveFileChunks(buf);
    await GetBlockObject('file_block', selected.value[0].name, selected.value[0].size, buf, true);
    SaveFile(buf, selected.value[0].name);
  }
}

async function SendFile(buf) {
  await PutBlockObject('file_block', file.value.name, file.value.size, buf, true);
  PostData(data, 2, 0, null);
}

function UploadFile() {
  const reader = new FileReader();
  reader.onload = () => {
    console.log(`File "${file.value.name}" with size ${file.value.size} byte`);
    if (reader.result.byteLength == 0)
      return;
    SendFile(reader.result);
  }
  reader.readAsArrayBuffer(file.value);
}

function DeleteFile() {
  if (selected.value[0]) {
    $q.dialog({
      title: 'Confirm delete file',
      message: `Are you really wan to delete file "${selected.value[0].name}"?`,
      cancel: true,
      persistent: true
    }).onOk(() => {
      const dialog = Dialog.create({ message: `Deleting file "${selected.value[0].name}"...`, progress: true, persistent: true, ok: false, style: 'border: none; box-shadow: none;' })

      PostData({
        file_block: {
          opertype: 2,
          part: 0,
          parts: 1,
          mem_object: selected.value[0].name,
          size: 0
        }
      }, 1, 0, () => { PostData(data, 2, 0, () => { dialog.hide(); }) })
    })
  }
}


const init = {
  file_list: [init_list]
}

const data = reactive(init);
const selected = ref([]);
const file = ref(null);

PostData(data, 2, 0, null);
</script>
