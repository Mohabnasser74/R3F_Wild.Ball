import * as THREE from "three";
import { useRef, useMemo, memo, useEffect, useState } from "react";
import { CuboidCollider, RigidBody, quat, useRapier } from "@react-three/rapier";
import { useSelector } from "react-redux";
import { Box } from "@react-three/drei";

const physicalMaterial = new THREE.MeshPhysicalMaterial({color: "#B73E3E"});
const boxGeoCylinder = new THREE.BoxGeometry(7.9, 0.5, 0.5);

function WallEnemy({ position, args, color }) {
  const rigidBodyRef = useRef();
  const collider = useRef();

  const [collision, setCollision] = useState(false);
  const {rapier} = useRapier();

  useTransformation(rigidBodyRef, collider, rapier, collision, { x: 3, y: 0, z: 0 }, { x: -3, y: 0, z: 0 });

  return (
    <RigidBody 
      ref={rigidBodyRef} 
      type="kinematicVelocity" 
      position={position}>
      <Box castShadow receiveShadow args={args} material={physicalMaterial}/>
      <CuboidCollider
        args={[args[0] * .5, args[1] * .5, args[2] * .5]}
        ref={collider}
        onCollisionEnter={({ rigidBodyObject }) => {
          rigidBodyObject.name === "Wall" && setCollision(!collision);
        }}
      />
    </RigidBody>
  );
}

function StretchEnemy({ position, args, color }) {
  const rigidBodyRef = useRef();
  const collider = useRef();

  const [collision, setCollision] = useState(false);
  const {rapier} = useRapier();

  useTransformation(rigidBodyRef, collider, rapier, collision, { x: 0, y: 3, z: 0 }, { x: 0, y: -3, z: 0 });

  return (
    <RigidBody 
      type="kinematicVelocity" 
      name="StretchEnemy" 
      position={position} 
      ref={rigidBodyRef}>
      <Box castShadow receiveShadow args={args} material={physicalMaterial}/>
      <CuboidCollider
        args={[args[0] * .5, args[1] * .5, args[2] * .5]}
        ref={collider}
        onCollisionEnter={({ rigidBodyObject }) => {
          rigidBodyObject.name === "Floor" && setCollision(!collision);
        }}
        onCollisionExit={() => {
          setTimeout(() => {
            setCollision(!collision);
          }, [900]);
        }}
      />
    </RigidBody>
  );
}

function CylinderKicker({ rotation, color, position }) {
  const kickerRef = useRef();
  const groupRef = useRef();

  useEffect(() => {
    const { current: group } = kickerRef;
    if (group) {
      const quaternion = quat(group.rotation());
      group?.setRotation(quaternion, true);
      group?.setAngvel({ x: 0, y: rotation, z: 0 }, true);
    }
  }, [rotation]);


  return (
    <RigidBody
      type="kinematicVelocity"
      position={position}
      ref={kickerRef} >
      <group dispose={null} ref={groupRef}>
        <mesh
          castShadow receiveShadow 
          material={physicalMaterial} >
          <cylinderGeometry args={[0.7, 0.7, 4]} />
        </mesh>
        <mesh
          castShadow receiveShadow
          position={[0, 1.5, 0]} rotation={[0, 1.5, 0]}
          geometry={boxGeoCylinder} material={physicalMaterial}
        />
        <mesh
          castShadow receiveShadow
          position={[0, 0, 0]} rotation={[0, 0, 0]}
          geometry={boxGeoCylinder} material={physicalMaterial}
        />
        <mesh
          castShadow receiveShadow
          position={[0, -1.5, 0]} rotation={[0, 1.5, 0]}
          geometry={boxGeoCylinder} material={physicalMaterial}
        />
      </group>
    </RigidBody>
  );
}

const xWall = [2.5, -2.5];
const yStr = [1, -.5];
const yRot = [3, -3];
const Apos = [15, 7, -1, -9, -17];

function Enemies() {
  const isRestart = useSelector((state) => state.isRestart);

  const instances = useMemo(() => {
    const instances = [];
    for (let i = 0; i <= 4; i++) {
      const enemies = [
        <WallEnemy
          args={[3, 3, 0.5]}
          position={[xWall[Math.floor(Math.random() * xWall.length)], -0.25, Apos[i]]}
          color={"#B73E3E"}
          key={"Enemy: " + i}
        />,
        <StretchEnemy
          args={[7.9, 0.5, 0.5]}
          position={[0, yStr[Math.floor(Math.random() * yStr.length)], Apos[i]]}
          color={"#B73E3E"}
          key={"Enemy: " + i}
        />,
        <CylinderKicker
          position={[0, 0.25, Apos[i]]}
          rotation={yRot[Math.floor(Math.random() * yRot.length)]}
          color={"#B73E3E"}
          key={"Enemy: " + i}
        />
      ];

      instances.push(enemies[Math.floor(Math.random() * enemies.length)]);
    }

    if (!isRestart) return instances;

  }, [isRestart]);

  return <>{instances}</>;
}

function useTransformation(rigidBodyRef, collider, rapier, collision, positiveVel, negativeVel) {
  return useEffect(() => {
    const body = rigidBodyRef.current;
    const coll = collider.current;
    if (body && coll) {
      coll.setActiveCollisionTypes(rapier.ActiveCollisionTypes.KINEMATIC_FIXED);
      body.setTranslation(body.translation());
      collision ? body.setLinvel(positiveVel) : body.setLinvel(negativeVel);
    }
  }, [collider, collision, negativeVel, positiveVel, rapier.ActiveCollisionTypes.KINEMATIC_FIXED, rigidBodyRef]);
}

export default memo(Enemies);