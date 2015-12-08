import app from 'app';
import BrowserWindow from 'browser-window';
import path from 'path';
import fs from 'fs';
import os from 'os';
import electron from 'electron';
import Promise from 'bluebird';
import { menu as appMenu } from './menu';

let mainWindow = null;

const gmailURL = 'http://www.gmail.com';
const gmailLogoutRe = 'https://mail.google.com/mail/logout';
const gmailAddAccountRe = 'https://accounts.google.com/AddSession';
const oktaRe = 'https://.*.okta.com/';
const gmailDomainRe = 'https://mail.google.com/';
const editInNewTabRe = 'https://mail.google.com/mail/.*#cmid%253D[0-9]+';

// Set os specific stuff
electron.ipcMain.on('update-dock', function(event, arg) {
  if (os.platform() === 'darwin') {
    if (arg > 0) {
      // Hide dock badge when unread mail count is 0
      app.dock.setBadge(arg.toString());
    } else {
      app.dock.setBadge('');
    }
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
      webSecurity: false,
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
  electron.Menu.setApplicationMenu(appMenu);

  createWindow();
  let page = mainWindow.webContents;

  page.on('dom-ready', () => {
    page.insertCSS(fs.readFileSync(path.join(__dirname, 'ui', 'gmail.css'), 'utf8'));
  });

  // Open links in default browser
  page.on('new-window', function(e, url) {
    if (url.match(gmailLogoutRe)) {
      e.preventDefault();
      gotoURL(url).then(() => { gotoURL(gmailURL) });
    } else if (url.match(editInNewTabRe)) {
      e.preventDefault();
      page.send('start-compose');
    } else if (url.match(gmailDomainRe) ||
               url.match(gmailAddAccountRe) ||
               url.match(oktaRe)) {
      e.preventDefault();
      page.loadURL(url);
    } else {
      e.preventDefault();
      require('shell').openExternal(url);
    }
  });

  // mainWindow.webContents.openDevTools();
});
