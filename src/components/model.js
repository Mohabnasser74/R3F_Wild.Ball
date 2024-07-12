import { useAnimations, useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useEffect, memo } from "react";

function Model() {
  const { scene, animations } = useGLTF('/model/car_drifter.glb');
  const { ref, actions } = useAnimations(animations || [], scene);

  useEffect(() => {
      actions[animations[0].name]?.reset()?.fadeIn(0.5)?.play();
      return () => actions[animations[0].name]?.fadeOut(0.5);
  }, [actions, animations]);

  return (
    <RigidBody
      type="dynamic"
      colliders={"hull"}
      position={[0, 0, -26]}
      rotation-y={-2.5}
      scale={[.1, .085, .1]}
      receiveShadow
      castShadow
    >
      <group dispose={null}>
        <primitive ref={ref} object={scene} scale={[.1, .085, .1]} />
      </group>
    </RigidBody>
  );
}

useGLTF.preload("/model/car_drifter.glb");
export default memo(Model);
