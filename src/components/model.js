import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

export default function Model() {
  const model = useGLTF('/model/watercolor_cake.glb');
  return (
    <RigidBody
      type="fixed"
      position={[0, -1, -25]}
      receiveShadow
      castShadow
      colliders={"trimesh"}
      rotation={[0, -2, 0]}
      scale={[.99, .99, .99]}
    >
      <primitive object={model.scene} scale={[.99, .99, .99]}/>
    </RigidBody>
  );
}