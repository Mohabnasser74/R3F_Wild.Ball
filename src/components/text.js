import { useRef, memo, useMemo } from "react"
import { Text, useFont } from "@react-three/drei"

function TextComponent() {
  const startTxt = useRef();
  const finishTxt = useRef();
  const speed = useMemo(() => ({
    angle: 0
  }), [])

  setInterval(() => {
    if (startTxt.current) {
      startTxt.current.position.y = Math.sin(speed.angle) * .3;
    };
    if (finishTxt.current) {
      finishTxt.current.position.x = Math.cos(speed.angle) * 1.5;
    };
    speed.angle += .009;
  }, 0);

  return (
  <>
    <Text
    ref={startTxt}
    font="/font/static/NotoSans-Bold.ttf"
    letterSpacing={0.06} 
    fontSize={.6} 
    position={[2.5, 0, 18.5]} 
    rotation-y={-0.5} >
      LETS GO!
      <meshBasicMaterial color={"#ffffff"}/>
    </Text>
    <Text 
      ref={finishTxt} 
      font="/font/static/NotoSans-Bold.ttf"
      letterSpacing={0.2} 
      fontSize={.6} 
      position={[0, 2, -30]} 
      rotation-x={-0.2} >
        FINISH
        <meshBasicMaterial color={"#674188"}/>
    </Text>
  </>
  );
}

useFont.preload("/font/static/NotoSans-Bold.ttf");
export default memo(TextComponent);