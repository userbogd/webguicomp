<template>
  <q-card flat class="card">
    <q-card-section>
      <div class="text-h6">WiFi</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <div class="q-pa-md">
        <div class="q-gutter-md q-pa-none q-pb-none">
          <q-toggle v-model="data.wifi_enab" label="WiFi enable" />
          <q-btn class="btn" flat label="Scan WiFi" @click="OpenScanDialog()"></q-btn>
          <q-select v-model="wifimodestr" :options="wifimodes" :map-options="true" :emit-value="true"
            label="WiFi mode"></q-select>
          <q-select v-model="apshutdown" :options="apdshuttime" :map-options="true" :emit-value="true"
            label="Disable AP after"></q-select>
          <q-input type="number" v-model="wifipwr"
            :rules="[val => val <= 20 && val > 0 || 'WiFi otput power range 0...20 dBm']" label="Max power, dBm" />
          <q-input v-model="data.wifi_ap_ssid" label="WiFi network name(AP):" />
          <q-input type="password" v-model="data.wifi_ap_key" label="WiFi network key(AP):" />
          <q-input v-model="data.wifi_ap_ip" label="IP address(AP):" />
          <q-input v-model="data.wifi_sta_ssid" label="WiFi network name(CLN):" />
          <q-input type="password" v-model="data.wifi_sta_key" label="WiFi network key(CLN):" />
          <q-toggle v-model="data.wifi_isdhcp" label="DHCP enabled"></q-toggle>
          <q-input v-model="data.wifi_sta_ip" label="IP address(CLN):" />
          <q-input v-model="data.wifi_sta_mask" label="Subnet mask(CLN):" />
          <q-input v-model="data.wifi_sta_gw" label="Gateway address(CLN):" />
          <q-input v-model="data.wifi_dns1" label="DNS1:" />
          <q-input v-model="data.wifi_dns2" label="DNS2:" />
          <q-input v-model="data.wifi_dns3" label="DNS3:" />
          <q-input v-model="data.wifi_sta_mac" label="MAC(CLN):" />
          <q-input v-model="data.wifi_ap_mac" label="MAC(AP):" />
        </div>
      </div>
    </q-card-section>
    <CardActions :senddata="data"></CardActions>
  </q-card>
</template>

<script setup>
import { computed, reactive } from "vue";
import { PostData } from "components/webguicomp/network";
import { useQuasar } from 'quasar'
import SelectWiFiDialog from 'components/webguicomp/SelectWiFiDialog.vue'
import CardActions from "components/webguicomp/CardActions.vue"

const $q = useQuasar();
defineOptions({
  name: 'WifiSetCard'
})

const init = {
  wifi_enab: true, wifi_mode: 1, wifi_power: 0, wifi_disab_time: 0, wifi_ap_ssid: "", wifi_ap_key: "",
  wifi_ap_ip: "", wifi_sta_ssid: "", wifi_sta_key: "", wifi_isdhcp: true, wifi_sta_ip: "",
  wifi_sta_mask: "", wifi_sta_gw: "", wifi_dns1: "", wifi_dns2: "", wifi_dns3: "",
  wifi_sta_mac: "", wifi_ap_mac: ""
}
const wifimodes = [
  { label: 'Station (STA)', value: '1' },
  { label: 'Access point (AP)', value: '2' },
  { label: 'Mixed mode (AP+STA)', value: '3' }];

const apdshuttime = [
  { label: '1 minute', value: '1' },
  { label: '5 minutes', value: '5' },
  { label: '10 minutes', value: '10' },
  { label: '30 minutes', value: '30' },
  { label: '60 minutes', value: '60' },
  { label: 'Never', value: '0' }];
const data = reactive(init);


const wifimodestr = computed({
  get() { return (data.wifi_mode).toString() },
  set(val) { data.wifi_mode = Number(val); }
})
const wifipwr = computed({
  get() { return (data.wifi_power) / 4 },
  set(val) { data.wifi_power = val * 4; }
})

const apshutdown = computed({
  get() { return (data.wifi_disab_time).toString() },
  set(val) { data.wifi_disab_time = Number(val); }
})

function OpenScanDialog() {
  $q.dialog({
    component: SelectWiFiDialog
  });
};

PostData(data, 2, 0, null);


</script>
