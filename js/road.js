import * as THREE from "three";

export function createRoad(scene) {
  // ===== GRASS =====

  const groundGeo = new THREE.PlaneGeometry(200, 200);

  const groundMat = new THREE.MeshStandardMaterial({
    color: 0x3a7a3a,
  });

  const ground = new THREE.Mesh(groundGeo, groundMat);

  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;

  scene.add(ground);

  // ===== ROAD =====

  const roadGeo = new THREE.PlaneGeometry(12, 200);

  const roadMat = new THREE.MeshStandardMaterial({
    color: 0x111111,
  });

  const road = new THREE.Mesh(roadGeo, roadMat);

  road.rotation.x = -Math.PI / 2;

  // tránh flickering với ground
  road.position.y = 0.01;

  road.receiveShadow = true;

  scene.add(road);

  // ===== CENTER LINE =====

  for (let i = -90; i < 100; i += 10) {
    // ===== SIDE LINES =====

    for (let z = -100; z < 100; z += 5) {
      [-6, 6].forEach((x) => {
        const sideGeo = new THREE.PlaneGeometry(0.2, 3);

        const sideMat = new THREE.MeshStandardMaterial({
          color: 0x2d5a27,
        });

        const sideLine = new THREE.Mesh(sideGeo, sideMat);

        sideLine.rotation.x = -Math.PI / 2;

        sideLine.position.set(x, 0.02, z);

        scene.add(sideLine);
      });
    }
    const lineGeo = new THREE.PlaneGeometry(0.3, 5);

    const lineMat = new THREE.MeshStandardMaterial({
      color: 0xf5f5f5,
    });

    const line = new THREE.Mesh(lineGeo, lineMat);

    line.rotation.x = -Math.PI / 2;

    line.position.set(0, 0.02, i);

    scene.add(line);
  }
}
