import * as THREE from "three";

export function checkCollision(playerCar, trafficCars) {
  if (!playerCar) return false;

  const playerBox = new THREE.Box3().setFromObject(playerCar);

  for (const car of trafficCars) {
    const trafficBox = new THREE.Box3().setFromObject(car);

    if (playerBox.intersectsBox(trafficBox)) {
      return true;
    }
  }

  return false;
}
