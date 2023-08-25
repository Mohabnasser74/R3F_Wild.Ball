import "./index.css";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

// Structure
import Wall from "./components/wall";
import Ball from "./components/ball";
import Floor from "./components/floor";
import { Enemies } from "./components/enemies";

// Text
import Text from "./components/text";

// Light
import Light from "./components/light";

// Physics
import { KeyboardControls, Stars } from "@react-three/drei";
import { Physics } from "@react-three/rapier";

// leva
import { folder, useControls } from "leva";

// interface
import Interface from "./components/interface";
import { useSelector } from "react-redux";
import Model from "./components/model";


function App() {
  const debugCtr = useControls({
    Debug: folder(
      {
        debug: false
      },
      { collapsed: true }
    )
  });

  const gameStatus = useSelector((state) => state.gameStatus);

  return (
  <>
  <div id="canvas-container">
    <KeyboardControls
      map={[
        { name: "forward", keys: ["KeyW"] },
        { name: "backward", keys: ["KeyS"] },
        { name: "leftward", keys: ["KeyA"] },
        { name: "rightward", keys: ["KeyD"] },
        { name: "jump", keys: ["Space"] }
      ]}>
        <Canvas shadows={true} camera={{ fov: 55 }}>
          <Suspense fallback={null}>
          <color attach="background" args={[0x18122B]} />
            <Physics debug={debugCtr.debug} gravity={[0, -60, 0]}>
              {/* Floor */}
                <Floor args={[10, 0.5, 45]} pos={[0, -2, 0]} color={ 0x222831} />
                <Floor args={[10, 1, 8]} pos={[0, -2 + 0.25, -26.5]} color={0x8D8DAA}/>

              {/* Wall */}
                <Wall
                  args={[0.7, 3, 45]}
                  pos={[-4.5 - 0.3 / 2, -0.25, 0]}
                  color={0x9BABB8}
                />
                <Wall
                  args={[0.7, 3, 45]}
                  pos={[4.5 + 0.3 / 2, -0.25, 0]}
                  color={0x9BABB8}
                />
                <Wall
                  args={[0.7, 2.5, 8]}
                  pos={[-4.5 - 0.3 / 2, 0, -26.5]}
                  color={0x9BABB8}
                />
                <Wall
                  args={[0.7, 2.5, 8]}
                  pos={[4.5 + 0.3 / 2, 0, -26.5]}
                  color={0x9BABB8}
                />
                <Wall
                  args={[8 + (0.3 + 0.3), 2.5, 1]}
                  pos={[0, 0, -30]}
                  color={0x9BABB8}
                />
              {/* ball */}
                <Ball />
              {/* Text */}
                <Text />
              {/* Model */}
              <Model />
              {/* Enemies */}
                {gameStatus === false && <Enemies />}
            </Physics>
              {/* light */}
              <Light />
              <Stars
                radius={80}
                depth={50}
                count={10000}
                factor={4}
                saturation={0}
                fade
                speed={5}
              />
          </Suspense>
        </Canvas>
      </KeyboardControls>
    </div>
    <Interface />
  </>
  );
}


export default App;