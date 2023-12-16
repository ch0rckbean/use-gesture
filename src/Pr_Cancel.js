import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import React from 'react';

export default function Pr_Cancel() {
  const [{ x }, api] = useSpring(() => ({ x: 0 }));
  const bind = useDrag(({ active, movement: [mx], cancel }) => {
    // movement: 움직임 정도 속성
    // cancel: 현재 제스처 취소 함수
    if (mx > 200) cancel();
    api.start({ x: active ? mx : 0, immediate: active });
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
