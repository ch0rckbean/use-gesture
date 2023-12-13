import { useSpring, animated } from '@react-spring/web';
import React from 'react';
import { useDrag } from '@use-gesture/react';

export default function Pr_AxisExample() {
  ////////////// X

  //   const [{ x }, api] = useSpring(() => ({ x: 0 }));
  //   const bind = useDrag(
  //     ({ down, movement: [mx] }) => api.start({ x: down ? mx : 0 }),
  //     { axis: 'x' }
  //   );

  //   return (
  //     <animated.div
  //       {...bind()}
  //       style={{
  //         x,
  //         width: '100px',
  //         height: '100px',
  //         backgroundColor: 'pink',
  //         borderRadius: '20px',
  //       }}
  //     />
  //   );

  ////////////// Y
  //   const [{ y }, api] = useSpring(() => ({
  //     y: 0,
  //   }));
  //   const bind = useDrag(({ down, movement: [my] }) =>
  //     api.start({ y: down ? my : 0 })
  //   );
  //   return (
  //     <animated.div
  //       {...bind()}
  //       style={{
  //         y,
  //         width: '100px',
  //         height: '100px',
  //         backgroundColor: 'pink',
  //         borderRadius: '20px',
  //       }}
  //     />
  //   );

  ////////////// LOCK
  const [{ x, y }, api] = useSpring(() => ({
    x: 0,
    y: 0,
  }));
  const bind = useDrag(
    ({ down, movement: [mx, my] }) => {
      api.start({ x: down ? mx : 0, y: down ? my : 0, immediate: down });
    },
    { axis: 'lock' } //config
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
