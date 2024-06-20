import type { Router } from "vue-router";
import { log } from "./helper";
// import { TabsStore } from "@/stores/modules/tabs";
// import { KeepAliveStore } from "@/stores/modules/keepAlive";
// import { loaderScript, loadMineScreen } from "@/utils/loader";
// import mittBus from "@/utils/mittBus";
// import { BaseMapStore } from "@/stores/modules/baseMap";
// import linkPath from "@/routers/config/link";
// import { ConfigStore } from "@/stores/modules/config";
// import { createSocket } from "@/api/socket";
// import { BaseMapEnum } from "@/enums/mittBusEnum";
import { useUserStore } from "@/stores/modules/user";
import { LOGIN_URL } from "@/config";
import { initMap } from "vue3-use-cesium";

/**
 * 系统初始化 前置导航守卫
 * @param router 路由对象
 */
export function createSystemInitBefore(router: Router) {
  router.beforeEach(async to => {
    const userStore = useUserStore();
    if (to.path === LOGIN_URL) return;
    if (!userStore.token) return;
    log("createSystemInitBefore");

    // 判断是否为唯一详情页
    // if (to.meta.isUnique) {
    // 	const tabStore = TabsStore();
    // 	const keepAliveStore = KeepAliveStore();
    // 	tabStore.removeTabsByPath(to.path);
    // 	keepAliveStore.removeKeepAliveName(to.name as string);
    // }

    // 获取地图配置
    // const baseMapStore = BaseMapStore();
    // const options = await baseMapStore.getMapOptions();
    // 页面是包含地图
    // if (to.meta.hasMap) {
    // 	await loaderScript(options?.cesiumUrls);
    // 	mittBus.emit(BaseMapEnum.PrepareToCreate, to);
    // }

    // 矿山大屏
    // if (to.path === linkPath.mineScreen) {
    // 	await loadMineScreen();
    // }

    // sip对讲
    // const configStore = ConfigStore();
    // if (options?.sipConfig && !configStore.sipVisible) {
    // 	mittBus.emit("sipConfig", options.sipConfig);
    // }

    // 创建websocket
    // createSocket();

    // CDN
    if (to.meta.hasMap) {
      // CDN
      await initMap(
        [
          `https://unpkg.com/cesium@1.105.0/Build/Cesium/Cesium.js`,
          `https://unpkg.com/cesium@1.105.0/Build/Cesium/Widgets/widgets.css`
        ],
        {
          imagery: "gd-img"
        }
      );
      // 本地
      // await initMap([`/CesiumV1.105/Cesium.js`, `/CesiumV1.105/Widgets/widgets.css`], {
      //   imagery: "gd-img"
      // });
    }
  });
}
