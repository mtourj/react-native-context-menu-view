import WebContextMenu from "./web/ContextMenuView";

const ContextMenu = (props) => {
  return <WebContextMenu {...props}>{props.children}</WebContextMenu>;
};

export default ContextMenu;
