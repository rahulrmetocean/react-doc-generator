"use strict";

var _generatereactdoc = _interopRequireDefault(require("../generatereactdoc"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

require("@babel/polyfill");

describe('GenerateReactDoc', function () {
  it('Whole thing should work',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var output;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _generatereactdoc["default"])({
              sourceDir: _path["default"].resolve(__dirname, '../__mocks__'),
              extensions: ['js', 'jsx'],
              outputDir: _path["default"].resolve(__dirname, '../__mocks__/output.md')
            });

          case 2:
            output = _context.sent;
            expect(output).toMatchSnapshot();

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
});