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
import satelliteImg from "@/assets/images/satellite.jpg";
import gdEle from "@/assets/images/tileLogo/高德电子.png";
import osmEle from "@/assets/images/tileLogo/OSM.png";
import arcgisColor from "@/assets/images/tileLogo/ArcGIS彩色.png";
import arcgisGray from "@/assets/images/tileLogo/ArcGIS灰色.png";
import arcgisMidnightblue from "@/assets/images/tileLogo/ArcGIS午夜蓝.png";
import cartoDarkall from "@/assets/images/tileLogo/OSM黑.png";
import cartoLightall from "@/assets/images/tileLogo/OSM白.png";
import tencentVec from "@/assets/images/tileLogo/腾讯电子.png";

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
    backgroundImage: gdEle
  },
  {
    label: "OSM(无偏移)",
    type: "osm-normal",
    backgroundImage: osmEle
  },
  {
    label: "arcgis彩色",
    type: "geoq-colour",
    backgroundImage: arcgisColor
  },
  {
    label: "arcgis灰色",
    type: "geoq-gray",
    backgroundImage: arcgisGray
  },
  {
    label: "arcgis午夜蓝",
    type: "geoq-midnightblue",
    backgroundImage: arcgisMidnightblue
  },
  {
    label: "OMS黑(无偏移)",
    type: "carto-darkall",
    backgroundImage: cartoDarkall
  },
  {
    label: "OSM白(无偏移)",
    type: "carto-lightall",
    backgroundImage: cartoLightall
  },
  {
    label: "百度电子",
    type: "bd-vec",
    backgroundImage: gdEle
  },
  {
    label: "百度卫星",
    type: "bd-img",
    backgroundImage: satelliteImg
  },
  {
    label: "腾讯地图",
    type: "tencent-vec",
    backgroundImage: tencentVec
  },
  {
    label: "腾讯卫星",
    type: "tencent-img",
    backgroundImage: satelliteImg
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
