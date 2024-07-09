import type { RenderConfigScreenCtx } from "datocms-plugin-sdk";
import {
  Button,
  Canvas,
  FieldGroup,
  Form,
  SwitchField,
  TextareaField,
  TextField,
} from "datocms-react-ui";
import { Form as FormHandler, Field } from "react-final-form";

import styles from "./styles.module.css";

interface PropTypes {
  ctx: RenderConfigScreenCtx;
}

// config object starts empty
interface FreshInstallationParameters {}
// save user input
interface ValidParameters {
  buttonText: string;
  buttonLink: string;
  panelLocation: string;
  sectionDescription: string;
  sectionTitle: string;
  isWebhook: boolean;
}
// parameters can be empty or filled in
type Parameters = FreshInstallationParameters | ValidParameters;

export default function ConfigScreen({ ctx }: PropTypes) {
  const parameters = ctx.plugin.attributes.parameters;

  console.log("parameters", parameters);

  return (
    <Canvas ctx={ctx}>
      <FormHandler<Parameters>
        initialValues={parameters.values as ValidParameters}
        onSubmit={async (values) => {
          await ctx.updatePluginParameters({ values });
          ctx.notice("Settings updated successfully!");
        }}
      >
        {({ handleSubmit, submitting, dirty }) => (
          <Form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field name="sectionTitle">
                {({ input, meta: { error } }) => (
                  <TextField
                    required
                    id="sectionTitle"
                    label="Section title"
                    error={error}
                    {...input}
                  />
                )}
              </Field>
              <Field name="sectionDescription">
                {({ input, meta: { error } }) => (
                  <TextareaField
                    required
                    id="sectionDescription"
                    label="Section description"
                    error={error}
                    {...input}
                  />
                )}
              </Field>
            </FieldGroup>
            <hr className={styles["separator"]} />
            <FieldGroup>
              <Field name="buttonText">
                {({ input, meta: { error } }) => (
                  <TextField
                    required
                    id="buttonText"
                    label="Button text"
                    error={error}
                    {...input}
                  />
                )}
              </Field>
              <Field name="buttonLink">
                {({ input, meta: { error } }) => (
                  <TextField
                    required
                    id="buttonLink"
                    label="Button link"
                    error={error}
                    {...input}
                  />
                )}
              </Field>
              <Field name="isWebhook">
                {({ input, meta: { error } }) => (
                  <SwitchField
                    required
                    id="isWebhook"
                    label="Is this a webhook?"
                    error={error}
                    hint="If button is a webhook, it will not open in a new tab when clicked."
                    {...input}
                  />
                )}
              </Field>
            </FieldGroup>
            <hr className={styles["separator"]} />

            <hr className={styles["separator"]} />
            <Field name="panelLocation" defaultValue="global">
              {({ input, meta: { error } }) => (
                <TextField
                  id="panelLocation"
                  label="Panel location"
                  hint={
                    <div className={styles["hint"]}>
                      <p>
                        Comma separated list of model ID where sidebar panel
                        should display.
                      </p>
                      <p>
                        Example:{" "}
                        <span className={styles["inline-code"]}>
                          component_form, template_page.
                        </span>
                        <p>
                          Input string{" "}
                          <span className={styles["inline-code"]}>global</span>{" "}
                          to display the panel globally.
                        </p>
                      </p>
                    </div>
                  }
                  textInputProps={{ monospaced: true }}
                  error={error}
                  {...input}
                />
              )}
            </Field>

            <Button
              type="submit"
              fullWidth
              buttonSize="l"
              buttonType="primary"
              disabled={submitting || !dirty}
            >
              Save plugin settings
            </Button>
          </Form>
        )}
      </FormHandler>
    </Canvas>
  );
}
