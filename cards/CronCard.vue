<template>
    <q-card flat class="card">
        <q-card-section>
            <div class="text-h6">CRON Scheduler</div>
        </q-card-section>
        <q-scroll-area style="height: 600px;">
        <q-card-section class="q-pt-none">
            <div class="q-pa-md">
                <div class="q-gutter-md q-pa-none q-pb-none">
                    
                <q-card flat bordered class="card" v-for="cronrec in data.cronrecs" :key="cronrec.num" v-show="!cronrec.del">
                    <q-card-section>
                        <div class="text-h7">Task {{ cronrec.num }}</div>
                    </q-card-section>
                    <q-card-section class="q-pt-none">
                        <div><q-toggle v-model="cronrec.enab" :true-value="1" :false-value="0">Task enabled</q-toggle></div>
                        <div><q-toggle v-model="cronrec.prev" :true-value="1" :false-value="0">Trigger previous</q-toggle></div>
                        <q-input v-model="cronrec.name" label="Task name" />
                        <q-input v-model="cronrec.cron" label="CRON expression" />
                        <q-input v-model="cronrec.exec" label="Execute command" />
                    </q-card-section>
                    <q-card-actions>
                        <q-btn class="btn" flat v-on:click="ApplyCronRecord(cronrec.num)">Apply</q-btn>
                        <q-btn class="btn" flat v-on:click="DeleteCronRecord(cronrec.num)">Delete</q-btn>
                    </q-card-actions>
                </q-card>
                
                </div>
            </div>
        </q-card-section>
        </q-scroll-area>
        <q-card-actions>
            <div class="q-pa-md">
              <q-btn class="btn" flat v-on:click="AddCronRecord">Add new</q-btn>  
            </div>
        </q-card-actions>
    </q-card>
</template>
  
<script setup>
import { reactive, computed } from "vue";
import { PostData } from "components/webguicomp/network";
import CardActions from "components/webguicomp/CardActions.vue"
const init = {
    cronrecs: [
        {num: 1, del: 1, enab: 1, prev: 0, name: "defName", cron: "* * * * * *", exec: "SYSTEM,TEST,ARGUMENTS"},
        {num: 2, del: 1, enab: 1, prev: 0, name: "defName", cron: "* * * * * *", exec: "SYSTEM,TEST,ARGUMENTS"},
        {num: 3, del: 1, enab: 1, prev: 0, name: "defName", cron: "* * * * * *", exec: "SYSTEM,TEST,ARGUMENTS"},
        {num: 4, del: 1, enab: 1, prev: 0, name: "defName", cron: "* * * * * *", exec: "SYSTEM,TEST,ARGUMENTS"},
        {num: 5, del: 1, enab: 1, prev: 0, name: "defName", cron: "* * * * * *", exec: "SYSTEM,TEST,ARGUMENTS"},
        {num: 6, del: 1, enab: 1, prev: 0, name: "defName", cron: "* * * * * *", exec: "SYSTEM,TEST,ARGUMENTS"},
        {num: 7, del: 1, enab: 1, prev: 0, name: "defName", cron: "* * * * * *", exec: "SYSTEM,TEST,ARGUMENTS"},
        {num: 8, del: 1, enab: 1, prev: 0, name: "defName", cron: "* * * * * *", exec: "SYSTEM,TEST,ARGUMENTS"},
        {num: 9, del: 1, enab: 1, prev: 0, name: "defName", cron: "* * * * * *", exec: "SYSTEM,TEST,ARGUMENTS"},
        {num: 10, del: 1, enab: 1, prev: 0, name: "defName", cron: "* * * * * *", exec: "SYSTEM,TEST,ARGUMENTS"},
        {num: 11, del: 1, enab: 1, prev: 0, name: "defName", cron: "* * * * * *", exec: "SYSTEM,TEST,ARGUMENTS"},
        {num: 12, del: 1, enab: 1, prev: 0, name: "defName", cron: "* * * * * *", exec: "SYSTEM,TEST,ARGUMENTS"},
        {num: 13, del: 1, enab: 1, prev: 0, name: "defName", cron: "* * * * * *", exec: "SYSTEM,TEST,ARGUMENTS"},
        {num: 14, del: 1, enab: 1, prev: 0, name: "defName", cron: "* * * * * *", exec: "SYSTEM,TEST,ARGUMENTS"},
        {num: 15, del: 1, enab: 1, prev: 0, name: "defName", cron: "* * * * * *", exec: "SYSTEM,TEST,ARGUMENTS"},
        {num: 16, del: 1, enab: 1, prev: 0, name: "defName", cron: "* * * * * *", exec: "SYSTEM,TEST,ARGUMENTS"}
    ]
}

function ApplyCronRecord(num)
{
    
PostData({cronrecs:[{
    num: data.cronrecs[num-1].num, 
    del: data.cronrecs[num-1].del,
    enab: data.cronrecs[num-1].del, 
    prev: data.cronrecs[num-1].prev, 
    name: data.cronrecs[num-1].name,
    cron: data.cronrecs[num-1].cron,
    exec: data.cronrecs[num-1].exec}]}, 1, 1, null);
    
}
function DeleteCronRecord(num)
{

}
function AddCronRecord()
{

}
const data = reactive(init);
PostData(data, 2, 0, null);
</script>
