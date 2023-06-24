<!--
 * @Author: yy 691335336@qq.com
 * @Date: 2023-06-24 15:55:08
 * @LastEditors: yy 691335336@qq.com
 * @LastEditTime: 2023-06-24 22:14:42
 * @FilePath: /camera/src/renderer/src/App.vue
 * @Description: App.vue
-->
desc
<script lang="ts" setup>
import { CameraFive, InnerShadowTopLeft, Setting as SettingIcon } from '@icon-park/vue-next'
import { useConfig } from '@renderer/stores/useConfig'
import useDrag from '@renderer/hooks/useDrag'
import Camera from '@renderer/components/Camera.vue'
import Setting from '@renderer/components/Setting.vue'

// 摄像头配置
const { config } = useConfig()
// 拖拽窗口
const { drag } = useDrag()
drag.run()

/**
 * @description: 右键菜单
 * @return {*}
 */
const handleContextmenu = (): void => window.api.quit()

/**
 * @description: 切换圆角
 * @return {*}
 */
const handleChangeRound = (): void => {
  config.rounded = !config.rounded
  if (config.rounded) window.api.setWindowSize({ aspectRatio: 1, width: 300, height: 300 })
  else window.api.setWindowSize({ aspectRatio: 16 / 9, width: 500, height: 280 })
}
</script>

<template>
  <!-- <Suspense> 一个异步依赖 -->
  <Suspense>
    <main class="relative group" @contextmenu="handleContextmenu">
      <section>
        <!-- 设置按钮 -->
        <SettingIcon
          v-if="config.page == 'camera'"
          class="icon"
          size="24"
          theme="outline"
          @click="config.page = 'setting'"
        />
        <!-- 摄像头按钮 -->
        <CameraFive
          v-if="config.page == 'setting'"
          class="icon"
          size="24"
          theme="outline"
          @click="config.page = 'camera'"
        />
        <!-- 切换圆角 -->
        <InnerShadowTopLeft
          v-if="config.page == 'camera'"
          class="icon bottom-3"
          size="24"
          theme="outline"
          @click="handleChangeRound"
        />
      </section>
      <section>
        <Camera v-if="config.page == 'camera'" />
        <Setting v-else />
      </section>
    </main>
  </Suspense>
</template>

<style lang="scss" scoped>
.icon {
  @apply absolute left-1/2 -translate-x-1/2 mt-3 text-white opacity-80 cursor-pointer z-10 hidden group-hover:block;
}
</style>
