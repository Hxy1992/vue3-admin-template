<template>
  <el-config-provider :locale="locale" :size="assemblySize" :button="buttonConfig">
    <router-view></router-view>
  </el-config-provider>
  <z-map-base>
    <z-map-tool :imagerys="defaultImagerys" />
    <z-map-scale />
    <z-map-status />
  </z-map-base>
</template>

<script setup lang="ts">
import { onMounted, reactive, computed } from "vue";
import { useI18n } from "vue-i18n";
import { getBrowserLang } from "@/utils";
import { useTheme } from "@/hooks/useTheme";
import { ElConfigProvider } from "element-plus";
import { LanguageType } from "./stores/interface";
import { useGlobalStore } from "@/stores/modules/global";
import en from "element-plus/es/locale/lang/en";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import { ZMapBase, ZMapTool, ZMapScale, ZMapStatus } from "vue3-use-cesium";
import elecImg from "@/assets/images/elec.jpg";
import satelliteImg from "@/assets/images/satellite.jpg";

const globalStore = useGlobalStore();
const defaultImagerys = [
  {
    label: "高德卫星(无偏移)",
    type: "gd-img",
    backgroundImage: satelliteImg
  },
  {
    label: "高德电子(无偏移)",
    type: "gd-vec",
    backgroundImage: elecImg
  },
  {
    label: "OSM",
    type: "osm-normal",
    backgroundImage: elecImg
  }
];

// init theme
const { initTheme } = useTheme();
initTheme();

// init language
const i18n = useI18n();
onMounted(() => {
  const language = globalStore.language ?? getBrowserLang();
  i18n.locale.value = language;
  globalStore.setGlobalState("language", language as LanguageType);
});

// element language
const locale = computed(() => {
  if (globalStore.language == "zh") return zhCn;
  if (globalStore.language == "en") return en;
  return getBrowserLang() == "zh" ? zhCn : en;
});

// element assemblySize
const assemblySize = computed(() => globalStore.assemblySize);

// element button config
const buttonConfig = reactive({ autoInsertSpace: false });
</script>
