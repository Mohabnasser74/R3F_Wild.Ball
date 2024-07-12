import { memo } from "react";
import { CuboidCollider, RigidBody } from "@react-three/rapier";

function Floor({ position, args, color }) {
  return (
    <RigidBody type="fixed" position={position}
      friction={2} name="Floor" >
      <mesh receiveShadow>
        <boxGeometry args={args} />
        <meshPhysicalMaterial shadowSide color={color} />
      </mesh>
      <CuboidCollider args={[args[0] * .5, args[1] * .5, args[2] * .5]}/>
    </RigidBody>
  );
};

function FLOORS_STRUCTURE () {
  return (
    <>
    <Floor args={[10, 0.5, 45]} position={[0, -2, 0]} color={0x86A789}  /> 
    <Floor args={[10, 1, 8]} position={[0, -2 + 0.25, -26.5]} color={0xD2E3C8}/>
    </>
  )
};

export default memo(FLOORS_STRUCTURE);