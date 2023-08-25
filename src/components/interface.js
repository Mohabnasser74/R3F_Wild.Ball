import { useState, useEffect, useRef, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { gameStatus } from "../toolkit/gameStatus";

const unitTime = {
  seconds: 0,
  milSec_1: 0,
  milSec_2: 0
};

function Interface() {
  const [ endGame, setEnd ] = useState(false);
  const { restartGame, key, time } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (restartGame.z <= -22.5) {
      setEnd(true);
    } else {
      setEnd(false);
      dispatch(gameStatus(endGame));
    }
  }, [restartGame, endGame, dispatch]);

  const refs = {
    w: useRef(),
    a: useRef(),
    s: useRef(),
    d: useRef(),
    space: useRef()
  };

  const { w, d, a, s, space } = refs;

  useEffect(() => {
    const { forward, backward, leftward, rightward, jump } = key;

    if (forward) {
      w?.current?.classList?.add("active");
    } else w?.current?.classList?.remove("active");

    if (rightward) {
      d?.current?.classList?.add("active");
    } else d?.current?.classList?.remove("active");

    if (leftward) {
      a?.current?.classList?.add("active");
    } else a?.current?.classList?.remove("active");

    if (backward) {
      s?.current?.classList?.add("active");
    } else s?.current?.classList?.remove("active");

    if (jump) {
      space?.current?.classList?.add("active");
    } else space?.current?.classList?.remove("active");
  }, [key, a, d, s, w, space]);

  const timeRef = useRef();

  if (time && timeRef.current) {

    unitTime.milSec_2 += 1;
    if (unitTime.milSec_2 > 9) {
      unitTime.milSec_2 = 0;
      unitTime.milSec_1 += 1;
      if (unitTime.milSec_1 > 5) {
        unitTime.milSec_1 = 0;
        unitTime.seconds += 1;
      }
    }
  }

  if (timeRef.current) {
    timeRef.current.textContent = `${unitTime.seconds}.${unitTime.milSec_1}${unitTime.milSec_2}`;
  }

  return (
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
      {endGame && (
        <div
          className="restart"
          onClick={() => {
            dispatch(gameStatus(endGame));
            for (let key in unitTime) {
              unitTime[key] = 0;
            }
          }}
        >
          Restart!
        </div>
      )}
    </div>
  );
}

export default memo(Interface);
