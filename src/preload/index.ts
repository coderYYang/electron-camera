/*
 * @Author: yy 691335336@qq.com
 * @Date: 2023-06-24 19:09:30
 * @LastEditors: yy 691335336@qq.com
 * @LastEditTime: 2023-06-24 20:25:01
 * @FilePath: /camera/src/preload/index.ts
 * @Description: 预加载进程
 */
import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  /**
   * @description: 右键退出
   * @return {*}
   */
  quit: (): void => {
    ipcRenderer.send('quit')
  },
  // 鼠标移动拖拽
  drag: (opt: { x: number; y: number }) => {
    ipcRenderer.invoke('drag', opt)
  },
  // 设置窗口尺寸
  setWindowSize: (opt: { aspectRatio: number; width?: number; height?: number }) => {
    ipcRenderer.send('setWindowSize', opt)
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
