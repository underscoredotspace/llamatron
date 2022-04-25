export const listenToEvents = (
  events: Array<keyof DocumentEventMap>,
  callback: (evt: Event) => void
) => events.map((event) => document.addEventListener(event, callback));
