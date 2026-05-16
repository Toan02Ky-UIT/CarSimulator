import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// Import các module của teamgi
import { setupEnvironment } from "./environment.js";
import { loadCarModel } from "./carModel.js";
import { setupControls } from "./controls.js";
import { updateCar, getSpeed } from "./physics.js";
import { updateCamera } from "./cameraSystem.js";
import { createRoad } from "./road.js";
import { createTraffic, updateTraffic, getTrafficCars } from "./traffic.js";
import { checkCollision } from "./collision.js";
import { updateUI, showGameOver, hideGameOver, resetScore } from "./ui.js";
import { loadVehicleModels } from "./vehicleLoader.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xbfdfff);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.set(5, 5, 8);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true;

renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;

renderer.toneMappingExposure = 1.2;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// const controls = new OrbitControls(camera, renderer.domElement);
let playerCar = null;
let gameOver = false;

setupEnvironment(scene);
createRoad(scene);
async function init() {
  await loadVehicleModels();

  createTraffic(scene);

  animate();
}

init();
setupControls();

loadCarModel(scene, (car) => {
  playerCar = car;
});

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
  requestAnimationFrame(animate);

  updateCar(playerCar);

  updateCamera(camera, playerCar);

  updateTraffic(playerCar);

  updateUI(getSpeed());

  if (!gameOver) {
    const hit = checkCollision(playerCar, getTrafficCars());

    if (hit) {
      gameOver = true;

      showGameOver();

      setTimeout(() => {
        // reset player
        playerCar.position.set(0, 0.1, 0);

        playerCar.rotation.y = 0;

        // reset traffic
        getTrafficCars().forEach((car, index) => {
          car.position.z = -20 - index * 50;
        });

        hideGameOver();

        resetScore();

        gameOver = false;
      }, 1500);
    }
  }

  renderer.render(scene, camera);
}
// animate();

import { handleTransformations, setSelectedObject } from "./geometry.js";

window.addEventListener("keydown", (event) => {
  handleTransformations(event.key);
});

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener("click", (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(scene.children, true);

  if (intersects.length > 0) {
    let target = intersects[0].object;

    if (target.geometry.type === "PlaneGeometry") return;

    while (target.parent && target.parent !== scene) {
      target = target.parent;
    }

    setSelectedObject(target);
  } else {
    setSelectedObject(null);
  }
});
