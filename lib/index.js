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

var WoxEditor = function (_Component) {
  _inherits(WoxEditor, _Component);

  function WoxEditor(props) {
    _classCallCheck(this, WoxEditor);

    var _this = _possibleConstructorReturn(this, (WoxEditor.__proto__ || Object.getPrototypeOf(WoxEditor)).call(this, props));

    _initialiseProps.call(_this);

    var contentBlock = (0, _htmlToDraftjs2.default)(props.value || '');
    var contentState = _draftJs.ContentState.createFromBlockArray(contentBlock.contentBlocks);
    var editorState = _draftJs.EditorState.createWithContent(contentState);

    _this.state = {
      editorState: editorState,
      firstRender: true, // 只能在第一次请求回来后，使用 `nextProps` 带过来的值更新编辑器
      needReciveProps: props.needReciveProps || false // 判断是使用 `nextProps` 来进行第一次更新，还是自己通过外部字段自己控制组件的冲渲染
    };
    return _this;
  }

  _createClass(WoxEditor, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      // if (!nextProps.needReciveProps || !this.state.firstRender) {
      //   return;
      // }

      var contentBlock = (0, _htmlToDraftjs2.default)(nextProps.value || '');
      var contentState = _draftJs.ContentState.createFromBlockArray(contentBlock.contentBlocks);
      var editorState = _draftJs.EditorState.createWithContent(contentState);

      // this.setState({
      //   editorState: editorState,
      //   firstRender: false
      // })
      this.state.editorState = editorState;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          placeholder = _props.placeholder,
          readOnly = _props.readOnly,
          url = _props.url;
      var editorState = this.state.editorState;

      var toolbarConfig = {
        options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'remove', 'history', 'image'],
        inline: { inDropdown: true },
        link: { inDropdown: true },
        history: { inDropdown: true },
        colorPicker: {
          colors: colors
        },
        image: {
          uploadCallback: this.uploadImageCallBack
        }
      };

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_reactDraftWysiwyg.Editor, {
          editorState: editorState,
          wrapperClassName: cx('wox-editor-wrapper'),
          editorClassName: cx('wox-editor'),
          onEditorStateChange: this.onEditorStateChange,
          placeholder: placeholder,
          readOnly: readOnly,
          localization: {
            locale: 'zh'
          },
          toolbar: toolbarConfig
        })
      );
    }
  }]);

  return WoxEditor;
}(_react.Component);

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.onEditorStateChange = function (editorState) {
    var keyName = _this2.props.keyName;

    var value = (0, _draftjsToHtml2.default)((0, _draftJs.convertToRaw)(editorState.getCurrentContent()));

    _this2.setState({
      editorState: editorState
    });
    _this2.props.callback(_defineProperty({}, keyName, value));
  };

  this.uploadImageCallBack = function (file) {
    var url = _this2.props.url;


    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('POST', url);
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
};

WoxEditor.propTypes = {
  callback: _propTypes2.default.func.isRequired,
  keyName: _propTypes2.default.string.isRequired,
  value: _propTypes2.default.string.isRequired,
  url: _propTypes2.default.string,
  readOnly: _propTypes2.default.bool
};

WoxEditor.defaultProps = {
  placeholder: '请输入信息',
  readOnly: false
};

exports.default = WoxEditor;
