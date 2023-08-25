export default function Light() {
  return (
    <>
      <spotLight
        position={[20, 13.75, 15]}
        penumbra={0.5}
        castShadow
        intensity={2}
        shadow-bias={-0.0001}
      />
      <ambientLight intensity={0.5} />
    </>
  );
}