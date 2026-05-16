import * as THREE from "three";
import { getRandomVehicle } from "./vehicleLoader.js";

const trafficCars = [];

export function createTraffic(scene) {
  for (let i = 0; i < 10; i++) {
    const car = getRandomVehicle();
    car.scale.set(0.008, 0.008, 0.008);
    car.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    // random lane
    const lanes = [-3, 3];

    car.position.x = lanes[Math.floor(Math.random() * lanes.length)];

    // random khoảng cách
    car.position.z = -20 - i * 20;

    car.position.y = 0.5;

    scene.add(car);

    trafficCars.push(car);
  }
}

export function updateTraffic() {
  trafficCars.forEach((car) => {
    // xe chạy về phía player
    car.position.z += 0.05;

    // nếu vượt qua player
    if (car.position.z > 20) {
      const lanes = [-3, 3];

      car.position.x = lanes[Math.floor(Math.random() * lanes.length)];

      car.position.z = -200 - Math.random() * 200;
    }
  });
}

export function getTrafficCars() {
  return trafficCars;
}
