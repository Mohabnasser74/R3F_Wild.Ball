import "./index.css";
import { Canvas } from "@react-three/fiber";
import { Suspense, lazy } from "react";
import { Html, KeyboardControls, Sky } from "@react-three/drei";
import { Physics } from "@react-three/rapier";

const FLOORS_STRUCTURE = lazy(() => import("./components/floor"));
const WALLS_STRUCTURE = lazy(() => import("./components/wall"));
const Ball = lazy(() => import("./components/ball"));
const Car = lazy(() => import("./components/model"));
const Enemies = lazy(() => import("./components/enemies"));
const Sensors = lazy(() => import("./components/sensor"));
const TextComponent = lazy(() => import("./components/text"));
const Interface = lazy(() => import("./components/interface"));

const keysControls = [
  { name: "forward", keys: ["KeyW"] },
  { name: "backward", keys: ["KeyS"] },
  { name: "leftward", keys: ["KeyA"] },
  { name: "rightward", keys: ["KeyD"] },
  { name: "jump", keys: ["Space"] }
];

const LoadingPage = () => <Html center className="loading">LOADING...</Html>;

const App = () => {
  return (
    <KeyboardControls map={keysControls}>
      <Canvas shadows camera={{ fov: 65 }}>
        <Suspense fallback={<LoadingPage />}>
          <Sky distance={450000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25}/>
          <spotLight 
          position={[15, 12, 20]} penumbra={.5}
          castShadow intensity={2}
          shadow-bias={-0.0001}
          />
          <ambientLight intensity={0.4} />
          <Physics gravity={[0, -80, 0]}>
            <FLOORS_STRUCTURE/>
            <WALLS_STRUCTURE/>
            <Ball/>
            <Enemies/>
            <Sensors/>
            <Car />
          </Physics>
          <TextComponent />
          <Interface/>
        </Suspense>
      </Canvas>
    </KeyboardControls>
  );
}

export default App;