import { createRouter, createWebHashHistory } from "vue-router";
import Index from "../views/Index.vue";
import Settings from "../views/Settings.vue";

const routes = [
  {
    path: "/",
    name: "index",
    component: Index,
  },
  {
    path: "/:mailbox",
    name: "mailbox",
    component: () => import("@/views/Mailbox"),
  },
  {
    path: "/settings",
    name: "settings",
    component: Settings,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
