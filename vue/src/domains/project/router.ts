import type { RouteRecordRaw } from "vue-router";

export const routerPageNameMain = Object.freeze({
	HOME_PAGE: "projects",
});

export default (): RouteRecordRaw[] => [
	{
		name: routerPageNameMain.HOME_PAGE,
		path: "/projects",
		component: () => import("./pages/ProjectsPage.vue"),
	},
];
