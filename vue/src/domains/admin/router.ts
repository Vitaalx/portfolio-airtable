import type { RouteRecordRaw } from "vue-router";

export const routerPageNameAdmin = Object.freeze({
	ADMIN_PATH: "/admin-panel",
	PROJECTS_PAGE: "admin-panel-projects",
	ADMIN_LOGIN_PAGE: "admin-panel-login",
});

export default (): RouteRecordRaw[] => [
	{
		name: routerPageNameAdmin.PROJECTS_PAGE,
		path: `${routerPageNameAdmin.ADMIN_PATH}/projects`,
		component: () => import("./pages/AdminProjectsPage.vue"),
	},
	{
		name: routerPageNameAdmin.ADMIN_LOGIN_PAGE,
		path: "/admin-panel/login",
		component: () => import("./pages/AdminLoginPage.vue"),
	},
];
