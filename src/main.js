import { createApp } from "vue";
import Toaster from "@meforma/vue-toaster";

import App from "./App.vue";
import router from "./router";
import "./assets/css/index.css";

const app = createApp(App);

app.use(router);
app.use(Toaster, {
  position: "bottom-right",
  dismissible: true,
});
app.mount("#app");
