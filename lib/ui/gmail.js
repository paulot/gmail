var jQuery = require('jquery');

function Gmail() {
  this.gmailRootUrl = 'https://mail.google.com/mail/u/[0-9]+/';

  this.sidebar = jQuery('.nH').find('.no').find('.nH.oy8Mbf.nn.aeN');
  this.emailPane = jQuery(jQuery('.nH').find('.no').find('.nH.nn')[3]);
  this.profileView = jQuery('.gb_Pb.gb_le.gb_R');
  this.logoutButton = jQuery('#gb_71.gb_Ba.gb_vd.gb_Cd.gb_9a');

  this.settings = jQuery('.J-M.asi.aYO.jQjAxd').find('div:contains("Settings")');
}

Gmail.prototype.adjustProfilePicture = function() {
  this.profileView.css('min-width', '20px');
};

Gmail.prototype.adjustLogoutButton = function() {
  this.logoutButton.attr('target', '_blank');
};

Gmail.prototype.logout = function() {
  this.logoutButton[0].click();
};

Gmail.prototype.navigateTo = function(place) {
  var root = window.location.href.match(this.gmailRootUrl);
  if (root) {
    root = root[0];
    window.location.href = root + '#' + place;
  }
};

module.exports = Gmail;
