/*
 * @Author: yy 691335336@qq.com
 * @Date: 2023-06-24 14:36:58
 * @LastEditors: yy 691335336@qq.com
 * @LastEditTime: 2023-06-24 22:15:47
 * @FilePath: /camera/src/main/index.ts
 * @Description:
 */
import { app, BrowserWindow, shell } from 'electron'
import { join } from 'path'
import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import createTray from './tray'
import './windowSize'
import './ipcMain'
import './drag'

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 300,
    height: 300,
    minWidth: 250,
    minHeight: 250,
    maxWidth: 500,
    maxHeight: 500,
    x: 1200,
    y: 100,
    show: false,
    // 隐藏顶部操作栏
    frame: false,
    // 是否置顶
    alwaysOnTop: true,
    // 背景是否透明
    transparent: true,
    // 任务栏是否显示 ---> 苹果需要单独设置
    skipTaskbar: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })
  // 开启控制台调试
  // if (is.dev) mainWindow.webContents.toggleDevTools()
  // 控制缩放比例
  // mainWindow.setAspectRatio(1)
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()
  // 托盘图标
  createTray()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  // 隐藏 dock 图标
  app.dock.hide()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
