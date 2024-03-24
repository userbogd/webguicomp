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
import { PostData } from "components/webguicomp//network";
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

function ReceiveChunk(cur, total, chunk) {
  let foper;
  if (total == 1) foper = 3;
  else if (cur == 0) foper = 1;
  else if (cur == (total - 1)) foper = 2;
  else foper = 0;
  let data = {
    raw_data: {
      opertype: 1,
      operphase: foper,
      mem_object: selected.value[0].name,
      size: BLOCK_SIZE,
      dat: ''
    }
  };
  return new Promise((resolve, reject) => {
    console.log(`Receive chunk ${cur} from ${total}`)
    PostData(data, 1, 0, () => resolve(data))
  })
}

function base64ToArrayBuffer(base64) {
  var binaryString = atob(base64);
  var bytes = new Uint8Array(binaryString.length);
  for (var i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function ReveiveFileChunks(buf) {
  let chunksnum = Math.floor(selected.value[0].size / BLOCK_SIZE);
  if (selected.value[0].size % BLOCK_SIZE)
    chunksnum++;
  console.log(`Found ${chunksnum} blocks in file ${selected.value[0].name}`)
  let i;
  let chunk, resp;
  const dialog = Dialog.create({ message: 'Downloaded 0%', progress: true, persistent: true, ok: false, style: 'border: none; box-shadow: none;' })
  for (i = 0; i < chunksnum; i++) {
    resp = await ReceiveChunk(i, chunksnum, chunk);
    let decoded = base64ToArrayBuffer(resp.raw_data.dat);
    for (let k = 0; k < decoded.byteLength; k++)
      buf[i * BLOCK_SIZE + k] = decoded[k];
    dialog.update({ message: `Downloaded ${Math.floor(i * 100 / chunksnum)}%` })
  }
  dialog.hide();
}

async function DownloadFile() {
  if (selected.value[0]) {
    const buf = new Uint8Array(selected.value[0].size);
    await ReveiveFileChunks(buf);
    SaveFile(buf, selected.value[0].name);
  }
}

function ToBase64(bytes) {
  var binary = '';
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

function SendChunk(cur, total, reader) {
  return new Promise((resolve, reject) => {
    let arr;
    if (cur == (total - 1))
      arr = new Uint8Array(reader.result, cur * BLOCK_SIZE);
    else
      arr = new Uint8Array(reader.result, cur * BLOCK_SIZE, BLOCK_SIZE);
    let encode = ToBase64(arr);
    let length = encode.length;

    let foper;
    if (total == 1) foper = 3;
    else if (cur == 0) foper = 1;
    else if (cur == (total - 1)) foper = 2;
    else foper = 0;

    let data = {
      raw_data: {
        opertype: 3,
        operphase: foper,
        mem_object: file.value.name,
        size: length,
        dat: encode
      }
    };

    console.log(`Send chunk ${cur} from ${total} length ${arr.byteLength}`)
    PostData(data, 1, 0, () => resolve())
  })
}

async function SendFileChunks(reader) {
  let chunksnum = Math.floor(reader.result.byteLength / BLOCK_SIZE);
  if (reader.result.byteLength % BLOCK_SIZE)
    chunksnum++;
  console.log(`Found ${chunksnum} blocks in file`)
  let i;
  const dialog = Dialog.create({ message: 'Uploaded 0%', progress: true, persistent: true, ok: false, style: 'border: none; box-shadow: none;' })
  for (i = 0; i < chunksnum; i++) {
    await SendChunk(i, chunksnum, reader);
    dialog.update({ message: `Uploaded ${Math.floor(i * 100 / chunksnum)}%` })
  }
  dialog.update({ message: 'Done.Refreshing file list...' });
  PostData(data, 2, 0, () => { dialog.hide() });
}

function UploadFile() {
  const reader = new FileReader();
  reader.onload = () => {
    console.log(`File "${file.value.name}" with size ${file.value.size} byte`);
    if (reader.result.byteLength == 0)
      return;
    SendFileChunks(reader);
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
      const dialog = Dialog.create({ message: 'Waiting for delete finished...', progress: true, persistent: true, ok: false, style: 'border: none; box-shadow: none;' })

      PostData({
        raw_data: {
          opertype: 2,
          operphase: 3,
          mem_object: selected.value[0].name,
          offset: 0,
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
