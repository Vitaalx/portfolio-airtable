import type { RouteRecordRaw } from "vue-router";

export const routerPageNameAdmin = Object.freeze({
	ADMIN_PROJECTS_PAGE: "admin-panel-projects",
	ADMIN_LOGIN_PAGE: "admin-panel-login",
	ADMIN_PROJECT_STATS_PAGE: "admin-panel-project-stats",
});

export default (): RouteRecordRaw[] => [
	{
		name: "admin-panel",
		path: "/admin-panel",
		component: () => import("./layout/AdminLayout.vue"),
		children: [
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
			{
				name: routerPageNameAdmin.ADMIN_PROJECT_STATS_PAGE,

				path: "/admin-panel/projects-statistics",
				component: () => import("./pages/AdminProjectsStats.vue"),
			},
		],
	},
];
