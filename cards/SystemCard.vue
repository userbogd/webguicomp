<template>
  <q-card flat class="card">
    <q-card-section>
      <div class="text-h6">SYSTEM</div>
    </q-card-section>
    <q-card-section class="q-pt-none">
      <div class="q-pa-md">
        <div class="q-gutter-md q-pa-none q-pb-none">
          <q-input v-model="data.net_bios_name" label="Device bios name" />
          <q-input v-model="data.sys_name" label="User name" />
          <q-input type="password" v-model="data.sys_pass" label="User password" />
          <q-select v-model="colormodestr" :options="colorschemes" :map-options="true" :emit-value="true"
            label="Color scheme"></q-select>
          <div>Device model: {{ data.model_name }}</div>
          <div>Hardware revision: {{ data.hw_rev }}</div>
          <div>Firmware version: {{ data.fw_rev }}</div>
          <div>IDF version: {{ data.idf_rev }}</div>
          <div>Build date: {{ data.build_date }}</div>
          <div>Serial number: {{ data.ser_num }}</div>
        </div>
      </div>
    </q-card-section>
    <CardActions :senddata="data"></CardActions>
  </q-card>
</template>

<style>
.clerr .clwarn .clok {
  font-weight: bold;
}

.clerr {
  color: #b00000;
}

.clwarn {
  color: #b0b000;
}

.clok {
  color: #00b000;
}
</style>

<script setup>
import { reactive, computed } from "vue";
import { PostData } from "components/webguicomp/network"
import CardActions from "components/webguicomp/CardActions.vue"

defineOptions({
  name: 'SystemCard'
})
const init = {
  net_bios_name: "", sys_name: "", sys_pass: "", color_scheme: 1,
  model_name: "", hw_rev: 0, fw_rev: "", idf_rev: "", build_date: "", ser_num: ""
}
const colorschemes = [
  { label: 'Light', value: '1' },
  { label: 'Dark', value: '2' }];

const colormodestr = computed({
  get() { return (data.color_scheme).toString() },
  set(val) { data.color_scheme = Number(val); }
})
const data = reactive(init);
PostData(data, 2, 0, null);
</script>
