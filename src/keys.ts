interface Keys {
  [key: string]: boolean;
}

const keysElement = document.querySelector<HTMLDivElement>(".keys")!;
const preElement = keysElement.querySelector<HTMLDivElement>("pre")!;

if (import.meta.env.DEV) {
  keysElement.hidden = false;
}

const setKeys = (keys: Keys) => {
  if (import.meta.env.PROD) {
    return;
  }

  preElement.innerText = Object.entries(keys)
    .filter(([_k, v]) => v)
    .map(([key]) => key)
    .join("\n");
};

const _keys = () => {
  const keys: Keys = {};

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
