import { createRouter, createWebHistory } from "vue-router";
import project from "@/domains/project/router";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			component: () => import("@/layouts/BaseLayout.vue"),
			children: [...project()],
		},
	],
});

export default router;
