import type { RouteRecordRaw } from "vue-router";

export default (): RouteRecordRaw[] => [
	{
		path: "/projects",
		component: () => import("./pages/ProjectsPage.vue"),
	},
];
