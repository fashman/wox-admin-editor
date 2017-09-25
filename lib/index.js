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

require('./style.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * callback[Function]					//回调函数，返回{ keyName：当前值 }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * keyName[String]						//返回对象的属性名
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * readOnly[Boolean]					//是否只读
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * value[String]							//富文本框值
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 组件值的更改会触发回调函数，需要更新传入的value以达到更新组件的值
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               **/

var modules = {
  toolbar: [['bold', 'italic', 'underline', 'strike'], ['blockquote'], [{ 'header': 1 }, { 'header': 2 }], [{ 'list': 'ordered' }, { 'list': 'bullet' }], [{ 'indent': '-1' }, { 'indent': '+1' }], [{ 'size': ['small', false, 'large', 'huge'] }], [{ 'header': [1, 2, 3, 4, 5, 6, false] }], [{ 'color': [] }, { 'background': [] }], [{ 'font': [] }], [{ 'align': [] }], ['link', 'image', 'video'], ['clean']]
};

var EditorCom = function (_Component) {
  _inherits(EditorCom, _Component);

  function EditorCom() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, EditorCom);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = EditorCom.__proto__ || Object.getPrototypeOf(EditorCom)).call.apply(_ref, [this].concat(args))), _this), _this.handleChange = function (value) {
      var key = _this.props.keyName || 'value';
      _this.props.callback(_defineProperty({}, key, value));
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(EditorCom, [{
    key: 'render',
    value: function render() {
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

  return EditorCom;
}(_react.Component);

exports.default = EditorCom;
