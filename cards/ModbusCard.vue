<template>
  <q-card flat class="card" v-show="data.mbtcp_visible">
    <q-card-section>
      <div class="text-h6">MODBUS</div>
    </q-card-section>
    <q-card-section class="q-pt-none">
      <div class="q-pa-md">
        <div class="q-gutter-md q-pa-none q-pb-none">
          <q-toggle v-model="data.mbtcp_enab" label="Eanble modbus TCP" />
          <q-input type="number" v-model="data.mbtcp_port" label="Modbus TCP port" />
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
  mbtcp_visible: false,
  mbtcp_enab: false,
  mbtcp_port: 502
}

const data = reactive(init);
PostData(data, 2, 0, null);
</script>
