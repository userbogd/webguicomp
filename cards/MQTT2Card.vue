<template>
  <q-card flat bordered class="card">
    <q-card-section>
      <div class="text-h6">MQTT 2</div>
    </q-card-section>
    <q-card-section class="q-pt-none">
      <div class="q-pa-md">
        <div class="q-gutter-md q-pa-none q-pb-none">
          <q-toggle v-model="data.mqtt_2_enab" label="Eanble MQTT 2" />
          <q-input v-model="data.mqtt_2_serv" label="MQTT broker URL	" />
          <q-input type="number" v-model="data.mqtt_2_port" label="MQTT broker port	" />
          <q-input v-model="data.mqtt_2_syst" label="Global system name	" />
          <q-input v-model="data.mqtt_2_group" label="Group name	" />
          <q-input v-model="data.mqtt_2_clid" label="Device ID prefix" />
          <q-input v-model="data.mqtt_2_uname" label="Login" />
          <q-input type="password" v-model="data.mqtt_2_pass" label="Password" />
          <q-btn label="Test MQTT" @click="PostData({ mqtt_2_test: '' }, 1, 0)"></q-btn>
        </div>
      </div>
    </q-card-section>
    <CardActions :senddata="data"></CardActions>
  </q-card>
</template>

<script setup>
import { reactive } from "vue";
import { PostData } from "components/webguicomp//network";
import CardActions from "components/webguicomp/CardActions.vue"

const init = {
  mqtt_2_enab: false,
  mqtt_2_serv: "",
  mqtt_2_port: 1000,
  mqtt_2_syst: "",
  mqtt_2_group: "",
  mqtt_2_clid: "",
  mqtt_2_uname: "",
  mqtt_2_pass: ""
}

const data = reactive(init);
PostData(data, 2, 0, null);
</script>
