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
    <CardActions :senddata="data"></CardActions>
  </q-card>
</template>

<script setup>
import { reactive } from "vue";
import { PostData } from "components/webguicomp/network";
import CardActions from "components/webguicomp/CardActions.vue"


const init = {
  sntp_serv1: "",
  sntp_serv2: "",
  sntp_serv3: "",
  sntp_enab: false
}

const data = reactive(init);
PostData(data, 2, 0, null);
</script>
