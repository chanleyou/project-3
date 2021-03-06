// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require activestorage

//= require jquery3
//= require_tree .
//= require popper
//= require jquery_ujs
//= require bootstrap.min
//= require nested_form_fields
//= require moment

//= stub events_new.js
//= stub events_landing.js
//= stub events_index.js
//= stub wizform.js


$(document).ready(function(){
	$('[data-toggle="popover"]').popover();
});

$(document).ready(function(){
	$('[data-toggle="tooltip"]').tooltip()
});

