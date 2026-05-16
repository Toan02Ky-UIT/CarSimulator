import * as THREE from "three";

const trafficCars = [];

export function createTraffic(scene) {
  for (let i = 0; i < 5; i++) {
    const geo = new THREE.BoxGeometry(1.5, 1, 3);

    const mat = new THREE.MeshStandardMaterial({
      color: Math.random() * 0xffffff,
    });

    const car = new THREE.Mesh(geo, mat);
    car.castShadow = true;
    car.receiveShadow = true;

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
    car.position.z += 0.2;

    // respawn
    if (car.position.z > 20) {
      const lanes = [-3, 3];

      car.position.x = lanes[Math.floor(Math.random() * lanes.length)];

      car.position.z = -100;
    }
  });
}

export function getTrafficCars() {
  return trafficCars;
}
