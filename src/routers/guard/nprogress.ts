import type { Router } from "vue-router";
import NProgress from "@/config/nprogress";
import { log } from "./helper";

/**
 * 进度条等前置导航守卫
 * @param router 路由对象
 */
export function createNProgressBefore(router: Router) {
  router.beforeEach(async to => {
    log("createNProgressBefore");
    // NProgress 开始
    NProgress.start();

    // 动态设置标题
    const title = import.meta.env.VITE_GLOB_APP_TITLE;
    document.title = to.meta.title ? `${to.meta.title} - ${title}` : title;
  });
}

/**
 * 进度条等后置导航守卫
 * @param router 路由对象
 */
export function createNProgressAfter(router: Router) {
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
