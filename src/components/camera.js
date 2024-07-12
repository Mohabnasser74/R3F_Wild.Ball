import * as THREE from "three";

export function ctp(body, camera, cameraProperties, delta) {
  const ballPosition = body.translation();

  const cameraPosition = new THREE.Vector3();
  cameraPosition.copy(ballPosition);

  cameraPosition.z += 5; 
  cameraPosition.y += 2.5;

  const cameraTarget = new THREE.Vector3();
  cameraTarget.copy(ballPosition);
  cameraTarget.y += 0.3;

  cameraProperties.position.lerp(cameraPosition, 5 * delta);
  cameraProperties.target.lerp(cameraTarget, 5 * delta);

  camera.position.copy(cameraProperties.position);
  camera.lookAt(cameraProperties.target);
}