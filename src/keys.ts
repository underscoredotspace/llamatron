interface Keys {
  [key: string]: boolean;
}

const keysElement = document.querySelector<HTMLPreElement>(".keys")!;

const setKeys = (keys: Keys) => {
  keysElement.innerText = Object.entries(keys)
    .filter(([_k, v]) => v)
    .map(([key]) => key)
    .join("\n");
};

const _keys = () => {
  const keys: Keys = {};

  document.addEventListener("keydown", ({ code }) => {
    if (!keys[code]) {
      keys[code] = true;
      setKeys(keys);
    }
  });

  document.addEventListener("keyup", ({ code }) => {
    if (keys[code]) {
      keys[code] = false;
      setKeys(keys);
    }
  });

  return keys;
};

export const keys = _keys();
