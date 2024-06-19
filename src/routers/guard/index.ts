import type { Router } from "vue-router";
import { createSystemInitBefore } from "./systemInit";
import { createNProgressAfter, createNProgressBefore } from "./nprogress";
import { createAuthGuard } from "./auth";
import { log } from "./helper";
import { ElMessage, ElNotification } from "element-plus";
import { AxiosCanceler } from "@/api/helper/axiosCancel";

/**
 * 导航守卫
 * @param router 路由对象
 */
export function setupRouterGuard(router: Router) {
  // 守卫顺序不能随意更改
  createNProgressBefore(router);
  createMessageGuard(router);
  createHttpGuard(router);
  createAuthGuard(router);
  createSystemInitBefore(router);
  createNProgressAfter(router);
}

/**
 * http请求取消
 * @param router 路由对象
 */
function createHttpGuard(router: Router) {
  const axiosCanceler = new AxiosCanceler();
  // 取消http请求
  router.beforeEach(() => {
    log("createHttpGuard");
    // 取消所有请求
    axiosCanceler?.removeAllPending(); // 清空 pending
  });
}

/**
 * 切换路由时清空所有消息提示
 * @param router
 */
function createMessageGuard(router: Router) {
  router.beforeEach(() => {
    log("createMessageGuard");
    try {
      ElMessage.closeAll();
      ElNotification.closeAll();
    } catch {}
  });
}
