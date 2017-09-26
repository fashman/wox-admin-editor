'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactQuill = require('react-quill');

var _reactQuill2 = _interopRequireDefault(_reactQuill);

require('react-quill/dist/quill.snow.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var colors = ['#000000', '#444444', '#666666', '#999999', '#cccccc', '#eeeeee', '#f3f3f3', '#ffffff', '#ff0000', '#ff9900', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#9900ff', '#ff00ff', '#f4cccc', '#fce5cd', '#fff2cc', '#d9ead3', '#d0e0e3', '#cfe2f3', '#d9d2e9', '#ead1dc', '#ea9999', '#f9cb9c', '#ffe599', '#b6d7a8', '#a2c4c9', '#9fc5e8', '#b4a7d6', '#d5a6bd', '#e06666', '#f6b26b', '#ffd966', '#93c47d', '#76a5af', '#6fa8dc', '#8e7cc3', '#c27ba0', '#cc0000', '#e69138', '#f1c232', '#6aa84f', '#45818e', '#3d85c6', '#674ea7', '#a64d79', '#990000', '#b45f06', '#bf9000', '#38761d', '#134f5c', '#0b5394', '#351c75', '#741b47', '#660000', '#783f04', '#7f6000', '#274e13', '#0c343d', '#073763', '#20124d', '#4c1130'];
var defaultToolbar = {
  textStyle: ['bold', 'italic', 'underline', 'strike'],
  quote: ['blockquote'],
  header: [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  list: [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  indent: [{ 'indent': '-1' }, { 'indent': '+1' }],
  size: [{ 'size': ['small', false, 'large', 'huge'] }],
  color: [{ 'color': colors }, { 'background': colors }],
  font: [{ 'font': [] }],
  align: [{ 'align': [] }],
  liv: ['link', 'image', 'video'],
  clean: ['clean']
};

var WoxEditor = function (_Component) {
  _inherits(WoxEditor, _Component);

  function WoxEditor() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, WoxEditor);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = WoxEditor.__proto__ || Object.getPrototypeOf(WoxEditor)).call.apply(_ref, [this].concat(args))), _this), _this.handleChange = function (value) {
      var key = _this.props.keyName || 'value';
      _this.props.callback(_defineProperty({}, key, value));
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(WoxEditor, [{
    key: 'render',
    value: function render() {
      var toolbar = Object.assign({}, defaultToolbar, this.props.toolbar || {});
      var modules = { toolbar: [] };

      for (var i in toolbar) {
        modules.toolbar.push(toolbar[i]);
      }
      return _react2.default.createElement(_reactQuill2.default, {
        placeholder: this.props.placeholder || '请输入信息',
        value: this.props.value,
        theme: 'snow',
        onChange: this.handleChange,
        modules: modules,
        readOnly: this.props.readOnly || false
      });
    }
  }]);

  return WoxEditor;
}(_react.Component);

exports.default = WoxEditor;
