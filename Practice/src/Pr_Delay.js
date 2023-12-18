import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';

export default function Pr_Delay() {
  const [{ x, y, scale }, api] = useSpring(() => ({ x: 0, y: 0, scale: 1 }));
  const bind = useDrag(
    ({ down, movement: [mx, my] }) =>
      api.start({ x: down ? mx : 0, y: down ? my : 0, scale: down ? 1.2 : 1 }),
    { delay: 1000 }
  );
  return (
    <>
      <animated.div
        {...bind()}
        style={{
          x,
          y,
          scale,
          width: '100px',
          height: '100px',
          backgroundColor: 'pink',
          borderRadius: '20px',
        }}
      />
    </>
  );
}
