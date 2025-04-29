import { createRouter, createWebHistory } from "vue-router";
import project from "@/domains/project/router";
import admin from "@/domains/admin/router";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			component: () => import("@/layouts/BaseLayout.vue"),
			children: [...project()],
		},
		{
			path: "/admin-panel",
			component: () => import("@/layouts/AdminLayout.vue"),
			children: [...admin()],
		},
	],
});

export default router;
