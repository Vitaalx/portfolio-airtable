import type { RouteRecordRaw } from "vue-router";

export const routerPageNameMain = Object.freeze({
	PROJECTS_PAGE: "projects",
});

export default (): RouteRecordRaw[] => [
	{
		name: routerPageNameMain.PROJECTS_PAGE,
		path: "/projects",
		component: () => import("./pages/ProjectsPage.vue"),
	},
];
