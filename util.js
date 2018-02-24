/*jshint esversion: 6 */

function later(delay, value) {
  return new Promise(resolve => setTimeout(resolve, delay, value));
}

String.prototype.contains = function(it) {
  return this.indexOf(it) != -1;
};