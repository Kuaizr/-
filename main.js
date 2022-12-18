const { Tray, Menu, app, BrowserWindow, screen } = require('electron')
const path = require('path')

let win = null

const createWindow = () => {

  let area = screen.getAllDisplays()[0].workArea

  win = new BrowserWindow({
    width: area.width,
    height: area.height,
    x:area.x,
    y:area.y,
    // alwaysOnTop: true,
    frame: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      // enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  require('@electron/remote/main').initialize()
  require("@electron/remote/main").enable(win.webContents)

  // win.setIgnoreMouseEvents(true) // 过滤鼠标操作
  win.setSkipTaskbar(true) // 取消任务栏显示

  win.loadFile('index.html')

  win.webContents.openDevTools()
}


let tray = null
app.on('ready', async () => {
  createWindow()
  tray = new Tray(path.join(__dirname,'./img/snowflower.png'))
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '退出',
      click: function () {
        app.quit()
      }
    }
  ])
  tray.setToolTip('天气')
  //显示程序页面
  tray.on('click', () => {
    win.show()
  })
  tray.on('right-click', () =>{
    tray.setContextMenu(contextMenu)
  })
  
})

