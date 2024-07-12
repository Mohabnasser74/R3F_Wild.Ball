import { RigidBody } from "@react-three/rapier";
import { memo } from "react";

function Wall({ position, dimensions, color }) {
  return (
    <RigidBody type="fixed" name="Wall" position={position}>
      <mesh receiveShadow castShadow>
        <boxGeometry args={dimensions} />
        <meshPhysicalMaterial color={color} />
      </mesh>
    </RigidBody>
  );
}

const defaultColor = "#B2C8BA";
function WALLS_STRUCTURE() {
  return (
    <>
      <Wall dimensions={[0.7, 3, 45]} position={[-4.5 - 0.3 / 2, -0.25, 0]} color={defaultColor} />
      <Wall dimensions={[0.7, 3, 45]} position={[4.5 + 0.3 / 2, -0.25, 0]} color={defaultColor} />
      <Wall dimensions={[0.7, 2.5, 8]} position={[-4.5 - 0.3 / 2, 0, -26.5]} color={defaultColor} />
      <Wall dimensions={[0.7, 2.5, 8]} position={[4.5 + 0.3 / 2, 0, -26.5]} color={defaultColor} />
      <Wall dimensions={[8 + (0.3 + 0.3), 2.5, 1]} position={[0, 0, -30]} color={defaultColor} />
    </>
  );
}

export default memo(WALLS_STRUCTURE);