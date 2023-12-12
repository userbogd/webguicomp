<template>
  <q-card-section>
    <q-card-actions align="right">
      <q-btn class="sysbtn q-mt-sm" flat
        v-on:click="PostData(senddata, 1, 0, ShowDelayDialog('Data applying...', 250, null))">Apply</q-btn>
      <q-btn class="sysbtn q-mt-sm" flat
        v-on:click="PostData(senddata, 1, 1, ShowDelayDialog('Data saving...', 250, null))">Save</q-btn>
      <q-btn class="sysbtn q-mt-sm" flat
        v-on:click="PostData(senddata, 1, 2, ShowDelayDialog('Data saving and reboot...', 10000, pageReload))">Save &
        Reboot</q-btn>
    </q-card-actions>
  </q-card-section>
</template>

<style>
.sysbtn {
  border: 1px solid rgba(128, 128, 128, 0.4);
  border-radius: 5px;
}
</style>

<script setup>
import { PostData, PostDataControlled } from "components/webguicomp/network";
import { ShowDelayDialog } from "./helpers";
const props = defineProps(['senddata']);

function pageReload() { window.location.reload(); }

</script>
