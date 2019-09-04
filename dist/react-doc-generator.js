#!/usr/bin/env node
"use strict";

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _generatereactdoc = _interopRequireDefault(require("./generatereactdoc"));

var _command = _interopRequireDefault(require("./lib/command.js"));

var _handlebars = _interopRequireDefault(require("handlebars"));

var _colors = _interopRequireDefault(require("colors"));

var _cliTable = _interopRequireDefault(require("cli-table"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

require("@babel/polyfill");

_handlebars["default"].registerHelper("inc", function (value, options) {
  return parseInt(value, 10) + 1;
});

_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee() {
  var pkg, template, table, _ref2, _ref3, templateData, cliOutput, outputFile;

  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          pkg = require("../package.json");
          template = _handlebars["default"].compile("".concat(_fs["default"].readFileSync(_path["default"].join(__dirname, "template.handlebars"))));
          table = new _cliTable["default"]({
            head: [_colors["default"].cyan("Path"), _colors["default"].cyan("Components"), _colors["default"].cyan("Status")]
          });
          console.log(_colors["default"].white("\n\nREACT DOC GENERATOR v".concat(pkg.version)));
          console.log(_colors["default"].white("by Marcin Borkowski <marborkowski@gmail.com>"));
          _context.prev = 5;

          if (!(_command["default"].args.length !== 1)) {
            _context.next = 12;
            break;
          }

          console.log(_command["default"].args);
          console.log("".concat(_colors["default"].red("Please specify <dir> as the first argument!")));

          _command["default"].help();

          _context.next = 23;
          break;

        case 12:
          _context.next = 14;
          return (0, _generatereactdoc["default"])({
            sourceDir: _command["default"].args[0],
            extensions: _command["default"].extensions,
            excludePatterns: _command["default"].excludePatterns,
            ignoreDirectory: _command["default"].ignore,
            outputDir: _command["default"].output
          });

        case 14:
          _ref2 = _context.sent;
          _ref3 = _slicedToArray(_ref2, 2);
          templateData = _ref3[0];
          cliOutput = _ref3[1];
          console.log(_command["default"].docusaurusSidebar, 'sidebar');
          outputFile = _fs["default"].createWriteStream(_command["default"].output);
          outputFile.write(template(_objectSpread({}, templateData, {
            id: _command["default"].docusaurusId,
            sidebarLabel: _command["default"].docusaurusSidebar,
            documentTitle: _command["default"].title
          })));
          cliOutput.forEach(function (cliRow) {
            table.push(cliRow);
          });
          console.log(table.toString());

        case 23:
          _context.next = 28;
          break;

        case 25:
          _context.prev = 25;
          _context.t0 = _context["catch"](5);
          console.error("Error occurred", _context.t0);

        case 28:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, null, [[5, 25]]);
}))();