import * as THREE from "three";

export function firstPerson(ref, camera) {
  const { current: body } = ref;
  const ballPosition = body.translation();

  const cameraPosition = new THREE.Vector3();
  cameraPosition.copy(ballPosition);

  const cameraTarget = new THREE.Vector3();
  cameraTarget.copy(ballPosition);
  cameraTarget.y += 0.5;

  camera.position.copy(cameraPosition);
}

export function thirdPerson(ref, camera, cameraProperties, delta) {
  const { current: body } = ref;
  const ballPosition = body.translation();

  const cameraPosition = new THREE.Vector3();
  cameraPosition.copy(ballPosition);

  cameraPosition.z += 6.3;
  cameraPosition.y += 3.4;

  const cameraTarget = new THREE.Vector3();
  cameraTarget.copy(ballPosition);
  cameraTarget.y += 0.3;

  cameraProperties.position.lerp(cameraPosition, 5 * delta);
  cameraProperties.target.lerp(cameraTarget, 5 * delta);

  camera.position.copy(cameraProperties.position);
  camera.lookAt(cameraProperties.target);
}