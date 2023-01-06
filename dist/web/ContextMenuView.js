Object.defineProperty(exports,"__esModule",{value:true});exports.default=ContextMenuView;var _react=require("react");var _reactNative=require("react-native");var _jsxRuntime=require("react/jsx-runtime");var _jsxFileName="C:\\Users\\mtour\\Documents\\Projects\\react-native-context-menu-view\\src\\web\\ContextMenuView.js";var MENU_MAX_WIDTH=128;function ContextMenuView(props){var contextMenu=(0,_react.useRef)();var isOpen=(0,_react.useRef)(false);(0,_react.useEffect)(function(){contextMenu.current=document.createElement("div",{style:{display:"none",opacity:0}});return function(){var _contextMenu$current;(_contextMenu$current=contextMenu.current)==null?void 0:_contextMenu$current.remove();contextMenu.current=undefined;};},[]);(0,_react.useEffect)(function(){var onEvent=function onEvent(e){console.log("scroll target",e);if(e.target!==contextMenu.current&&isOpen.current){hideContextMenu();}};window.addEventListener("click",onEvent);window.addEventListener("scroll",onEvent,true);return function(){window.removeEventListener("click",onEvent);window.removeEventListener("scroll",onEvent);};},[contextMenu,isOpen]);function onPress(e){if(!props.dropdownMenuMode)return;toggleContextMenu(e.nativeEvent.pageX,e.nativeEvent.pageY);}function onLongPress(e){if(props.dropdownMenuMode)return;toggleContextMenu(e.nativeEvent.pageX,e.nativeEvent.pageY);}function toggleContextMenu(pageX,pageY){if(isOpen.current){hideContextMenu();isOpen.current=false;}else{showContextMenu(pageX,pageY);isOpen.current=true;}}function onContextMenuPress(index,name){if(isOpen.current)toggleContextMenu();props.onPress==null?void 0:props.onPress({nativeEvent:{index:index,indexPath:undefined,name:name}});}function showContextMenu(pageX,pageY){var _props$actions;var menu=contextMenu.current;if(!menu)return;var style={};style.display="flex";style.opacity=1;style.position="absolute";style.borderRadius=6+"px";style.transition="all 0.2s ease-out";style.overflowX="hidden";style.width=MENU_MAX_WIDTH+"px";style.maxWidth=MENU_MAX_WIDTH+"px";if(window.innerWidth-pageX<MENU_MAX_WIDTH){style.left=pageX-MENU_MAX_WIDTH+"px";}else{style.left=pageX+"px";}if(window.innerHeight-pageY<280){style.top=pageY-(window.innerHeight-pageY-48)+"px";}else{style.top=pageY+16+"px";}Object.assign(style,styles.menu,props.menuStyle);Object.assign(menu.style,style);var menuItemStyle={display:"flex",padding:10+"px",cursor:"pointer",transition:"background-color 0.2s ease-out"};Object.assign(menuItemStyle,styles.menuItem,props.menuItemStyle);var menuItems=(_props$actions=props.actions)==null?void 0:_props$actions.map(function(action,index){var item=document.createElement("div");Object.assign(item.style,menuItemStyle);item.onmouseenter=function(){item.style.backgroundColor="#eee";};item.onmouseleave=function(){item.style.backgroundColor="white";};item.onclick=function(){onContextMenuPress(index,action.title);};var text=document.createElement("div");if(action.destructive){text.style.color="crimson";}Object.assign(text.style,styles.menuItemText,props.menuItemTextStyle);text.innerText=action.title;item.appendChild(text);return item;});menuItems.forEach(function(item){menu.appendChild(item);});document.getElementById("root").append(menu);}function hideContextMenu(){var menu=contextMenu.current;if(!menu)return;menu.style.opacity=0;setTimeout(function(){menu.style.display="none";},200);while(menu.firstChild){menu.removeChild(menu.firstChild);}}return(0,_jsxRuntime.jsx)(_reactNative.Pressable,{disabled:props.disabled,style:props.style,onPress:onPress,onLongPress:onLongPress,children:props.children});}var styles=_reactNative.StyleSheet.create({menu:{backgroundColor:"white",flexDirection:"column",maxHeight:280,elevation:1,shadowColor:"gray",shadowRadius:2,shadowOpacity:0.4,shadowOffset:{width:0,height:0},borderWidth:1,borderColor:"#eaeaea",borderStyle:"solid"},menuItem:{width:"100%"},menuItemText:{fontFamily:"Sans-Serif"},menuItemSeparator:{borderBottomWidth:1,borderBottomColor:"lightgray"}});