import app from 'app';
import BrowserWindow from 'browser-window';
import path from 'path';

export let mainWindow = null;
const gmailURL = 'https://accounts.google.com/ServiceLogin?service=mail&continue=https://mail.google.com/mail/#identifier';

function createWindow() {
  if (mainWindow) return mainWindow;
  mainWindow = new BrowserWindow({
    title: 'Gmail',
    icon: path.join(__dirname, 'media', 'gmail.png'),
    width: 800,
    height: 600,
    minWidth: 400,
    minHeight: 200,
    titleBarStyle: 'hidden-inset',
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js'),
      webSecurity: false,
      plugins: true
    }
  });

  mainWindow.loadURL(gmailURL);
  mainWindow.on('close', app.quit);

  return mainWindow;
}

app.on('ready', () => {
  createWindow();
  // mainWindow.webContents.openDevTools();
});
