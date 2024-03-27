import { api } from "boot/axios";
import { sha256 } from "js-sha256";
import { Notify, Dialog } from "quasar";

const API_URL = "/api";
const SHA256_HMAC_KEY = "mykey";
let MessIdCounter = 1;

const BLOCK_SIZE = 5120;
function ReceiveChunk(cur, total, name) {
  let foper;
  if (total == 1) foper = 3;
  else if (cur == 0) foper = 1;
  else if (cur == (total - 1)) foper = 2;
  else foper = 0;
  let data = {
    raw_data: {
      opertype: 1,
      operphase: foper,
      mem_object: name,
      size: BLOCK_SIZE,
      dat: ''
    }
  };
  return new Promise((resolve, reject) => {
    console.log(`Receive chunk ${cur} from ${total}`)
    PostData(data, 1, 0, () => resolve(data))
  })
}

function base64ToArrayBuffer(base64) {
  var binaryString = atob(base64);
  var bytes = new Uint8Array(binaryString.length);
  for (var i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function GetBlockObject(name, size, buf) {
  let partsnum = Math.floor(size / BLOCK_SIZE);
  if (size % BLOCK_SIZE)
    partsnum++;
  console.log(`Found ${partsnum} blocks in file ${name}`)
  let i;
  let resp;
  const dialog = Dialog.create({ message: 'Downloaded 0%', progress: true, persistent: true, ok: false, style: 'border: none; box-shadow: none;' })
  for (i = 0; i < partsnum; i++) {
    resp = await ReceiveChunk(i, partsnum, name);
    let decoded = base64ToArrayBuffer(resp.raw_data.dat);
    for (let k = 0; k < decoded.byteLength; k++)
      buf[i * BLOCK_SIZE + k] = decoded[k];
    dialog.update({ message: `Downloaded ${Math.floor(i * 100 / partsnum)}%` })
  }
  dialog.hide();
}

function ToBase64(bytes) {
  var binary = '';
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

function SendChunk(cur, total, name, buf) {
  return new Promise((resolve, reject) => {
    let arr;
    if (cur == (total - 1))
      arr = new Uint8Array(buf, cur * BLOCK_SIZE);
    else
      arr = new Uint8Array(buf, cur * BLOCK_SIZE, BLOCK_SIZE);
    let encode = ToBase64(arr);
    let length = encode.length;

    let foper;
    if (total == 1) foper = 3;
    else if (cur == 0) foper = 1;
    else if (cur == (total - 1)) foper = 2;
    else foper = 0;

    let data = {
      raw_data: {
        opertype: 3,
        operphase: foper,
        mem_object: name,
        size: length,
        dat: encode
      }
    };

    console.log(`Send chunk ${cur} from ${total} length ${arr.byteLength}`)
    PostData(data, 1, 0, () => resolve())
  })
}

async function PutBlockObject(name, size, buf) {
  let partsnum = Math.floor(size / BLOCK_SIZE);
  if (size % BLOCK_SIZE)
    partsnum++;
  console.log(`Found ${partsnum} blocks in file`)
  let i;
  const dialog = Dialog.create({ message: 'Uploaded 0%', progress: true, persistent: true, ok: false, style: 'border: none; box-shadow: none;' })
  for (i = 0; i < partsnum; i++) {
    await SendChunk(i, partsnum, name, buf);
    dialog.update({ message: `Uploaded ${Math.floor(i * 100 / partsnum)}%` })
  }
  dialog.hide();
}

function PostDataControlled(varlist, messtype, applytype, onfinished, enable) {
  if (!enable) return;
  var pld = {};
  var data = {};
  //data.msgid = Math.floor(Date.now() / 1000);
  data.msgid = Math.floor(Math.random() * 0x7fffffff);
  data.time = new Date().toISOString();
  data.msgtype = messtype;
  data.payloadtype = 1;
  data.payload = {};
  data.payload.applytype = applytype;
  data.payload.variables = varlist;
  pld.data = data;
  pld.signature = sha256.hmac(SHA256_HMAC_KEY, JSON.stringify(data));

  api
    .post(API_URL, JSON.stringify(pld), {
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => {
      if (enable) {
        var resp = response.data.data.payload.variables;
        for (var k in resp) varlist[k] = resp[k];
      }
      if (onfinished) onfinished();

    })
    .catch((err) => {
      Notify.create({ color: "negative", position: "top", message: err.message, icon: "report_problem", });
      console.log(JSON.stringify(err));
    });

}


function PostData(varlist, messtype, applytype, onfinished) {
  PostDataControlled(varlist, messtype, applytype, onfinished, true);
}
export { PostData, PostDataControlled, GetBlockObject, PutBlockObject };




