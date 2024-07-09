// import { RouterHomeRedirectName } from "@/enums/systemEnum";
import type { Router } from "vue-router";

import { useAuthStore } from "@/stores/modules/auth";

/**
 * 导航守卫日志
 * @param msg 消息
 */
export function log(msg: string) {
  if (import.meta.env.MODE === "production") return;
  console.log("===导航守卫===", msg);
}

/**
 * @description 重置路由
 * */
// export const resetRouter = (router: Router) => {
//   const authStore = AuthStore();
//   authStore.flatMenuListGet.forEach(route => {
//     const { name } = route;
//     if (name && router.hasRoute(name)) router.removeRoute(name);
//   });
//   router.removeRoute(RouterHomeRedirectName);
//   authStore.clearAuthMenuList();
// };

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
