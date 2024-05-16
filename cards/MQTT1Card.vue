<template>
  <q-card flat class="card">
    <q-card-section>
      <div class="text-h6">MQTT</div>
    </q-card-section>
    <q-card-section class="q-pt-none">
      <q-expansion-item :label="list_header(1)">
        <q-card flat bordered>
          <q-card-section class="q-pt-sm">
            <q-toggle v-model="data.mqtt_1_enab" label="Eanble MQTT" />
            <div class="row">
              <div class="col-8"><q-input v-model="data.mqtt_1_serv" label="MQTT broker URL" /></div>
              <div class="col-4 q-pl-sm"><q-input type="number" v-model="data.mqtt_1_port" label="Port" /></div>
            </div>
            <div><q-input v-model="data.mqtt_1_syst" label="Global system name" /></div>
            <div><q-input v-model="data.mqtt_1_group" label="Group name" /></div>
            <div><q-input v-model="data.mqtt_1_clid" label="Device ID" /></div>
            <div class="row">
              <div class="col-6"><q-input v-model="data.mqtt_1_uname" label="Login" /></div>
              <div class="col-6 q-pl-sm"><q-input type="password" v-model="data.mqtt_1_pass" label="Password" />
              </div>
            </div>
            <div class="q-pa-md">
              <q-btn flat class="btn" label="Test message" @click="PostData({ mqtt_1_test: '' }, 1, 0)"></q-btn>
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>
      <q-expansion-item :label="list_header(2)">
        <q-card flat bordered>
          <q-card-section class="q-pt-sm">
            <q-toggle v-model="data.mqtt_2_enab" label="Eanble MQTT" />
            <div class="row">
              <div class="col-8"><q-input v-model="data.mqtt_2_serv" label="MQTT broker URL" /></div>
              <div class="col-4 q-pl-sm"><q-input type="number" v-model="data.mqtt_2_port" label="Port" /></div>
            </div>
            <div><q-input v-model="data.mqtt_2_syst" label="Global system name" /></div>
            <div><q-input v-model="data.mqtt_2_group" label="Group name" /></div>
            <div><q-input v-model="data.mqtt_2_clid" label="Device ID" /></div>
            <div class="row">
              <div class="col-6"><q-input v-model="data.mqtt_2_uname" label="Login" /></div>
              <div class="col-6 q-pl-sm"><q-input type="password" v-model="data.mqtt_2_pass" label="Password" />
              </div>
            </div>
            <div class="q-pa-md">
              <q-btn flat class="btn" label="Test message" @click="PostData({ mqtt_2_test: '' }, 1, 0)"></q-btn>
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-card-section>
    <CardActions :senddata="data"></CardActions>
  </q-card>
</template>

<script setup>
import { reactive } from "vue";
import { PostData } from "components/webguicomp//network";
import CardActions from "components/webguicomp/CardActions.vue"

function list_header(rec) {
  var string = (rec == 1) ? data.mqtt_1_serv : data.mqtt_2_serv;
  var length = 20;
  var trimmedString = string.length > length ?
    string.substring(0, length - 3) + "..." :
    string;
  return `MQTT ${rec} [${trimmedString}]`;
}

const init = {
  mqtt_1_enab: false,
  mqtt_1_serv: "",
  mqtt_1_port: 1000,
  mqtt_1_syst: "",
  mqtt_1_group: "",
  mqtt_1_clid: "",
  mqtt_1_uname: "",
  mqtt_1_pass: "",
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
