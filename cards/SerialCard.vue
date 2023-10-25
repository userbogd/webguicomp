<template>
  <q-card flat class="card" v-show="data.serial_visible">
    <q-card-section>
      <div class="text-h6">Serial port</div>
    </q-card-section>
    <q-card-section class="q-pt-none">
      <div class="q-pa-md">
        <div class="q-gutter-md q-pa-none q-pb-none">
          <div>Port mode: {{ data.serial_mode }}</div>
          <q-toggle v-model="data.serial_enab" label="Serial port enable" />
          <q-toggle v-model="data.serial_bridge" label="Enable bridge to MQTT" />
          <q-input v-model="data.serial_baud" label="Baud rate" />
          <q-input type="number" v-model="data.serial_break" label="Input data separate brake, ms" />
        </div>
      </div>
    </q-card-section>
    <CardActions :senddata="data"></CardActions>
  </q-card>
</template>
  
<script setup>
import { reactive, computed } from "vue";
import { PostData } from "components/webguicomp/network";
import CardActions from "components/webguicomp/CardActions.vue"
const init = {
  serial_visible: false,
  serial_enab: false,
  serial_baud: 115200,
  serial_mode: "-",
  serial_bridge: false,
  serial_break: 50
}
const data = reactive(init);
PostData(data, 2, 0, null);
</script>
