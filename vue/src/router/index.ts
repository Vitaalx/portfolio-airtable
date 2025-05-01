import { createRouter, createWebHistory } from "vue-router";
import project from "@/domains/project/router";
import admin, { routerPageNameAdmin } from "@/domains/admin/router";
import { useUserAdminInformation } from "@/domains/admin/composables/useUserAdminInformation";
import { notFound } from "@/domains/edito/router";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			component: () => import("@/layouts/BaseLayout.vue"),
			children: [...project()],
		},
		...admin(),
		notFound(),
	],
});

router.beforeEach((to, _from, next) => {
	const { isConnected } = useUserAdminInformation();
	const isAdminPage = to.fullPath.startsWith("/admin-panel");
	const isLoginPage = to.name === routerPageNameAdmin.ADMIN_LOGIN_PAGE;

	if (to.fullPath === "/") {
		return void next();
	}

	if (to.fullPath === "/admin-panel" && isConnected.value) {
		return void next({
			name: routerPageNameAdmin.ADMIN_PROJECTS_PAGE,
		});
	}

	if (isAdminPage && !isConnected.value && !isLoginPage) {
		return void next({
			name: routerPageNameAdmin.ADMIN_LOGIN_PAGE,
		});
	}

	return void next();
});

export default router;
