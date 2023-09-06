<template>
  <q-card flat class="card">
    <q-card-section>
      <div class="text-h6">FIRMWARE</div>
    </q-card-section>
    <q-card-section class="q-pt-none">
      <div class="q-pa-md">
        <div class="q-gutter-md q-pa-none q-pb-none">
          <q-toggle v-model="data.ota_enab" label="Eanble OTA autoudate" />
          <q-toggle v-model="data.res_ota_enab" label="Enable reset after update" />
          <q-input v-model="data.ota_url" label="OTA firmware file URL" />
          <q-input type="number" v-model="data.ota_auto_int" label="New firmware check interval, sec" />
          <div>Current firmware version: {{ data.fw_rev }}</div>
          <div>Available firmware version: {{ data.ota_newver }}</div>
          <div>Firmware status: <span v-html="data.ota_state"></span></div>
          <q-btn flat class="btn" label="Update manual" @click="CheckFirmware"></q-btn>
        </div>
      </div>
    </q-card-section>
    <CardActions :senddata="data"></CardActions>
  </q-card>
</template>

<script setup>
import { reactive, onUnmounted } from "vue";
import { PostData } from "components/webguicomp/network";
import CardActions from "components/webguicomp/CardActions.vue"

defineOptions({
  name: 'FirmwareCard'
})

const init = {
  ota_enab: false, res_ota_enab: false, ota_url: '',
  ota_auto_int: 0, fw_rev: '', ota_newver: '', ota_state: ''
}
const data = reactive(init);

let intervalId;
function CheckFirmware() {
  PostData({ ota_url: data.ota_url, ota_start: 1 }, 2, 0, null);
  intervalId = setInterval(() => {
    PostData(data, 2, 0, null);
  }, 1000)
}
onUnmounted(() => clearInterval(intervalId));
PostData(data, 2, 0, null);
</script>
