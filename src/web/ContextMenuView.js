import { useEffect, useRef } from "react";
import { Pressable, StyleSheet } from "react-native";

const MENU_MAX_WIDTH = 140;

export default function ContextMenuView(props) {
  const contextMenu = useRef();
  const isOpen = useRef(false);

  useEffect(() => {
    contextMenu.current = document.createElement("div", {
      style: {
        display: "none",
        opacity: 0,
      },
    });

    return () => {
      contextMenu.current?.remove();
      contextMenu.current = undefined;
    };
  }, []);

  useEffect(() => {
    const onEvent = (e) => {
      if (e.target !== contextMenu.current && isOpen.current) {
        hideContextMenu();
      }
    };

    window.addEventListener("click", onEvent, true);
    window.addEventListener("scroll", onEvent, true);

    return () => {
      window.removeEventListener("click", onEvent);
      window.removeEventListener("scroll", onEvent);
    };
  }, [contextMenu, isOpen]);

  function onPress(e) {
    if (!props.dropdownMenuMode) return;

    toggleContextMenu(e.nativeEvent.pageX, e.nativeEvent.pageY);
  }

  function onLongPress(e) {
    if (props.dropdownMenuMode) return;

    toggleContextMenu(e.nativeEvent.pageX, e.nativeEvent.pageY);
  }

  function toggleContextMenu(pageX, pageY) {
    if (isOpen.current) {
      hideContextMenu();
      isOpen.current = false;
    } else {
      showContextMenu(pageX, pageY);
      isOpen.current = true;
    }
  }

  function onContextMenuPress(index, name) {
    if (isOpen.current) toggleContextMenu();

    props.onPress?.({
      nativeEvent: {
        index,
        indexPath: undefined,
        name,
      },
    });
  }

  function showContextMenu(pageX, pageY) {
    const menu = contextMenu.current;

    if (!menu) return;

    let style = {};

    style.display = "flex";
    style.opacity = 1;
    style.position = "absolute";
    style.borderRadius = `${6}px`;
    style.transition = "all 0.2s ease-out";
    style.overflowX = "hidden";
    style.width = `${MENU_MAX_WIDTH}px`;
    style.maxWidth = `${MENU_MAX_WIDTH}px`;

    if (window.innerWidth - pageX < MENU_MAX_WIDTH) {
      style.left = `${pageX - MENU_MAX_WIDTH}px`;
    } else {
      style.left = `${pageX}px`;
    }

    if (window.innerHeight - pageY < 280) {
      style.top = `${pageY - (window.innerHeight - pageY - 48)}px`;
    } else {
      style.top = `${pageY + 16}px`;
    }

    Object.assign(style, styles.menu, props.menuStyle);

    Object.assign(menu.style, style);

    let menuItemStyle = {
      display: "flex",
      boxSizing: 'border-box',
      padding: `${10}px`,
      cursor: "pointer",
      transition: "background-color 0.2s ease-out",
    };

    Object.assign(menuItemStyle, styles.menuItem, props.menuItemStyle);

    // For each element in props.actions, add a child to contextMenu
    // with the appropriate style and text
    const menuItems = props.actions?.map((action, index) => {
      const item = document.createElement("div");

      Object.assign(item.style, menuItemStyle);

      item.onmouseenter = () => {
        item.style.backgroundColor = "#eee";
      };
      item.onmouseleave = () => {
        item.style.backgroundColor = "white";
      };

      item.onclick = () => {
        onContextMenuPress(index, action.title);
      };

      const text = document.createElement("div");

      if (action.destructive) {
        text.style.color = "crimson";
      }

      Object.assign(text.style, styles.menuItemText, props.menuItemTextStyle);

      text.innerText = action.title;

      item.appendChild(text);

      return item;
    });

    menuItems.forEach((item) => {
      menu.appendChild(item);
    });

    document.getElementById("root").append(menu);
  }

  function hideContextMenu() {
    const menu = contextMenu.current;

    if (!menu) return;

    menu.style.opacity = 0;
    setTimeout(() => {
      menu.style.display = "none";
    }, 200);

    while (menu.firstChild) {
      menu.removeChild(menu.firstChild);
    }
  }

  return (
    <Pressable
      disabled={props.disabled}
      style={props.style}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      {props.children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  menu: {
    backgroundColor: "white",
    flexDirection: "column",
    maxHeight: 280,
    elevation: 1,
    shadowColor: "gray",
    shadowRadius: 2,
    shadowOpacity: 0.4,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    borderWidth: 1,
    borderColor: "#eaeaea",
    borderStyle: "solid",
  },
  menuItem: {
    width: "100%",
  },
  menuItemText: {
    fontFamily: "Sans-Serif",
  },
  menuItemSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
});
