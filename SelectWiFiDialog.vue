<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <div class="q-pa-md q-gutter-md">
        <q-card-section v-if="visible" align="center">
          <div><q-circular-progress indeterminate size="50px" color="primary" class="q-ma-md"></q-circular-progress></div>
          <div>Scanning WiFi...</div>
        </q-card-section>
        <q-card-section v-else>
          <q-table title="WiFi networks" :flat="true" :rows="scandata.wifi_scan_res" :columns="columns" row-key="ssid"
            hide-no-data="true" wrap-cells="true" @row-click="ClickOnRaw" />
        </q-card-section>
        <q-card-actions align="center">
          <q-btn label="Cancel" @click="onDialogCancel" />
        </q-card-actions>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useDialogPluginComponent } from 'quasar'
import { PostData } from "components/webguicomp/network";
import { reactive, ref } from 'vue';
import { useQuasar } from 'quasar'
import { ShowDelayDialog } from "./helpers";

const $q = useQuasar();

defineEmits([
  // REQUIRED; need to specify some events that your
  // component will emit through useDialogPluginComponent()
  ...useDialogPluginComponent.emits
])

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
// dialogRef      - Vue ref to be applied to QDialog
// onDialogHide   - Function to be used as handler for @hide on QDialog
// onDialogOK     - Function to call to settle dialog with "ok" outcome
//                    example: onDialogOK() - no payload
//                    example: onDialogOK({ /*...*/ }) - with payload
// onDialogCancel - Function to call to settle dialog with "cancel" outcome


function ClickOnRaw(evt, row, index) {
  $q.dialog({
    title: 'Enter network key',
    message: `Enter key for "${row.ssid}" network`,
    prompt: {
      model: '',
      isValid: val => val.length > 2, // << here is the magic
      type: 'text' // optional
    },
    cancel: true,
    persistent: true
  }).onOk(data => {
    PostData({ wifi_sta_key: data, wifi_sta_ssid: row.ssid }, 1, 2, ShowDelayDialog('Data saving and reboot...', 10000, null))
    onDialogOK();
  })
}

function onDataReady() {
  visible.value = false;
}
let visible = ref(true);
const scandata = reactive({ wifi_scan_res: 10 });
PostData({ wifi_scan: 1 }, 2, 0, () => { });
setTimeout(() => { PostData(scandata, 2, 0, () => onDataReady()) }, 7000);

const columns = [
  { name: 'ssid', label: 'SSID', align: 'left', field: 'ssid', sortable: true },
  { name: 'rssi', label: 'RSSI', field: 'rssi', sortable: true },
  { name: 'ch', label: 'CHANNEL', field: 'ch', sortable: true },
]
</script>
