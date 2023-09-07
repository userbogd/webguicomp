import { api } from "boot/axios";
import { sha256 } from "js-sha256";
import { Notify } from "quasar";

const API_URL = "/api";
const SHA256_HMAC_KEY = "mykey";

function PostDataControlled(varlist, messtype, applytype, onfinished, enable) {
  if (!enable) return;
  var pld = {};
  var data = {};
  data.msgid = Math.floor(Date.now() / 1000);
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
export { PostData, PostDataControlled };




