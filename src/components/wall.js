import {RigidBody} from "@react-three/rapier"

export default function Wall(props) {
  return (
    <RigidBody type="fixed">
      <mesh position={props.pos} receiveShadow castShadow>
      <boxGeometry args={props.args} />
      <meshStandardMaterial color={props.color}/>
      </mesh>
    </RigidBody>
  );
}
