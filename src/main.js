import { createApp } from "vue";
import Toaster from "@meforma/vue-toaster";
import mitt from "mitt";

import App from "./App.vue";
import router from "./router";
import "./assets/css/index.css";

const app = createApp(App);

const emitter = mitt();

app.config.globalProperties.emitter = emitter;

app.use(router);
app.use(Toaster, {
  position: "bottom-right",
  dismissible: true,
});

app.mount("#app");
