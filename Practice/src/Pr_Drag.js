import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';

export default function Pr_drag() {
  const [{ x, y }, api] = useSpring(() => ({ x: 50, y: 50 })); // 초기 위치

  const bind = useDrag(({ down, movement: [mx, my] }) => {
    api.start({ x: down ? mx : 50, y: down ? my : 50, immediate: down });
    // drag 후 놓았을 때 위치
  });

  return (
    <>
      <animated.div
        {...bind()}
        style={{
          x,
          y,
          width: '100px',
          height: '100px',
          backgroundColor: 'blue',
          borderRadius: '20px',
        }}
      />
    </>
  );
}
