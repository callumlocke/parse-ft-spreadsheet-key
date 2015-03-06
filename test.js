/*jshint node:true*/
/*global describe, it*/

'use strict';

var expect = require('chai').expect;
var parseSpreadsheetKey = require('./index.js');

describe('parse-ft-spreadsheet-key', function () {
  var key = '0Ajt08GcPGJRbdFJUZWZfZ3M1V0xDaTFBckJnNENCSGc';
  var gsURLs = [
    'https://docs.google.com/a/ft.com/spreadsheet/ccc?key=' + key,
    'https://docs.google.com/a/ft.com/spreadsheet/ccc?key=' + key + '#hash',
    'https://docs.google.com/a/ft.com/spreadsheet/ccc?key=' + key + '&foo=bar',
    'https://docs.google.com/a/ft.com/spreadsheet/ccc?key=' + key + '&foo=bar#hash',

    // new-style urls...
    'https://docs.google.com/a/ft.com/spreadsheets/d/' + key,
    'https://docs.google.com/a/ft.com/spreadsheets/d/' + key + '#gid=0',
    'https://docs.google.com/a/ft.com/spreadsheets/d/' + key + '/edit',
    'https://docs.google.com/a/ft.com/spreadsheets/d/' + key + '/edit#gid=0',

    'https://docs.google.com/a/ft.com/spreadsheets/foo/' + key,
    'https://docs.google.com/a/ft.com/spreadsheets/foo/' + key + '#gid=0',
    'https://docs.google.com/a/ft.com/spreadsheets/foo/' + key + '/edit',
    'https://docs.google.com/a/ft.com/spreadsheets/foo/' + key + '/edit#gid=0',
  ];
  var berthaURLs = [];
  ([
    'bertha.ig.ft.com',
    'spottiswood.herokuapp.com',
    'staging.bertha.ig.ft.com',
    'spottiswood-tupp.herokuapp.com'
  ]).forEach(function (host) {
    berthaURLs = berthaURLs.concat([
      'http://' + host + '/view/publish/ig/' + key,
      'http://' + host + '/republish/publish/ig/' + key + '/basic,foo',
      'http://' + host + '/view/publish/ig/' + key + '?callback=hi'
    ]);
  });
  var invalidStrings = [
    'ab==gsgsc....asdfasdf 891 sd', // invalid chars
    'https://mops.google.com/a/ft.com/spreadsheet/ccc?key=' + key, // wrong hostname
    '0Ajt08GcPGJRbdFJUZWZfZ3M1V0xDaTFBckJnNENCSGc/', // slash at end
    '0Ajt08GcPGJRbdFJUZWZfZ', // too short
    '0Ajt08GcPGJRbdFJUZWZfZ3M1V0xDaTFBckJnNENCSGc0Ajt08GcPGJRbdFJUZWZfZ3M1V0xDaTFBckJnNENCSGc' // too long
  ];


  it('handles a plain key', function () {
    expect(parseSpreadsheetKey(key)).to.equal(key);
  });

  it('handles a Google Spreadsheets URL', function () {
    gsURLs.forEach(function (url) {
      expect(parseSpreadsheetKey(url)).to.equal(key);
    });
  });

  it('handles a Bertha URL at any of the known Bertha hosts', function () {
    berthaURLs.forEach(function (url) {
      expect(parseSpreadsheetKey(url)).to.equal(key);
    });
  });

  it('throws on invalid strings', function () {
    invalidStrings.forEach(function (str) {
      expect(function () {
        parseSpreadsheetKey(str);
      }).to.throw(/Cannot parse spreadsheet key from value/);
    });
  });

  it('returns null for invalid strings if "silent" flag is passed', function () {
    invalidStrings.forEach(function (str) {
      expect(function () {
        expect(parseSpreadsheetKey(str, true)).to.equal(null);
      }).to.not.throw(Error);
    });
  });
});
