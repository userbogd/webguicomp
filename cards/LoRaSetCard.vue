<template>
  <q-card flat bordered class="card" v-show="data.lora_visible">
    <q-card-section>
      <div class="text-h6">LoRaWAN MODEM</div>
    </q-card-section>
    <q-card-section class="q-pt-none">
      <div class="q-pa-md">
        <div class="q-gutter-md q-pa-none q-pb-none">
          <q-toggle v-model="data.lora_enab" label="LoRaWAN enable" />
          <q-input v-model="data.lora_devid" label="Device ID" />
          <q-input v-model="data.lora_appid" label="Application ID" />
          <q-input v-model="data.lora_appkey" label="Application key" />
        </div>
      </div>
    </q-card-section>
    <CardActions :senddata="data"></CardActions>
  </q-card>
</template>

<script setup>
import { reactive } from "vue";
import { PostData } from "components/webguicomp/network";
import CardActions from "components/webguicomp/CardActions.vue"
const init = {
  lora_visible: false,
  lora_enab: false,
  lora_devid: '',
  lora_appid: '',
  lora_appkey: ''
}
const data = reactive(init);
PostData(data, 2, 0, null);
</script>
