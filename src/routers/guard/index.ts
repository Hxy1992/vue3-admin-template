import type { Router } from "vue-router";
import NProgress from "@/config/nprogress";
import { useUserStore } from "@/stores/modules/user";
import { useAuthStore } from "@/stores/modules/auth";
import { LOGIN_URL, ROUTER_WHITE_LIST } from "@/config";
import { initDynamicRouter } from "@/routers/modules/dynamicRouter";
import { AxiosCanceler } from "@/api/helper/axiosCancel";

/**
 * 导航守卫
 * @param router 路由对象
 */
export function setupRouterGuard(router: Router) {
  // 守卫顺序不能随意更改
  createNProgressBefore(router);
  createHttpGuard(router);
  createAuthGuard(router);
  createNProgressAfter(router);
}

/**
 * 进度条等前置导航守卫
 * @param router 路由对象
 */
function createNProgressBefore(router: Router) {
  router.beforeEach(to => {
    log("createNProgressBefore");
    // 1.NProgress 开始
    NProgress.start();

    // 2.动态设置标题
    const title = import.meta.env.VITE_GLOB_APP_TITLE;
    document.title = to.meta.title ? `${to.meta.title} - ${title}` : title;
  });
}

/**
 * 进度条等后置导航守卫
 * @param router 路由对象
 */
function createNProgressAfter(router: Router) {
  router.afterEach(() => {
    log("createNProgressAfter");
    NProgress.done();
  });
  /**
   * @description 路由跳转错误
   * */
  router.onError(error => {
    NProgress.done();
    console.warn("路由错误", error.message);
  });
}

/**
 * http请求取消
 * @param router 路由对象
 */
function createHttpGuard(router: Router) {
  const axiosCanceler = new AxiosCanceler();
  router.beforeEach(async () => {
    log("createHttpGuard");
    axiosCanceler?.removeAllPending();
  });
}

/**
 * 权限导航守卫
 * @param router 路由对象
 */
function createAuthGuard(router: Router) {
  router.beforeEach(async (to, from) => {
    log("createAuthGuard");
    const userStore = useUserStore();
    const authStore = useAuthStore();

    // 3.判断是访问登陆页，有 Token 就在当前页面，没有 Token 重置路由到登陆页
    if (to.path.toLocaleLowerCase() === LOGIN_URL) {
      if (userStore.token) return from.fullPath;
      resetRouter(router);
      return;
    }

    // 4.判断访问页面是否在路由白名单地址(静态路由)中，如果存在直接放行
    if (ROUTER_WHITE_LIST.includes(to.path)) return;

    // 5.判断是否有 Token，没有重定向到 login 页面
    if (!userStore.token) return { path: LOGIN_URL, replace: true };

    // 6.如果没有菜单列表，就重新请求菜单列表并添加动态路由
    if (!authStore.authMenuListGet.length) {
      await initDynamicRouter();
      return { ...to, replace: true };
    }

    // 7.存储 routerName 做按钮权限筛选
    authStore.setRouteName(to.name as string);
  });
}

/**
 * @description 重置路由
 * */
export const resetRouter = (router: Router) => {
  const authStore = useAuthStore();
  authStore.flatMenuListGet.forEach(route => {
    const { name } = route;
    if (name && router.hasRoute(name)) router.removeRoute(name);
  });
};

/**
 * 导航守卫日志
 * @param msg 消息
 */
function log(msg: string) {
  if (import.meta.env.MODE === "production") return;
  console.log("===导航守卫===", msg);
}
