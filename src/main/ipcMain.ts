/*
 * @Author: yy 691335336@qq.com
 * @Date: 2023-06-24 19:14:22
 * @LastEditors: yy 691335336@qq.com
 * @LastEditTime: 2023-06-24 20:23:09
 * @FilePath: /camera/src/main/ipcMain.ts
 * @Description:
 */
import { Menu, MenuItemConstructorOptions, app, ipcMain } from 'electron'

// 右键退出
ipcMain.on('quit', () => {
  const template = [
    {
      label: '退出',
      click: () => {
        app.quit()
      }
    }
  ] as MenuItemConstructorOptions[]
  const menu = Menu.buildFromTemplate(template)
  menu.popup()
})
