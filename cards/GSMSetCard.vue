<template>
  <q-card flat bordered class="card" v-show="data.gsm_visible">
    <q-card-section>
      <div class="text-h6">GPRS MODEM</div>
    </q-card-section>
    <q-card-section class="q-pt-none">
      <div class="q-pa-md">
        <div class="q-gutter-md q-pa-none q-pb-none">
          <q-toggle v-model="data.gsm_enab" label="GSM enable" />
          <div>Module type: {{ data.gsm_module }}</div>
          <div>Provider name: {{ data.gsm_operator }}</div>
          <div>IMEI: {{ data.gsm_imei }}</div>
          <div>IMSI: {{ data.gsm_imsi }}</div>
          <div>IP: {{ data.gsm_ip }}</div>
          <div>Subnet mask: {{ data.gsm_mask }}</div>
          <div>Gateway: {{ data.gsm_gw }}</div>
          <div>DNS1: {{ data.gsm_dns1 }}</div>
          <div>DNS2: {{ data.gsm_dns2 }}</div>
          <div>DNS3: {{ data.gsm_dns3 }}</div>
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
  gsm_visible: false,
  gsm_enab: false,
  gsm_module: '',
  gsm_operator: '',
  gsm_imei: '',
  gsm_imsi: '',
  gsm_ip: '',
  gsm_mask: '',
  gsm_gw: '',
  gsm_dns1: '',
  gsm_dns2: '',
  gsm_dns3: '',
}
const data = reactive(init);
PostData(data, 2, 0, null);
</script>
