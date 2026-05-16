import { keys } from "./controls.js";

let speed = 0;

const acceleration = 0.002;
const maxSpeed = 0.08;
const friction = 0.98;
const turnSpeed = 0.03;

export function updateCar(car) {
  if (!car) return;

  // tăng tốc
  if (keys.forward) {
    speed += acceleration;
  }

  // lùi
  if (keys.backward) {
    speed -= acceleration;
  }

  // ma sát
  speed *= friction;

  // giới hạn tốc độ
  speed = Math.max(-maxSpeed / 2, Math.min(maxSpeed, speed));

  // chỉ cho rẽ khi xe đang chạy
  if (Math.abs(speed) > 0.001) {
    if (keys.left) {
      car.rotation.y += turnSpeed;
    }

    if (keys.right) {
      car.rotation.y -= turnSpeed;
    }
  }

  // hướng di chuyển
  const dirX = Math.sin(car.rotation.y);
  const dirZ = Math.cos(car.rotation.y);

  car.position.x -= dirX * speed;
  car.position.z -= dirZ * speed;
  // ===== ROAD LIMIT =====

  const roadLimit = 5.5;

  // nếu lệch khỏi đường
  if (Math.abs(car.position.x) > roadLimit) {
    // giảm tốc mạnh
    speed *= 0.92;
  }
  // nếu đi quá xa map
  if (Math.abs(car.position.x) > 20) {
    // reset vị trí
    car.position.set(0, 0.1, 0);

    // reset hướng
    car.rotation.y = Math.PI;

    // reset speed
    speed = 0;
  }
}
export function getSpeed() {
  return speed;
}
