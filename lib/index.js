'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDraftWysiwyg = require('react-draft-wysiwyg');

require('react-draft-wysiwyg/dist/react-draft-wysiwyg.css');

var _draftJs = require('draft-js');

var _draftjsToHtml = require('draftjs-to-html');

var _draftjsToHtml2 = _interopRequireDefault(_draftjsToHtml);

var _htmlToDraftjs = require('html-to-draftjs');

var _htmlToDraftjs2 = _interopRequireDefault(_htmlToDraftjs);

var _bind = require('classnames/bind');

var _bind2 = _interopRequireDefault(_bind);

var _styleMod = require('./style.mod.less');

var _styleMod2 = _interopRequireDefault(_styleMod);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var cx = _bind2.default.bind(_styleMod2.default);
var colors = ['#000000', '#444444', '#666666', '#999999', '#cccccc', '#eeeeee', '#f3f3f3', '#ffffff', '#ff0000', '#ff9900', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#9900ff', '#ff00ff', '#f4cccc', '#fce5cd', '#fff2cc', '#d9ead3', '#d0e0e3', '#cfe2f3', '#d9d2e9', '#ead1dc', '#ea9999', '#f9cb9c', '#ffe599', '#b6d7a8', '#a2c4c9', '#9fc5e8', '#b4a7d6', '#d5a6bd', '#e06666', '#f6b26b', '#ffd966', '#93c47d', '#76a5af', '#6fa8dc', '#8e7cc3', '#c27ba0', '#cc0000', '#e69138', '#f1c232', '#6aa84f', '#45818e', '#3d85c6', '#674ea7', '#a64d79', '#990000', '#b45f06', '#bf9000', '#38761d', '#134f5c', '#0b5394', '#351c75', '#741b47', '#660000', '#783f04', '#7f6000', '#274e13', '#0c343d', '#073763', '#20124d', '#4c1130'];
/**
 * 组件名遵循 `Wox` 前缀的规范
 */

var WoxEditor = function (_Component) {
  _inherits(WoxEditor, _Component);

  function WoxEditor(props) {
    _classCallCheck(this, WoxEditor);

    var _this = _possibleConstructorReturn(this, (WoxEditor.__proto__ || Object.getPrototypeOf(WoxEditor)).call(this, props));

    _this.uploadImageCallBack = function (file) {
      return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', _this.props.url);
        xhr.setRequestHeader('Authorization', 'Client-ID XXXXX');
        var data = new FormData();
        data.append('image', file);
        xhr.send(data);
        xhr.addEventListener('load', function () {
          var response = JSON.parse(xhr.responseText);
          var data = { link: response.data.url };
          resolve({ data: data });
        });
        xhr.addEventListener('error', function () {
          var error = JSON.parse(xhr.responseText);
          reject(error);
        });
      });
    };

    _this.onEditorStateChange = function (editorState) {
      var value = (0, _draftjsToHtml2.default)((0, _draftJs.convertToRaw)(editorState.getCurrentContent()));
      var keyName = _this.props.keyName;
      _this.setState({
        editorState: editorState
      });
      _this.props.callback(_defineProperty({}, keyName, value));
    };

    _this.state = {
      callback: props.callback,
      keyName: props.keyName,
      editorState: '',
      a: 1
    };

    return _this;
  }

  _createClass(WoxEditor, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {

      if (nextProps.value && this.state.a > 1) {
        return;
      }
      if (nextProps.value) {
        this.setState({ a: 2 });
      }
      var contentBlock = (0, _htmlToDraftjs2.default)(nextProps.value || '');
      var contentState = _draftJs.ContentState.createFromBlockArray(contentBlock.contentBlocks);
      var editorState = _draftJs.EditorState.createWithContent(contentState);
      this.setState({
        editorState: editorState
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_reactDraftWysiwyg.Editor, {
        editorState: this.state.editorState,
        wrapperClassName: cx('wox-wrapper'),
        editorClassName: cx('wox-editor'),
        onEditorStateChange: this.onEditorStateChange,
        placeholder: this.props.placeholder,
        readOnly: this.props.readOnly,
        localization: {
          locale: 'zh'
        },
        toolbar: {
          inline: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true },
          image: { uploadCallback: this.uploadImageCallBack },
          colorPicker: {
            colors: colors
          }
        }
      });
    }
  }]);

  return WoxEditor;
}(_react.Component);

WoxEditor.propTypes = {
  callback: _propTypes2.default.func.isRequired,
  url: _propTypes2.default.string.isRequired,
  keyName: _propTypes2.default.string.isRequired,
  value: _propTypes2.default.string.isRequired,
  readOnly: _propTypes2.default.bool
};
WoxEditor.defaultProps = {
  placeholder: '请输入信息',
  readOnly: false
};

exports.default = WoxEditor;
