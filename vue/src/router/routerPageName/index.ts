import { routerPageNameAdmin } from "@/domains/admin/router";
import { routerPageNameMain } from "@/domains/project/router";

export const routerPageName = Object.freeze({
	...routerPageNameAdmin,
	...routerPageNameMain,
});
