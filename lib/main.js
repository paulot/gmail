import app from 'app';
import BrowserWindow from 'browser-window';
import path from 'path';
import fs from 'fs';
import os from 'os';
import electron from 'electron';
import Promise from 'bluebird';

export let mainWindow = null;
// const gmailURL = 'https://accounts.google.com/ServiceLogin?service=mail&continue=https://mail.google.com/mail/#identifier';
const gmailURL = 'http://www.gmail.com';

const gmailLogoutUrl = 'https://mail.google.com/mail/logout';
const gmailAddAccountUrl = 'https://accounts.google.com/AddSession';
const oktaUrl = 'https://linkedin.okta.com/';
const gmailDomain = 'https://mail.google.com/';

// Set os specific stuff
electron.ipcMain.on('update-dock', function(event, arg) {
  if (os.platform() === 'darwin') {
    app.dock.setBadge(arg.toString());
  }
});


function createWindow() {
  if (mainWindow) return mainWindow;
  mainWindow = new BrowserWindow({
    title: 'Gmail',
    icon: path.join(__dirname, 'media', 'gmail.png'),
    width: 800,
    height: 600,
    minWidth: 400,
    minHeight: 200,
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js'),
      webSecurity: true,
      plugins: true
    }
  });

  mainWindow.loadURL(gmailURL);
  mainWindow.maximize();
  mainWindow.on('close', app.quit);

  return mainWindow;
}

function gotoURL(url) {
  return new Promise((resolve) => {
    mainWindow.webContents.on('did-finish-load', resolve);
    mainWindow.webContents.loadURL(url);
  });
}


app.on('ready', () => {
  createWindow();
  let page = mainWindow.webContents;

  page.on('dom-ready', () => {
    page.insertCSS(fs.readFileSync(path.join(__dirname, 'ui', 'gmail.css'), 'utf8'));
  });

  // Open links in default browser
  page.on('new-window', function(e, url) {
    if (url.includes(gmailLogoutUrl)) {
      e.preventDefault();
      gotoURL(url).then(() => { gotoURL(gmailURL) });
    } else if (url.includes(gmailDomain) ||
               url.includes(gmailAddAccountUrl) ||
               url.includes(oktaUrl)) {
      e.preventDefault();
      page.loadURL(url);
    } else {
      e.preventDefault();
      require('shell').openExternal(url);
    }
  });

  // mainWindow.webContents.openDevTools();
});
