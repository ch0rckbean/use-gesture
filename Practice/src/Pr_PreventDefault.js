import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';

export default function Pr_PreventDefault() {
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));
  const bind = useDrag(({ offset: [x, y] }) => api.start({ x, y }), {
    preventDefault: true,
    filterTaps: true,
  });
  return (
    <animated.a
      href='https://github.com/pmndrs/use-gesture'
      {...bind()}
      style={{ x, y, color: 'blue', fontSize: '20px', position: 'absolute' }}
    >
      A{' '}
    </animated.a>
  );
}
