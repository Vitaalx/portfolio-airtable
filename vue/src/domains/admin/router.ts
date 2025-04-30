import type { RouteRecordRaw } from "vue-router";

export const routerPageNameAdmin = Object.freeze({
	ADMIN_PROJECTS_PAGE: "admin-panel-projects",
	ADMIN_LOGIN_PAGE: "admin-panel-login",
});

export default (): RouteRecordRaw[] => [
	{
		name: routerPageNameAdmin.ADMIN_PROJECTS_PAGE,
		path: "/admin-panel/projects",
		component: () => import("./pages/AdminProjectsPage.vue"),
	},
	{
		name: routerPageNameAdmin.ADMIN_LOGIN_PAGE,
		path: "/admin-panel/login",
		component: () => import("./pages/AdminLoginPage.vue"),
	},
];
