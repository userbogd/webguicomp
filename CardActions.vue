<template>
  <q-card-actions>
    <q-btn color="green" v-on:click="SendAndRequest(senddata, 1, 0, 'mykey', true)">Apply</q-btn>
    <q-btn color="orange" v-on:click="SendAndRequest(senddata, 1, 1, 'mykey', true)">Save</q-btn>
    <q-btn color="red" v-on:click="SendAndRequest(senddata, 1, 2, 'mykey', true)">Save & Reboot</q-btn>
  </q-card-actions>
</template>

<script setup>
import { SendAndRequest } from "components/webguicomp/network";
import { defineProps } from "vue";
const props = defineProps(['senddata']);
</script>
