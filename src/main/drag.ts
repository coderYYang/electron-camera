/*
 * @Author: yy 691335336@qq.com
 * @Date: 2023-06-24 20:23:17
 * @LastEditors: yy 691335336@qq.com
 * @LastEditTime: 2023-06-24 20:44:02
 * @FilePath: /camera/src/main/drag.ts
 * @Description: 窗口拖拽
 */
import { BrowserWindow, ipcMain } from 'electron'

// 窗口拖拽
ipcMain.handle('drag', (event, opt: { x: number; y: number }) => {
  const win = BrowserWindow.fromWebContents(event.sender)!
  const [x, y] = win.getPosition()
  win.setPosition(x + opt.x, y + opt.y)
})
