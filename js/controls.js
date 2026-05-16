export const keys = {
  forward: false,
  backward: false,
  left: false,
  right: false,
};

export function setupControls() {
  window.addEventListener("keydown", (e) => {
    switch (e.key.toLowerCase()) {
      case "w":
        keys.forward = true;
        break;

      case "s":
        keys.backward = true;
        break;

      case "a":
        keys.left = true;
        break;

      case "d":
        keys.right = true;
        break;
    }
  });

  window.addEventListener("keyup", (e) => {
    switch (e.key.toLowerCase()) {
      case "w":
        keys.forward = false;
        break;

      case "s":
        keys.backward = false;
        break;

      case "a":
        keys.left = false;
        break;

      case "d":
        keys.right = false;
        break;
    }
  });
}
