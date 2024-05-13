<template>
    <q-card flat class="card">
        <q-card-section>
            <div class="text-h6">Astro Scheduler</div>
        </q-card-section>
        <q-card-actions>
            <div class="row">
                <div><q-input v-model="data.lat" label="Latitude" /></div>
                <div><q-input v-model="data.lon" label="Longitude" /></div>
                <div><q-input v-model="data.ang" label="Sun angle" /></div>
            </div>
            <div class="row">
                <div><q-input v-model="data.timestamp" label="Unixtime" /></div>
                <div><q-btn class="btn" flat v-on:click="Calc">Test Astro</q-btn></div>
            </div>
        </q-card-actions>
    </q-card>
</template>

<script setup>
import { reactive, computed } from "vue";
import { PostData } from "components/webguicomp/network";
import { ShowDelayDialog } from "components/webguicomp/helpers";

const init = {
    timestamp: 0,
    lat: 54.73,
    lon: 20.51,
    ang: 0.0,
    sunrise: '',
    sunset: ''
}

const cond = {

};

function TestAstro() {
    PostData({ astro_test: data.timestamp }, 1, 0);
}

const data = reactive(init);
PostData(data, 2, 0, null);
</script>
