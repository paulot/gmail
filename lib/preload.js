window.onload = function() {
  var GmailApi = require('./libs/gmail');
  var jquery = require('jquery');

  window.poop = 0;
  window.Gmail = GmailApi(jquery);
};
