var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _react=_interopRequireDefault(require("react"));var _reactNative=require("react-native");var _jsxRuntime=require("react/jsx-runtime");var _this=this,_jsxFileName="C:\\Users\\mtour\\Documents\\Projects\\react-native-context-menu-view\\src\\index.js";var NativeContextMenu=(0,_reactNative.requireNativeComponent)("ContextMenu",null);var ContextMenu=function ContextMenu(props){return(0,_jsxRuntime.jsxs)(NativeContextMenu,Object.assign({},props,{children:[props.children,props.preview!=null&&_reactNative.Platform.OS==='ios'?(0,_jsxRuntime.jsx)(_reactNative.View,{nativeID:"ContextMenuPreview",children:props.preview}):null]}));};var _default=ContextMenu;exports.default=_default;