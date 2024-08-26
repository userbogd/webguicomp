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
          <div class="row">
            <div class="col-4"><q-select v-model="data.serial_bits" :options="databits" option-value="val"
                option-label="lab" :map-options="true" :emit-value="true" label="Data bits"></q-select></div>
            <div class="col-4 q-pl-md"><q-select v-model="data.serial_parity" :options="parity" option-value="val"
                option-label="lab" :map-options="true" :emit-value="true" label="Parity"></q-select></div>
            <div class="col-4 q-pl-md"><q-select v-model="data.serial_stop" :options="stopbits" option-value="val"
                option-label="lab" :map-options="true" :emit-value="true" label="Stop bits"></q-select></div>
          </div>
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
  serial_bits: 3,
  serial_parity: 0,
  serial_stop: 1,
  serial_mode: "-",
  serial_bridge: false,
  serial_break: 50
}

const databits = [
  { lab: '5 BIT', val: 0 },
  { lab: '6 BIT', val: 1 },
  { lab: '7 BIT', val: 2 },
  { lab: '8 BIT', val: 3 },
]
const stopbits = [
  { lab: '1 BIT', val: 1 },
  { lab: '1_5 BIT', val: 2 },
  { lab: '2 BIT', val: 3 },
]
const parity = [
  { lab: 'DISABLED', val: 0 },
  { lab: 'EVEN', val: 2 },
  { lab: 'ODD', val: 3 },
]

const data = reactive(init);
PostData(data, 2, 0, null);
</script>
