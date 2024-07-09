import {
  connect,
  RenderItemFormSidebarPanelCtx,
  ItemType,
  InitPropertiesAndMethods,
} from "datocms-plugin-sdk";
import "datocms-react-ui/styles.css";
import ConfigScreen from "./entrypoints/ConfigScreen";
import { render } from "./utils/render";
import SidebarButtonPanel from "./entrypoints/SidebarButtonPanel";
import { getPanelLocations } from "./utils/getPanelLocations";

connect({
  // plugin setup form
  renderConfigScreen(ctx) {
    return render(<ConfigScreen ctx={ctx} />);
  },
  // define sidebar panel attributes
  itemFormSidebarPanels(itemType: ItemType, ctx: InitPropertiesAndMethods) {
    const pluginParams = ctx.plugin.attributes.parameters.values as Record<
      string,
      string
    >;
    const locationsStr = pluginParams.panelLocation;
    const locationsArr = getPanelLocations(locationsStr as string);

    switch (true) {
      case locationsArr.includes("global"):
      case locationsArr.includes(itemType.attributes.api_key):
        return [
          {
            id: "sidebar-button",
            label: pluginParams.sectionTitle,
            startOpen: true,
            placement: ["before", "links"],
          },
        ];
      default:
        return [];
    }
  },
  // display sidebar panel
  renderItemFormSidebarPanel(
    _sidebarPanelId,
    ctx: RenderItemFormSidebarPanelCtx
  ) {
    render(<SidebarButtonPanel ctx={ctx} />);
  },
});
