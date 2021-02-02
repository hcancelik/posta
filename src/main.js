import { createApp } from "vue";
import Toaster from "@meforma/vue-toaster";
import mitt from "mitt";
import hljs from "highlight.js";

import App from "./App.vue";
import router from "./router";
import "./assets/css/index.css";
import "./assets/css/highlightjs.css";

hljs.configure({
  tabReplace: "    ",
  languages: ["html"],
});

const app = createApp(App);

const emitter = mitt();

app.config.globalProperties.emitter = emitter;

app.use(router);
app.use(Toaster, {
  position: "bottom-right",
  dismissible: true,
});

app.directive("highlightjs", (el, binding) => {
  const codeNodes = el.querySelectorAll("code");

  for (let i = 0; i < codeNodes.length; i += 1) {
    const codeNode = codeNodes[i];

    if (typeof binding.value === "string") {
      codeNode.textContent = binding.value;
    }

    hljs.highlightBlock(codeNode);
  }
});

app.mount("#app");
