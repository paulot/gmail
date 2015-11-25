window.onload = function() {
  var GmailApi = require('node-gmail');
  var jquery = require('jquery');
  var page = require('./ui/gmail.js');
  var ipc = require('electron').ipcRenderer

  window.j = jquery;
  window.page = new page();
  window.Gmail = GmailApi(jquery);

  function updateDock() {
    ipc.send('update-dock', window.Gmail.get.unread_inbox_emails());
  }

  function setDockUpdaters() {
    var updateEvents = ['new_email', 'refresh', 'unread', 'read',
                        'delete', 'move_to_inbox', 'move_to_label'];
    for (var i = 0; i < updateEvents.length; i++) {
      window.Gmail.observe.on(updateEvents[i], updateDock);
    }
  }

  ipc.on('start-compose', window.Gmail.compose.start_compose.bind(window.page));
  ipc.on('logout', window.page.logout.bind(window.page));
  ipc.on('navigate', (event, place) => {
    window.page.navigateTo(place);
  });

  updateDock();
  setDockUpdaters();
  window.page.adjustProfilePicture();
  window.page.adjustLogoutButton();
  window.page.applyHangoutsCss();
};
