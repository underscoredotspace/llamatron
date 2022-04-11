export const enableDebug = import.meta.env.DEV;

export const debugElement = document.querySelector<HTMLDivElement>(".debug")!;
if (enableDebug) {
  debugElement.hidden = false;
}
