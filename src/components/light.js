import { memo } from "react";

function Light() {
  return (
    <>
      <spotLight 
        position={[15, 12, 20]} penumbra={.5}
        castShadow intensity={2}
        shadow-bias={-0.0001}
      />
      <ambientLight intensity={0.4} />
    </>
  );
}

export default memo(Light);