import * as THREE from "three";

import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const loader = new GLTFLoader();

const vehicleModels = {};

export async function loadVehicleModels() {
  const vehicles = {
    banana_car: "./models/cartoon banana car.glb",
    car: "./models/Car.glb",
    police_car: "./models/Police Car.glb",
  };

  const promises = [];

  for (const key in vehicles) {
    const promise = new Promise((resolve) => {
      loader.load(
        vehicles[key],
        (gltf) => {
          vehicleModels[key] = gltf.scene;
          resolve();
        },
        undefined, // onProgress
        (error) => {
          console.error("Lỗi khi load model: ", vehicles[key], error);

          // Fallback: Nếu lỗi không load được 3D model thì dùng khối hộp đỏ để game vẫn chạy
          const fallbackGeo = new THREE.BoxGeometry(1.5, 1, 3);
          const fallbackMat = new THREE.MeshStandardMaterial({
            color: 0xff0000,
          });
          vehicleModels[key] = new THREE.Mesh(fallbackGeo, fallbackMat);
          resolve();
        },
      );
    });

    promises.push(promise);
  }

  await Promise.all(promises);

  console.log("All vehicle models loaded!");
}

export function getRandomVehicle() {
  const keys = Object.keys(vehicleModels);

  const randomKey = keys[Math.floor(Math.random() * keys.length)];

  return vehicleModels[randomKey].clone();
}
