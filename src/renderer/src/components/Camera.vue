<!--
 * @Author: yy 691335336@qq.com
 * @Date: 2023-06-24 14:59:38
 * @LastEditors: yy 691335336@qq.com
 * @LastEditTime: 2023-06-24 21:51:59
 * @FilePath: /camera/src/renderer/src/components/Camera.vue
 * @Description: 摄像头组件
-->
<template>
  <main
    :class="{ 'rounded-full': config.rounded }"
    :style="`border: solid ${config.borderWidth}px ${config.borderColor}`"
    class="w-screen h-screen overflow-hidden"
  >
    <video :class="{ 'rounded-full': config.rounded }" class="object-cover w-full h-full"></video>
  </main>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useConfig } from '@renderer/stores/useConfig' // 请求一个可用的媒体输入和输出设备的列表

// 请求一个可用的媒体输入和输出设备的列表
const { config } = useConfig()
onMounted(() => {
  const video = document.querySelector('video')!
  const constraints = {
    audio: false,
    video: { deviceId: config.deviceId }
  } as MediaStreamConstraints

  navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
    video.srcObject = stream
    video.play()
  })
})
</script>
