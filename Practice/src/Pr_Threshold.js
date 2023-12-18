import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';

export default function Pr_Threshold() {
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));
  const bind = useDrag(({ offset: [x, y] }) => api.start({ x, y }), {
    threshold: 10,
  });
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
