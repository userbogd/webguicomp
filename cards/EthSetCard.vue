<template>
  <q-card flat class="card" v-show="data.eth_visible">
    <q-card-section>
      <div class="text-h6">ETHERNET</div>
    </q-card-section>
    <q-card-section class="q-pt-none">
      <div class="q-pa-md">
        <div class="q-gutter-md q-pa-none q-pb-none">
          <q-toggle v-model="data.eth_enab" label="Ethernet enable" />
          <q-input v-model="data.eth_ip" label="IP address:" />
          <q-input v-model="data.eth_mask" label="Subnet mask:" />
          <q-input v-model="data.eth_gw" label="Gateway address:" />
          <q-toggle v-model="data.eth_isdhcp" label="DHCP enabled"></q-toggle>
          <q-input v-model="data.eth_dns1" label="DNS1:" />
          <q-input v-model="data.eth_dns2" label="DNS2:" />
          <q-input v-model="data.eth_dns3" label="DNS3:" />
          <q-input v-model="data.eth_mac" label="MAC:" />
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

defineOptions({
  name: 'EthSetCard'
})

const init = {
  eth_visible: false,
  eth_enab: true, eth_isdhcp: true, eth_ip: "", eth_mask: "",
  eth_gw: "", eth_dns1: "", eth_dns2: "", eth_dns3: "", eth_mac: ""
}
const data = reactive(init);
PostData(data, 2, 0, null);
</script>
