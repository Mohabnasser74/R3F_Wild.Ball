import * as THREE from "three";
import { useThree, useFrame } from "@react-three/fiber";
import { useRef, useCallback, useEffect, useMemo, memo } from "react";
import { useKeyboardControls } from "@react-three/drei";
import { folder, useControls } from "leva";
import { useRapier, RigidBody } from "@react-three/rapier";
// redux...
import { useDispatch, useSelector } from "react-redux";
import { restart } from "../toolkit/restartSlice";
import { key } from "../toolkit/key";
import { time } from "../toolkit/timeSlice";
// camera...
import { firstPerson, thirdPerson } from "./camera";

function Ball() {
  // leva controls...
  const controls = useControls({
    Ball: folder({
      color: "#9384d1",
      Strengthen: folder({
        impulseStrength: 40,
        torqueStrength: 30
      })
    }, { collapsed: true }),
    Camera: folder({
      third_person: true,
      first_person: false
    }, { collapsed: true }),
  });

  const { camera } = useThree();

  const meshRef = useRef();

  const [subscribeKeys, getKeys] = useKeyboardControls();

  const { rapier, world } = useRapier();

  // redux...
  const dispatch = useDispatch();

  const gameStatus = useSelector((state) => state.gameStatus);

  const cameraProperties = useMemo(
    () => ({
      position: new THREE.Vector3(0, -60, 150),
      target: new THREE.Vector3()
    }),
    []
  );

  // animation frame...
  useFrame((state, delta) => {
    const { forward, backward, leftward, rightward } = getKeys();
    dispatch(key(getKeys()));

    const impulse = new THREE.Vector3(0, 0, 0);
    const torque = new THREE.Vector3(0, 0, 0);

    if (forward) {
      impulse.z = -0.2;
      torque.x = -0.2;
    }
    if (backward) {
      impulse.z = 0.2;
      torque.x = 0.2;
    }
    if (rightward) {
      impulse.x = 0.2;
      torque.z = -0.2;
    }
    if (leftward) {
      impulse.x = -0.2;
      torque.z = 0.2;
    }

    // moving..
    const { current: body } = meshRef;

    if (body && impulse.length() > 0) {
      impulse.applyMatrix4(camera.matrixWorld).sub(camera.position);
      impulse.setY(0);
      impulse.normalize().setLength(controls.impulseStrength * delta);

      body.applyImpulse(impulse, true);
    }

    if (body && torque.length() > 0) {
      torque.applyMatrix4(camera.matrixWorld).sub(camera.position);
      torque.setY(0);
      torque.normalize().setLength(controls.torqueStrength * delta);

      body.applyTorqueImpulse(torque, true);
    }

    // management game
    const ballPos = body?.translation();

    if (ballPos) {
      dispatch(restart({ ...ballPos }));

      // start game
      if (ballPos.z >= -22.5 && impulse.length() > 0) {
        dispatch(time(true));
      } else if (gameStatus | (ballPos.z <= -22.5)) {
        dispatch(time(false));
      }
      
      // ball fall
      if (ballPos.y <= -25 | gameStatus) {
        body.sleep();
        body?.setTranslation({ x: 0, y: 0, z: 21 });
      }
    };

    // camera controls...
    if (!controls.first_person) {
      thirdPerson(meshRef, camera, cameraProperties, delta);
    } else if (controls.first_person) {
      firstPerson(meshRef, camera);
    }
  });

  // jumping...
  const jump = useCallback(() => {
    const { current: body } = meshRef;

    if (body) {
      body.wakeUp();
      const origin = body.translation();
      origin.y -= 1 + 0.05; // added to ensure that the ray cast from this point doesn't intersect with the mesh itself.
      const direction = { x: 0, y: -1, z: 0 };
      const ray = new rapier.Ray(origin, direction);
      const hit = world.raw().castRay(ray, 10, true);
      if (hit && hit.toi < 0.15) {
        body.applyImpulse({ x: 0, y: 20, z: 0 }); // gravity - y: 20,
        dispatch(key(getKeys().jump));
      }
    }
  }, [dispatch, getKeys, rapier.Ray, world]);

  useEffect(() => {
    const unsubscribeJump = subscribeKeys(
      (state) => state.jump,
      (value) => {
        // value = state.jump
        if (value) jump();
      }
    );

    return () => {
      unsubscribeJump();
    };
  }, [subscribeKeys, jump]);

  return (
    <RigidBody
      ref={meshRef}
      position={[0, 0, 21]}
      colliders="ball"
      restitution={0.2}
    >
      <mesh receiveShadow castShadow>
        <icosahedronGeometry args={[0.75, 1]} />
        <meshStandardMaterial
          metalness={0.25}
          color={controls.color}
          flatShading
        />
      </mesh>
    </RigidBody>
  );
}

export default memo(Ball);
