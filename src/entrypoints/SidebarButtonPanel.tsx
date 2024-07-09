import { RenderItemFormSidebarPanelCtx } from "datocms-plugin-sdk";
import { Button, ButtonLink, Canvas } from "datocms-react-ui";
import { FC } from "react";
import styles from "./styles.module.css";
import { postWebhook } from "../utils/postWebhook";

interface SidebarButtonPanelProps {
  ctx: RenderItemFormSidebarPanelCtx;
}

const SidebarButtonPanel: FC<SidebarButtonPanelProps> = ({ ctx }) => {
  const pluginParams = ctx.plugin.attributes.parameters.values as Record<
    string,
    string
  >;

  return (
    <Canvas ctx={ctx}>
      <div className={styles["sidebar-panel"]}>
        {pluginParams.sectionDescription}
        {pluginParams.isWebhook ? (
          <Button
            buttonType="muted"
            onClick={() => postWebhook(pluginParams.buttonLink)}
          >
            {pluginParams.buttonText}
          </Button>
        ) : (
          <ButtonLink buttonType="muted" href={pluginParams.buttonLink}>
            {pluginParams.buttonText}
          </ButtonLink>
        )}
      </div>
    </Canvas>
  );
};

export default SidebarButtonPanel;
