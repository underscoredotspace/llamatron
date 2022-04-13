export const enableDebug = import.meta.env.DEV;

export const debugElement = document.querySelector<HTMLDivElement>(".debug");
if (debugElement && enableDebug) {
  debugElement.hidden = false;
}
