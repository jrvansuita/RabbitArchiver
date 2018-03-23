/*jshint esversion: 6 */

function later(delay, value) {
  return new Promise(resolve => setTimeout(resolve, delay, value));
}

String.prototype.contains = function(it) {
  return this.indexOf(it) != -1;
};

function paintBrush(el, name) {
  $(el).css('background-color', strToColor(name));
}

function strToColor(str) {
  var shortened = hashCode(str) % 160;
  return 'hsl(' + shortened + ', 45%, 90%)';
}

function hashCode(str) { // java String#hashCode
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}