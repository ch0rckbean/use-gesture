import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import React, { useState } from 'react';

export default function Pr_Swipe() {
  const [position, setPosition] = useState(0);
  const { x } = useSpring({ x: position * 200 });
  const bind = useDrag(({ swipe: [swipeX] }) => {
    setPosition((p) => Math.min(Math.max(-1, p + swipeX), 1));
  });

  return (
    <animated.div
      {...bind()}
      style={{
        x,
        width: '100px',
        height: '100px',
        backgroundColor: 'blue',
        borderRadius: '20px',
      }}
    />
  );
}
