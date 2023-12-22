import React, { useRef } from 'react';
import { useSprings, animated, config } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import clamp from 'lodash.clamp';
import swap from 'lodash-move';
import styles from './styles.module.css';

const fn =
  (order: number[], active = false, originalIndex = 0, curIndex = 0, y = 0) =>
  (index: number) =>
    active && index === originalIndex // 마우스 이벤트 발생
      ? {
          //블럭 드래그 시
          y: curIndex * y, // y축 방향 이동 정도
          scale: 1.1,
          zIndex: 1,
          shadow: 15,
          immediate: (key: string) => key === 'zIndex',
          config: (key: string) =>
            key === 'y' ? config.stiff : config.default,
        }
      : {
          y: order.indexOf(index) * 100,
          scale: 1,
          zIndex: 0,
          shadow: 1,
          immediate: false,
        };

function DraggableList({ items }: { items: string[] }) {
  const order = useRef(items.map((_, index) => index)); //item 순서
  const [springs, api] = useSprings(items.length, fn(order.current));

  const bind = useDrag(({ args: [originalIndex], active, movement: [, y] }) => {
    const curIndex = order.current.indexOf(originalIndex);
    const curRow = clamp(
      // clamp(num, lower, upper)
      // - num < lower 일 때 lower 반환
      // - num > upper 일 때 upper 반환
      // - lower < num < upper 일 때 num 반환
      Math.round((curIndex * 2 + y) / 100),
      0,
      items.length - 1
    );

    const newOrder = swap(order.current, curIndex, curRow);
    api.start(fn(newOrder, active, originalIndex, curIndex, y));
    if (!active) {
      order.current = newOrder;
    }
  });

  return (
    <div className={styles.content} style={{ height: items.length * 100 }}>
      {springs.map(({ zIndex, shadow, y, scale }, i) => (
        <animated.div
          {...bind(i)}
          key={i}
          style={{
            zIndex,
            boxShadow: shadow.to(
              (s) => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`
            ),
            y,
            scale,
          }}
          children={items[i]}
        />
      ))}
    </div>
  );
}

export default function App() {
  return (
    <div className='flex fill center'>
      <DraggableList items={'use gesture 실습 첫번쨍'.split(' ')} />
    </div>
  );
}
