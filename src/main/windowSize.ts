/*
 * @Author: yy 691335336@qq.com
 * @Date: 2023-06-24 21:46:39
 * @LastEditors: yy 691335336@qq.com
 * @LastEditTime: 2023-06-24 22:21:10
 * @FilePath: /camera/src/main/windowSize.ts
 * @Description: 设置摄像头尺寸
 */
import { BrowserWindow, ipcMain } from 'electron'

/**
 * @description: 获取当前触发事件的窗口
 * @param {Electron} event
 * @return {*}
 */
const getWin = (event: Electron.IpcMainEvent) => {
  return BrowserWindow.fromWebContents(event.sender)!
}

ipcMain.on(
  'setWindowSize',
  (event: Electron.IpcMainEvent, opt: { aspectRatio: number; width?: number; height?: number }) => {
    const win = getWin(event)
    win.setAspectRatio(opt.aspectRatio)
    win.setBounds({ width: opt.width, height: opt.height })
  }
)
