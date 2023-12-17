import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';

export default function Pr_Rubberband() {
  // function rubberbandIfOutOfBounds(position: number, min: number, max: number, constant = 0.15): number

  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));
  const bind = useDrag(
    ({ down, offset: [ox, oy] }) =>
      api.start({ x: ox, y: oy, immediate: down }),
    {
      bounds: { left: 0, right: 100, top: 0, bottom: 100 },
      rubberband: true,
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
        backgroundColor: 'blue',
        borderRadius: '20px',
      }}
    />
  );
}
