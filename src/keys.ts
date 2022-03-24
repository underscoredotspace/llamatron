interface Keys {
  [key: string]: boolean;
}

const _keys = () => {
  const keys: Keys = {};

  document.addEventListener("keydown", ({ code }) => {
    if (!keys[code]) {
      keys[code] = true;
    }
  });

  document.addEventListener("keyup", ({ code }) => {
    if (keys[code]) {
      keys[code] = false;
    }
  });

  return keys;
};

export const keys = _keys();
