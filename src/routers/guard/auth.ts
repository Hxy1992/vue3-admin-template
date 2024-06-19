import type { Router } from "vue-router";
import { log, resetRouter } from "./helper";
import { initDynamicRouter } from "@/routers/modules/dynamicRouter";
import { useUserStore } from "@/stores/modules/user";
import { useAuthStore } from "@/stores/modules/auth";
import { LOGIN_URL, ROUTER_WHITE_LIST } from "@/config";

/**
 * 权限导航守卫
 * @param router 路由对象
 */
export function createAuthGuard(router: Router) {
  router.beforeEach(async (to, from) => {
    log("createAuthGuard");

    const userStore = useUserStore();
    const authStore = useAuthStore();

    // 判断是访问登陆页，有 Token 就在当前页面，没有 Token 重置路由到登陆页
    if (to.path.toLocaleLowerCase() === LOGIN_URL) {
      if (userStore.token) return from.fullPath;
      resetRouter(router);
      return;
    }

    // 判断访问页面是否在路由白名单地址(静态路由)中，如果存在直接放行
    if (ROUTER_WHITE_LIST.includes(to.path)) return;

    // 判断是否有 Token，没有重定向到 login 页面
    if (!userStore.token) return { path: LOGIN_URL, replace: true };

    // 如果没有菜单列表，就重新请求菜单列表并添加动态路由
    if (!authStore.authMenuListGet.length) {
      await initDynamicRouter();
      return { ...to, replace: true };
    }

    // 存储 routerName 做按钮权限筛选
    authStore.setRouteName(to.name as string);
  });
}
