export const dispatchCustomEvent = (name, detail = {}) => {
  document.body.dispatchEvent(
    new CustomEvent(name, {
      bubbles: true,
      detail,
    })
  );
};
