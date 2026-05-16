import * as THREE from "three";

const cameraOffset = new THREE.Vector3(0, 4, 8);

export function updateCamera(camera, car) {
  if (!car) return;

  // clone offset
  const offset = cameraOffset.clone();

  // xoay offset theo hướng xe
  offset.applyAxisAngle(new THREE.Vector3(0, 1, 0), car.rotation.y);

  // vị trí mục tiêu của camera
  const targetPosition = car.position.clone().add(offset);

  // camera di chuyển mượt
  camera.position.lerp(targetPosition, 0.08);

  // camera nhìn vào xe
  camera.lookAt(car.position);
}
