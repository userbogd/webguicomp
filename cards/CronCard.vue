<template>
    <q-card flat class="card">
        <q-card-section>
            <div class="text-h6">CRON Scheduler</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
            <q-expansion-item v-for="cronrec in data.cronrecs" :key="cronrec.num" :label="list_header(cronrec)"
                v-show="!cronrec.del">
                <q-card flat bordered>
                    <q-card-section class="q-pt-none">
                        <div><q-toggle v-model="cronrec.enab" :true-value=1 :false-value=0>Task enabled</q-toggle>
                        </div>
                        <div><q-toggle v-model="cronrec.prev" :true-value=1 :false-value=0>Trigger
                                previous</q-toggle></div>


                        <q-input v-model="cronrec.type" label="Timer type" />
                        <q-input v-model="cronrec.sun_angle" label="Sun angle" />

                        <q-input v-model="cronrec.name" label="Task name" />
                        <q-input v-model="cronrec.cron" label="CRON expression" />
                        <q-input v-model="cronrec.exec" label="Execute command" />
                    </q-card-section>
                    <q-card-actions>
                        <q-btn class="btn" flat v-on:click="ApplyCronRecord(cronrec.num)">Save task</q-btn>
                        <q-btn class="btn" flat v-on:click="DeleteCronRecord(cronrec.num)">Delete task</q-btn>
                    </q-card-actions>
                </q-card>
            </q-expansion-item>
        </q-card-section>
        <q-card-actions>
            <div class="q-pa-md">
                <q-btn class="btn" flat v-on:click="AddCronRecord">Add task</q-btn>
            </div>
        </q-card-actions>
    </q-card>
</template>

<script setup>
import { reactive, computed } from "vue";
import { PostData } from "components/webguicomp/network";
import { ShowDelayDialog } from "components/webguicomp/helpers";

function list_header(rec) {
    return `Task ${rec.num} [${rec.name}]`;
}

function initrecs() {
    let out = [], rec, i;
    for (i = 1; i <= 16; i++) {
        rec = {
            num: i, del: 1, enab: 1, prev: 0, type: 0,
            sun_angle: 0, name: "", cron: "", exec: "",
        }
        out.push(rec);
    }
    return out;
};

const init = {
    cronrecs: initrecs()
}

function ApplyCronRecord(num) {
    PostData(data, 1, 1, null);
}

function DeleteCronRecord(num) {
    data.cronrecs[num - 1].del = 1;
    ApplyCronRecord(num);
}

function AddCronRecord() {
    for (let i = 0; i < 16; i++) {
        if (data.cronrecs[i].del == 1) {
            data.cronrecs[i].del = 0;
            data.cronrecs[i].enab = 0;
            ApplyCronRecord(i + 1);
            break;
        }
    }
}

const data = reactive(init);
PostData(data, 2, 0, null);
</script>
