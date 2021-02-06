import { createRouter, createWebHashHistory } from "vue-router";
import Help from "@/views/Help";
import Index from "../views/Index.vue";
import Settings from "../views/Settings.vue";

const routes = [
  {
    path: "/",
    name: "index",
    component: Index,
  },
  {
    path: "/:mailboxId/:emailId?",
    name: "mailbox",
    component: () => import("@/views/Mailbox"),
    props: true,
  },
  {
    path: "/help",
    name: "help",
    component: Help,
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
