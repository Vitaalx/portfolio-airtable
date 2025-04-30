import { createRouter, createWebHistory } from "vue-router";
import project from "@/domains/project/router";
import admin, { routerPageNameAdmin } from "@/domains/admin/router";
import { useUserAdminInformation } from "@/domains/admin/composables/useUserAdminInformation";

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

router.beforeEach((to, _from, next) => {
	const { isConnected } = useUserAdminInformation();
	const isAdminPage = to.fullPath.startsWith("/admin-panel");
	const isLoginPage = to.name === routerPageNameAdmin.ADMIN_LOGIN_PAGE;

	if (to.fullPath === "/") {
		return void next();
	}

	if (isAdminPage && !isConnected.value && !isLoginPage) {
		return void next({ name: routerPageNameAdmin.ADMIN_LOGIN_PAGE });
	}

	return void next();
});

export default router;
