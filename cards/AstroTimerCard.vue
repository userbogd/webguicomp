<template>
  <q-card flat class="card">
    <q-card-section>
      <div class="text-h6">Astro Scheduler</div>
    </q-card-section>
    <q-card-section class="q-pt-none">
      <div class="row">
        <div class="q-pa-md col-6"><q-input v-model="data.astrorecs.lat" label="LAT" /></div>
        <div class="q-pa-md col-6"><q-input v-model="data.astrorecs.lon" label="LON" /></div>
      </div>
    </q-card-section>
    <q-scroll-area :style="{ height: scrollHeight + 'px' }">
      <q-card-section class="q-pt-none">
        <div class="q-pa-md">
          <div class="q-gutter-md q-pa-none q-pb-none">
            <q-card flat bordered class="card" v-for="astrorec in data.astrorecs.records" :key="astrorec.num"
              v-show="!astrorec.del">
              <q-card-section>
                <div class="text-h6">Task {{ astrorec.num }}</div>
              </q-card-section>
              <q-card-section class="q-pt-none">
                <div><q-toggle v-model="astrorec.enab" :true-value=1 :false-value=0>Task enabled</q-toggle>
                </div>
                <div><q-toggle v-model="astrorec.rise" :true-value=1 :false-value=0>Sun rise/set</q-toggle></div>
                <div><q-toggle v-model="astrorec.sensor_enab" :true-value=1 :false-value=0>Light sensor</q-toggle></div>
                <div class=" row">
                  <div class="q-pa-xs col-6"><q-input v-model="astrorec.sensor_angle" label="Sensor Sun angle" /></div>
                  <div class="q-pa-xs col-6">Sensor time: {{ min_to_str(astrorec.sensor_time) }}

                  </div>
                </div>
                <div class="row">
                  <div class="q-pa-xs col-6"><q-input v-model="astrorec.main_angle" label="Sun angle" /></div>
                  <div class="q-pa-xs col-6"> Time: {{ min_to_str(astrorec.main_time) }}
                  </div>
                </div>
                <q-input v-model="astrorec.name" label="Task name" />
                <q-input v-model="astrorec.exec" label="Execute command" />
              </q-card-section>
              <q-card-actions>
                <q-btn class="btn" flat v-on:click="ApplyAstroRecord(astrorec.num)">Apply</q-btn>
                <q-btn class="btn" flat v-on:click="DeleteAstroRecord(astrorec.num)">Delete</q-btn>
              </q-card-actions>
            </q-card>
          </div>
        </div>

      </q-card-section>
    </q-scroll-area>
    <q-card-actions>
      <div>
        <q-btn class="btn" flat v-on:click="AddAstroRecord">Add new</q-btn>
      </div>
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { reactive, computed } from "vue";
import { PostData } from "components/webguicomp/network";
import { ShowDelayDialog } from "components/webguicomp/helpers";

function min_to_str(min) {
  return `${Math.floor(min / 60)}h ${min % 60}m`
}

let initrecs = function () {
  let out = [], rec;
  for (i = 1; i <= 16; i++) {
    rec = {
      num: i,
      del: 1,
      enab: 1,
      rise: 1,
      sensor_enab: 0,
      sensor_angle: 0,
      sensor_time: 0,
      main_angle: 0,
      main_time: 0,
      name: "",
      exec: "",
    }
    out.push(rec);
  }
  console.log(JSON.stringify(out));
  return out;
};


const init = {
  astrorecs: {
    lat: 0,
    lon: 0,
    records: initrecs
  }
}

function ApplyAstroRecord(num) {
  PostData({
    astrorecs: {
      lat: data.astrorecs.lat,
      lon: data.astrorecs.lon,
      records: [
        {
          num: data.astrorecs.records[num - 1].num,
          del: data.astrorecs.records[num - 1].del,
          enab: data.astrorecs.records[num - 1].enab,
          rise: data.astrorecs.records[num - 1].rise,
          sensor_enab: data.astrorecs.records[num - 1].sensor_enab,
          sensor_angle: data.astrorecs.records[num - 1].sensor_angle,
          main_angle: data.astrorecs.records[num - 1].main_angle,
          name: data.astrorecs.records[num - 1].name,
          exec: data.astrorecs.records[num - 1].exec
        }
      ]
    }
  }, 1, 1, ShowDelayDialog('Data applying...', 250, PostData(data, 2, 0, null)));
}

function DeleteAstroRecord(num) {
  data.astrorecs.records[num - 1].del = 1;
  ApplyAstroRecord(num);
}

function AddAstroRecord() {
  for (let i = 0; i < 16; i++) {
    if (data.astrorecs.records[i].del == 1) {
      data.astrorecs.records[i].del = 0;
      data.astrorecs.records[i].enab = 0;
      ApplyAstroRecord(i + 1);
      break;
    }
  }
}


const scrollHeight = computed(() => {
  let num = 0;
  for (let i = 0; i < 16; i++) if (!data.astrorecs.records[i].del) ++num;
  return (num <= 2) ? num * 400 : 800;
});



const data = reactive(init);
PostData(data, 2, 0, null);
</script>
