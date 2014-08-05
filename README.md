# parse-ft-spreadsheet-key

Simple function to get the key from a Google Spreadsheets URL or Bertha URL.


## install

### front-end

```sh
$ bower install --save parse-ft-spreadsheet-key
```

```html
<script src="bower_components/parse-ft-spreadsheet-key/index.js"></script>
```

The function will be available as `IG.parseSpreadsheetKey(str)`.


### node.js

```sh
$ npm install --save-dev  parse-ft-spreadsheet-key
```

```js
var parseSpreadsheetKey = require('parse-ft-spreadsheet-key');
```


## usage

```js
var key = parseSpreadsheetKey('https://docs.google.com/a/ft.com/spreadsheet/ccc?key=0Ajt08GcPGJRbdFJUZWZfZ6M1V0xDaTFBckJnNENC8Gc');

// key === '0Ajt08GcPGJRbdFJUZWZfZ6M1V0xDaTFBckJnNENC8Gc'
```

Notes:

* takes valid Bertha URL or Google Spreadsheets URL
* if you pass a plain key on its own, it will return it untouched
* throws an error if something invalid is found, unless you pass `true` as a second argument (`silent`), in which case it just returns null
