import {RigidBody} from "@react-three/rapier";

export default function Floor(props) {
  return (
    <RigidBody type="fixed" friction={2}>
      <mesh position={props.pos} receiveShadow>
        <boxGeometry args={props.args} />
        <meshStandardMaterial shadowSide color={props.color} />
      </mesh>
    </RigidBody>
  );
}
