/*
 * @Author: yy 691335336@qq.com
 * @Date: 2023-06-24 20:46:35
 * @LastEditors: yy 691335336@qq.com
 * @LastEditTime: 2023-06-24 21:11:12
 * @FilePath: /camera/src/main/tray.ts
 * @Description: 系统托盘
 */

import { Menu, Tray } from 'electron'
import path from 'path'

const createTray = () => {
  const tray = new Tray(path.resolve(__dirname, '../../resources/trayTemplate@2x.png'))

  const menu = Menu.buildFromTemplate([{ label: '退出', role: 'quit' }])
  tray.setToolTip('杨杨与bug')
  tray.setContextMenu(menu)
}

export default createTray
