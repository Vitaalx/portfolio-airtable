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
		...admin(),
	],
});

router.beforeEach((to, _from, next) => {
	const { isConnected } = useUserAdminInformation();
	const isAdminPage = to.fullPath.startsWith("/admin-panel");
	const isLoginPage = to.name === routerPageNameAdmin.ADMIN_LOGIN_PAGE;

	console.log(`toFullPath: ${to.fullPath}`);
	console.log(`isConnected: ${isConnected.value}`);
	console.log(isAdminPage);

	if (to.fullPath === "/") {
		return void next();
	}

	if (to.fullPath === "/admin-panel" && isConnected.value) {
		console.log("liam 1");
		return void next({ name: routerPageNameAdmin.ADMIN_PROJECTS_PAGE });
	}

	if (isAdminPage && !isConnected.value && !isLoginPage) {
		console.log("liam 2");
		return void next({ name: routerPageNameAdmin.ADMIN_LOGIN_PAGE });
	}

	console.log("liam 3");
	return void next();
});

export default router;
