var jQuery = require('jquery');
require('jquery-ui');

function Gmail() {
  this.sidebar = jQuery('.nH').find('.no').find('.nH.oy8Mbf.nn.aeN');
  this.emailPane = jQuery(jQuery('.nH').find('.no').find('.nH.nn')[3]);
  this.profileView = jQuery('.gb_Pb.gb_le.gb_R');
  this.logoutButton = jQuery('#gb_71.gb_Ba.gb_vd.gb_Cd.gb_9a');
}

Gmail.prototype.hideSidebar = function() {
  return this.sidebar.slideUp('medium', function() {
    this.emailPane.animate({width: '100%', 'padding-left': '20px'});
  }.bind(this));
}

Gmail.prototype.adjustProfilePicture = function() {
  this.profileView.css('min-width', '20px');
};

Gmail.prototype.adjustLogoutButton = function() {
  this.logoutButton.attr('target', '_blank');
};
module.exports = Gmail;
