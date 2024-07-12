import * as THREE from "three";
import { useRef, useCallback, useEffect, useMemo, memo } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { useRapier, RigidBody } from "@react-three/rapier";
import { useKeyboardControls } from "@react-three/drei";
import { ctp } from "./camera";
import { folder, useControls } from "leva";
import { useDispatch, useSelector } from "react-redux";
import { setKey } from "../toolkit/slice/key";

function Ball() {
  const { linearDamping, angularDamping, color, impulseStrength, torqueStrength } = useControls({
    Ball: folder({
      color: "#9384d1",
      Strength: folder({
        impulseStrength: { value: 20, min: 0, max: 60, step: 2 },
        torqueStrength: { value: 20, min: 0, max: 60, step: 2 },
        linearDamping: { value: 0.5, min: 0.0, max: 5.5, step: 0.2 },
        angularDamping: { value: 0.5, min: 0.0, max: 5.5, step: 0.2 }
      })
    }, { collapsed: true })
  });

  const rigidBodyRef = useRef();
  const { camera } = useThree();
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const dispatch = useDispatch();
  const isRestart = useSelector((state) => state.isRestart);
  const { rapier, world } = useRapier();

  const cameraProperties = useMemo(() => ({
    position: new THREE.Vector3(0, 0, 200),
    target: new THREE.Vector3()
  }), []);

  console.log("RE_RENDER");

  useFrame((_, delta) => {
    const impulse = new THREE.Vector3(0, 0, 0);
    const torque = new THREE.Vector3(0, 0, 0);

    const { forward, backward, leftward, rightward } = getKeys();

    if (forward) {
      impulse.z = -1;
      torque.x = -1;
    }
    if (backward) {
      impulse.z = 1;
      torque.x = 1;
    }
    if (rightward) {
      impulse.x = 1;
      torque.z = -1;
    }
    if (leftward) {
      impulse.x = -1;
      torque.z = 1;
    }

    const { current: body } = rigidBodyRef;

    if (body) {
      if (impulse.length() > 0) {
        /* 
        transforming `impulse` from its local space to the global world space,
        aligning it with the camera's position and orientation.
        // impulse.applyMatrix4(camera.matrixWorld).sub(camera.position);
        // impulse.setY(0);
        */
        impulse.normalize().setLength(impulseStrength * delta);
        body.applyImpulse(impulse, true);
      };
      // Apply torque force to the ball if it exists and torque force is non-zero
      if (torque.length() > 0) {
        /* 
        transforming `torque` from its local space to the global world space,
        aligning it with the camera's position and orientation.
        // torque.applyMatrix4(camera.matrixWorld).sub(camera.position);
        // torque.setY(0);
        */
        torque.normalize().setLength(torqueStrength * delta);
        body.applyTorqueImpulse(torque, true);
      };

      if (body?.translation().y <= -20 || isRestart) {
        body.sleep();
        body?.setTranslation({ x: 0, y: 0, z: 21.5 });
      };

      ctp(body, camera, cameraProperties, delta);
    }
  });

    const handleJump = useCallback(() => {
      const { current: body } = rigidBodyRef;
      if (body) {
      const origin = body.translation();
      // Added offset to ensure that the rayCast doesn't intersect with the mesh itself.
      origin.y -= 1 + 0.05; 
      const direction = { x: 0, y: -1, z: 0 };
      const ray = new rapier.Ray(origin, direction);
      const hit = world.raw().castRay(ray, 10, true);
      if (hit && hit.toi < 0.15) {
        body.applyImpulse({ x: 0, y: 20, z: 0 }, true);
      }
    }
  }, [rapier.Ray, world]);

  useEffect(() => {
    const unsubscribeJump = subscribeKeys(
      (state) => state.jump,
      (value) => value && handleJump()
    );
    return () => unsubscribeJump();
  }, [handleJump, subscribeKeys]);

    useEffect(() => {
    const unsubscribePress = subscribeKeys(
      (state) => state,
      (value) => dispatch(setKey(value))
    );
    return () => unsubscribePress();
  }, [subscribeKeys, dispatch]);

  return (
  <RigidBody
    ref={rigidBodyRef}
    colliders="ball"
    position={[0, -.5, 21.5]}
    linearDamping={linearDamping}
    angularDamping={angularDamping}
    restitution={0.2}
    name="ball"
  >
    <mesh receiveShadow castShadow >
      <icosahedronGeometry args={[0.7, 1]} />
      <meshPhysicalMaterial metalness={0.25} color={color} flatShading />
    </mesh>
  </RigidBody>
);
}
export default memo(Ball);
