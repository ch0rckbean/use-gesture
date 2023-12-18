import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';

export default function Pr_BoundsEx() {
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));
  //   console.log([{ x, y }, 'api ', api]);
  const bind = useDrag(
    ({ down, offset: [ox, oy] }) => api.start({ x: ox, y: oy, immediat: down }),
    {
      bounds: { left: 0, right: 100, top: 0, bottom: 100 },
    }
  );
  return (
    <animated.div
      {...bind()}
      style={{
        x,
        y,
        width: '100px',
        height: '100px',
        backgroundColor: 'pink',
        borderRadius: '20px',
      }}
    />
  );
}
