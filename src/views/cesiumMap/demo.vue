<template>
  <div class="bbox" style="height: 100%">
    <div id="my-map" style="height: 100%"></div>
  </div>
</template>

<script setup lang="ts">
import { useBaseMap } from "@/hooks/useBaseMap";

// 地图初始化
useBaseMap("#my-map", viewer => {
  viewer.scene.postProcessStages.fxaa.enabled = false;
});
</script>
