import { debugElement, enableDebug } from "./debug";

interface Keys {
  [key: string]: boolean;
}

const keysElement = debugElement?.querySelector<HTMLDivElement>("pre");

const setKeys = (keys: Keys) => {
  if (!keysElement || !enableDebug) {
    return;
  }

  keysElement.innerText = Object.entries(keys)
    .filter(([_k, v]) => v)
    .map(([key]) => key)
    .join("\n");
};

const _keys = () => {
  const keys: Keys = {};

  document.addEventListener("keypress", ({ code }) => {
    if (code === "KeyP") {
      keys["pause"] = !keys["pause"];
    }
  });

  document.addEventListener("keydown", ({ code, shiftKey }) => {
    if (!keys[code]) {
      keys[code] = true;
      keys["Shift"] = shiftKey;
      setKeys(keys);
    }
  });

  document.addEventListener("keyup", ({ code, shiftKey }) => {
    if (keys[code]) {
      keys[code] = false;
      keys["Shift"] = shiftKey;
      setKeys(keys);
    }
  });

  return keys;
};

export const keys = _keys();
