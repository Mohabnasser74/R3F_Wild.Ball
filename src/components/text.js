import {RigidBody} from "@react-three/rapier";
import { Center, Text3D } from "@react-three/drei";

export default function Text() {
  
  return (
    <>
      <Center position={[1.4, 0, 18.5]} rotation-y={-0.4}>
        <Text3D
          letterSpacing={0.02}
          receiveShadow
          castShadow
          size={0.4}
          font="https://threejs.org/examples/fonts/helvetiker_regular.typeface.json"
        >
          TESLA MODEL 3
          <meshStandardMaterial color="#FFF" />
        </Text3D>
      </Center>
      <Center position={[2, -0.6, 18.5]} rotation-y={-0.4}>
        <Text3D
          letterSpacing={0.02}
          receiveShadow
          castShadow
          size={0.4}
          font="https://threejs.org/examples/fonts/helvetiker_regular.typeface.json"
        >
          {" <"}3
          <meshStandardMaterial color="#FFF" />
        </Text3D>
      </Center>
      <RigidBody colliders="trimesh" restitution={0}>
        <Center position={[0, 2, -30]}>
          <Text3D
            letterSpacing={0.5}
            receiveShadow
            castShadow
            size={0.5}
            font="https://threejs.org/examples/fonts/helvetiker_regular.typeface.json"
          >
            FINISH
            <meshStandardMaterial color="#674188" />
          </Text3D>
        </Center>
      </RigidBody>
    </>
  );
}