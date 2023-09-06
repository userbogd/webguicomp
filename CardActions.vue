<template>
  <q-card-section>
    <q-card-actions align="right">
      <q-btn class="btn" flat v-on:click="PostData(senddata, 1, 0, ShowDelayDialog('Data applying...', 1000, null))">Apply</q-btn>
      <q-btn class="btn" flat v-on:click="PostData(senddata, 1, 1, ShowDelayDialog('Data saving...', 1000, null))">Save</q-btn>
      <q-btn class="btn" flat v-on:click="PostData(senddata, 1, 2, ShowDelayDialog('Data saving and reboot...', 10000, null))">Save &
        Reboot</q-btn>
    </q-card-actions>
  </q-card-section>
</template>

<script setup>
import { PostData } from "components/webguicomp/network";
import { ShowDelayDialog } from "./helpers";
const props = defineProps(['senddata']);
</script>
