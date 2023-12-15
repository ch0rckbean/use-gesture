import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';

export default function Pr_Offset() {
  const [{ x }, api] = useSpring(() => ({ x: 0 }));
  const bind = useDrag(
    ({ down, offset: [ox] }) =>
      api.start({
        x: down ? ox : 100, // 돌아오는 위치
        immediate: down,
        config: { duration: 3000 },
      }),
    { from: () => [x.get(), 0] }
  );
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
