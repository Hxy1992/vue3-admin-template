import { onBeforeUnmount, onMounted } from "vue";
import { clearMapElements, clearMapEvents, getViewer, setToTarget, setVisible } from "vue3-use-cesium";

/**
 * 基础地图使用
 * @param selector div的id / body
 * @param mapCreated 成功回调(返回Viewer)
 */
export const useBaseMap = (selector: string, mapCreated?: (viewer: any) => void) => {
  onMounted(() => {
    setToTarget(selector);
    setVisible(true);
    if (mapCreated) {
      mapCreated(getViewer());
    }
  });
  onBeforeUnmount(() => {
    clearMapElements();
    clearMapEvents();
    setVisible(false);
    setToTarget("body");
  });
};
