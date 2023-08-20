<template>
  <q-card flat bordered class="card">
    <q-card-section>
      <div class="text-h6">MQTT 1</div>
    </q-card-section>
    <q-card-section class="q-pt-none">
      <div class="q-pa-md">
        <div class="q-gutter-md q-pa-none q-pb-none">
          <q-toggle :dense="true" v-model="data.mqtt_1_enab" label="Eanble MQTT 1" />
          <q-input :dense="true" v-model="data.mqtt_1_serv" label="MQTT broker URL	" />
          <q-input :dense="true" v-model="data.mqtt_1_port" label="MQTT broker port	" />
          <q-input :dense="true" v-model="data.mqtt_1_syst" label="Global system name	" />
          <q-input :dense="true" v-model="data.mqtt_1_group" label="Group name	" />
          <q-input :dense="true" v-model="data.mqtt_1_clid" label="Device ID prefix" />
          <q-input :dense="true" v-model="data.mqtt_1_uname" label="Login" />
          <q-input :dense="true" v-model="data.mqtt_1_pass" label="Password" />
        </div>
      </div>
    </q-card-section>
    <CardActions :senddata="data"></CardActions>
  </q-card>
</template>

<script setup>
import { reactive } from "vue";
import { SendAndRequest } from "boot/network";
import CardActions from "components/webguicomp/CardActions.vue"


const init = {
  mqtt_1_enab: false,
  mqtt_1_serv: "",
  mqtt_1_port: 1000,
  mqtt_1_syst: "",
  mqtt_1_group: "",
  mqtt_1_clid: "",
  mqtt_1_uname: "",
  mqtt_1_pass: ""
}

const data = reactive(init);
SendAndRequest(data, 2, 0, 'mykey', false);
</script>
