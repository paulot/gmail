import electron from 'electron';
import app from 'app';
import os from 'os';

const appName = app.getName();

const darwinTpl = [
{
  label: appName,
  submenu: [
    {
      label: `About ${appName}`,
      role: 'about'
    },
    { type: 'separator' },
    {
      label: 'Preferences...',
      accelerator: 'Cmd+,',
      click(item, focusedWindow) {
        if (focusedWindow)
          focusedWindow.webContents.send('navigate', 'settings/general');
      }
    },
    {
      label: 'Services',
      role: 'services',
      submenu: []
    },
    { type: 'separator' },
    {
      label: 'Log Out',
      click(item, focusedWindow) {
        if (focusedWindow)
          focusedWindow.webContents.send('logout');
      }
    },
    { type: 'separator' },
    {
      label: `Hide ${appName}`,
      accelerator: 'Cmd+H',
      role: 'hide'
    },
    {
      label: 'Hide Others',
      accelerator: 'Cmd+Shift+H',
      role: 'hideothers'
    },
    {
      label: 'Show All',
      role: 'unhide'
    },
    { type: 'separator' },
    {
      label: `Quit ${appName}`,
      accelerator: 'Cmd+Q',
      click() {
        app.quit();
      }
    }
  ]
},
{
  label: 'Mail',
  submenu: [
    {
      label: 'Compose',
      accelerator: 'CmdOrCtrl+N',
      click(item, focusedWindow) {
        if (focusedWindow)
          focusedWindow.webContents.send('start-compose');
      }
    },
    { type: 'separator' },
    {
      label: 'Go To...',
      submenu: [
        {
          label: 'Inbox',
          accelerator: 'CmdOrCtrl+I',
          click(item, focusedWindow) {
            if (focusedWindow)
              focusedWindow.webContents.send('navigate', 'inbox');
          }
        }, {
          label: 'Sent',
          accelerator: 'Shift+CmdOrCtrl+S',
          click(item, focusedWindow) {
            if (focusedWindow)
              focusedWindow.webContents.send('navigate', 'sent');
          }
        }, {
          label: 'Starred',
          accelerator: 'Shift+CmdOrCtrl+R',
          click(item, focusedWindow) {
            if (focusedWindow)
              focusedWindow.webContents.send('navigate', 'starred');
          }
        }, {
          label: 'Drafts',
          accelerator: 'Shift+CmdOrCtrl+D',
          click(item, focusedWindow) {
            if (focusedWindow)
              focusedWindow.webContents.send('navigate', 'drafts');
          }
        }, {
          label: 'Important',
          accelerator: 'Shift+CmdOrCtrl+I',
          click(item, focusedWindow) {
            if (focusedWindow)
              focusedWindow.webContents.send('navigate', 'imp');
          }
        }, {
          label: 'Chats',
          accelerator: 'Shift+CmdOrCtrl+C',
          click(item, focusedWindow) {
            if (focusedWindow)
              focusedWindow.webContents.send('navigate', 'chats');
          }
        }, {
          label: 'All',
          accelerator: 'Shift+CmdOrCtrl+A',
          click(item, focusedWindow) {
            if (focusedWindow)
              focusedWindow.webContents.send('navigate', 'all');
          }
        }, {
          label: 'Spam',
          accelerator: 'Shift+CmdOrCtrl+P',
          click(item, focusedWindow) {
            if (focusedWindow)
              focusedWindow.webContents.send('navigate', 'spam');
          }
        }, {
          label: 'Trash',
          accelerator: 'Shift+CmdOrCtrl+T',
          click(item, focusedWindow) {
            if (focusedWindow)
              focusedWindow.webContents.send('navigate', 'trash');
          }
        }
      ]
    }
  ]
},{
  label: 'Edit',
  submenu: [
    {
      label: 'Undo',
      accelerator: 'CmdOrCtrl+Z',
      role: 'undo'
    },
    {
      label: 'Redo',
      accelerator: 'Shift+CmdOrCtrl+Z',
      role: 'redo'
    },
    { type: 'separator' },
    {
      label: 'Cut',
      accelerator: 'CmdOrCtrl+X',
      role: 'cut'
    },
    {
      label: 'Copy',
      accelerator: 'CmdOrCtrl+C',
      role: 'copy'
    },
    {
      label: 'Paste',
      accelerator: 'CmdOrCtrl+V',
      role: 'paste'
    },
    {
      label: 'Select All',
      accelerator: 'CmdOrCtrl+A',
      role: 'selectall'
    }
  ]
},{
  label: 'Window',
  role: 'window',
  submenu: [
    {
      label: 'Minimize',
      accelerator: 'CmdOrCtrl+M',
      role: 'minimize'
    },
    {
      label: 'Close',
      accelerator: 'CmdOrCtrl+W',
      role: 'close'
    },
    { type: 'separator' },
    {
      label: 'Go Back',
      accelerator: 'CmdOrCtrl+Backspace',
      click(item, focusedWindow) {
        if (focusedWindow && focusedWindow.webContents.canGoBack())
          focusedWindow.webContents.goBack();
      }
    }, {
      label: 'Go Forward',
      accelerator: 'Cmd+Ctrl+F',
      click(item, focusedWindow) {
        if (focusedWindow && focusedWindow.webContents.canGoForward())
          focusedWindow.webContents.goForward();
      }
    }, {
      label: 'Reload',
      accelerator: 'CmdOrCtrl+R',
      click(item, focusedWindow) {
        if (focusedWindow)
          focusedWindow.webContents.reload();
      }
    },
    { type: 'separator' },
    {
      label: 'Bring All to Front',
      role: 'front'
    },
    {
      label: 'Toggle Full Screen',
      accelerator: 'Ctrl+Cmd+F',
      click(item, focusedWindow) {
        if (focusedWindow)
          focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
      }
    }
  ]
},{
  label: 'Settings',
  submenu: [
    {
      label: 'General',
      click(item, focusedWindow) {
        if (focusedWindow)
          focusedWindow.webContents.send('navigate', 'settings/general');
      }
    }, {
      label: 'Labels',
      click(item, focusedWindow) {
        if (focusedWindow)
          focusedWindow.webContents.send('navigate', 'settings/labels');
      }
    }, {
      label: 'Inbox',
      click(item, focusedWindow) {
        if (focusedWindow)
          focusedWindow.webContents.send('navigate', 'settings/inbox');
      }
    }, {
      label: 'Accounts and Import',
      click(item, focusedWindow) {
        if (focusedWindow)
          focusedWindow.webContents.send('navigate', 'settings/accounts');
      }
    }, {
      label: 'Filters and Blocked Addresses',
      click(item, focusedWindow) {
        if (focusedWindow)
          focusedWindow.webContents.send('navigate', 'settings/filters');
      }
    }, {
      label: 'Forwarding and POP/IMAP',
      click(item, focusedWindow) {
        if (focusedWindow)
          focusedWindow.webContents.send('navigate', 'settings/fwdandpop');
      }
    }, {
      label: 'Chat',
      click(item, focusedWindow) {
        if (focusedWindow)
          focusedWindow.webContents.send('navigate', 'settings/chat');
      }
    }, {
      label: 'Labs',
      click(item, focusedWindow) {
        if (focusedWindow)
          focusedWindow.webContents.send('navigate', 'settings/labs');
      }
    }, {
      label: 'Offline',
      click(item, focusedWindow) {
        if (focusedWindow)
          focusedWindow.webContents.send('navigate', 'settings/offline');
      }
    }, {
      label: 'Themes',
      click(item, focusedWindow) {
        if (focusedWindow)
          focusedWindow.webContents.send('navigate', 'settings/oldthemes');
      }
    }
  ]
}, {
		label: 'Help',
		role: 'help'
	}
];

const helpSubmenu = [
{
  label: `${appName}'s Project Website...`,
    click() {
      electron.shell.openExternal('https://github.com/paulot/gmail');
    }
},
{
  label: 'Report an Issue...',
  click() {
    const body = `
      **Please succinctly describe your issue and steps to reproduce it.**
      -
      ${app.getName()} ${app.getVersion()}
    ${process.platform} ${process.arch} ${os.release()}`;

    electron.shell.openExternal(`https://github.com/paulot/gmail/issues/new?body=${encodeURIComponent(body)}`);
  }
}
];

darwinTpl[darwinTpl.length - 1].submenu = helpSubmenu;

export let menu = electron.Menu.buildFromTemplate(darwinTpl);
