export const debugElement = document.querySelector<HTMLDivElement>(".debug")!;
if (import.meta.env.DEV) {
  debugElement.hidden = false;
}
