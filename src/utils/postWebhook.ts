export const postWebhook = async (href: string) => {
  try {
    await fetch(href, {
      method: "POST",
    });
  } catch (error) {
    console.error(error);
  }
};
