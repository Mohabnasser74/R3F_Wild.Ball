import { useState, useEffect, useRef, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isRestartClick } from "../toolkit/slice/RestartClicked";
import { Html } from "@react-three/drei";

  const timeUnits = {
  milSec_2: 0,
  milSec_1: 0,
  seconds: 0
};

function Interface() {
  const { key, Restart } = useSelector((state) => state);
  const [timePlaying, setTimePlaying] = useState(false);
  const dispatch = useDispatch();

  const refs = {
    w: useRef(),
    a: useRef(),
    s: useRef(),
    d: useRef(),
    space: useRef()
  };

  const { w, d, a, s, space } = refs;

  useEffect(() => {
    const { forward, rightward, leftward, backward, jump } = key;
    const startTime = (forward || rightward || leftward || backward);
    startTime && setTimePlaying(true);
    if (startTime !== undefined) {
      w.current.classList.toggle("active", forward);
      d.current.classList.toggle("active", rightward);
      a.current.classList.toggle("active", leftward);
      s.current.classList.toggle("active", backward);
      space.current.classList.toggle("active", jump);
    }
  }, [key, a, d, s, w, space]);

  const timeRef = useRef();

  useEffect(() => {
  const timeDisplay = setInterval(() => {
    if (timePlaying && Restart !== true && timeRef.current) {
      timeUnits.milSec_2 += 1;
      if (timeUnits.milSec_2 > 9) {
        timeUnits.milSec_2 = 0;
        timeUnits.milSec_1 += 1;
        if (timeUnits.milSec_1 > 5) {
          timeUnits.milSec_1 = 0;
          timeUnits.seconds += 1;
        }
      }
    }
    if (timeRef.current) {
      timeRef.current.innerText = `${timeUnits.seconds}.${timeUnits.milSec_1}${timeUnits.milSec_2}`;
    };
  }, 25);
  return () => clearInterval(timeDisplay);
  }, [Restart, timePlaying]);


  return (
  <Html wrapperClass="parent" style={{position: "unset"}}>
    <div className="interface">
      <div className="time" ref={timeRef}></div>
      <div className="controls">
        <div className="row">
          <span className="key" ref={w}></span>
        </div>
        <div className="row">
          <span className="key" ref={a}></span>
          <span className="key" ref={s}></span>
          <span className="key" ref={d}></span>
        </div>
        <div className="row">
          <span className="key space" ref={space}></span>
        </div>
      </div>
      {Restart && (
        <div
          className="restart"
          onClick={() => {
            for (let key in timeUnits) timeUnits[key] = 0;
            dispatch(isRestartClick(true));
            setTimePlaying(false);
            setTimeout(() => dispatch(isRestartClick(false)), 30);
          }}
        >
          Restart!
        </div>
      )}
      </div>
    </Html>
  );
}

export default memo(Interface);