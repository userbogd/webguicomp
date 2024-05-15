<template>
  <q-card flat class="card">
    <q-card-section>
      <div class="text-h6">SNTP</div>
    </q-card-section>
    <q-card-section class="q-pt-none">
      <div class="q-pa-md">
        <div class="q-gutter-md q-pa-none q-pb-none">
          <q-toggle v-model="data.sntp_enab" label="Eanble SNTP" />
          <q-input v-model="data.sntp_serv1" label="SNTP server 1:" />
          <q-input v-model="data.sntp_serv2" label="SNTP server 2:" />
          <q-input v-model="data.sntp_serv3" label="SNTP server 3:" />
        </div>
      </div>
    </q-card-section>
    <q-card-section class="q-pt-none">
      <div class="q-pa-md">
        <q-btn flat class="btn" label="Set time from system" @click="SetTimeFromSystem"></q-btn>
      </div>
    </q-card-section>
    <q-card-section class="q-pt-none">
      <div class="row">
        <div class="q-pa-md col-6"><q-input v-model="data.lat" label="Latitude" /></div>
        <div class="q-pa-md col-6"><q-input v-model="data.lon" label="Longitude" /></div>
      </div>
    </q-card-section>
    <CardActions :senddata="data"></CardActions>
  </q-card>
</template>

<script setup>
import { reactive, computed } from "vue";
import { PostData } from "components/webguicomp/network";
import CardActions from "components/webguicomp/CardActions.vue"
//const timestr = reactive(new Date().toISOString().replace("T", " ").substring(0, 19));

function SetTimeFromSystem() {
  let time = Math.floor(new Date() / 1000);
  PostData({ time_set: time }, 1, 0);
}

const init = {
  sntp_serv1: "",
  sntp_serv2: "",
  sntp_serv3: "",
  sntp_enab: false,
  lat: 0,
  lon: 0
}

const data = reactive(init);
PostData(data, 2, 0, null);
</script>
