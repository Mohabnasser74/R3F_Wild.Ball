import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRestart } from "../toolkit/slice/Restart";

const Sensors = () => {
  const isRestart = useSelector((state) => state.isRestart);
  const dispatch = useDispatch();
  useEffect(() => {isRestart && dispatch(setRestart(false))}, [dispatch, isRestart]);
  
  return (
    <RigidBody type="fixed" >
      <CuboidCollider
        position={[0, 1, -23]}
        args={[5, 2.5, 0]}
        sensor
        onIntersectionEnter={() => dispatch(setRestart(true))}
      />
    </RigidBody>
  );
};

export default memo(Sensors);