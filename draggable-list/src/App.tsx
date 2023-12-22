import React, { useRef } from 'react';
import { useSprings, animated, config } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import clamp from 'lodash.clamp';
import swap from 'lodash-move';
import styles from './styles.module.css';

// 애니메이션 설정 객체
const fn =
  (order: number[], active = false, originalIndex = 0, curIndex = 0, y = 0) =>
  (index: number) =>
    active && index === originalIndex // 마우스 이벤트 발생 시 == 블럭 드래그 시
      ? {
          y: curIndex * y, // y축 방향 이동 정도
          scale: 1.1,
          zIndex: 1,
          shadow: 15,
          // 함수 선언
          immediate: (key: string) => key === 'zIndex',
          config: (key: string) =>
            key === 'y' ? config.stiff : config.default,
          // config.stiff : { mass: 1, tension: 210, friction: 20 }
          // config.default : { mass: 1, tension: 170, friction: 26 }
        }
      : {
          // 드래그 안 할 때
          y: order.indexOf(index) * 100,
          scale: 1,
          zIndex: 0,
          shadow: 1,
          immediate: false,
        };

function DraggableList({ items }: { items: string[] }) {
  const order = useRef(items.map((_, index) => index)); //item 초기 순서 배열 만듦(order.current)
  // console.log(order.current, items); // [0, 2, 1, 3] ['use', 'gesture', '실습', '첫번쨍']
  // 첫번째 인자를 쓰지 않더라도 TS에서의 타입 추론을 위해 _로 명시
  const [springs, api] = useSprings(items.length, fn(order.current));
  // - items.length: 애니메이션 스프링 개수
  // - fn(order.current) : 각 스프링에 대한 초기 설정(초기 인덱스 배열을 index 인자로 전달)

  const bind = useDrag(({ args: [originalIndex], active, movement: [, y] }) => {
    const curIndex = order.current.indexOf(originalIndex);
    // console.log(originalIndex); // 각 블록의 원래 순서 나옴
    console.log(curIndex); // 각 블록의 현재 순서 나옴
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
    // swap(배열, 인덱스1, 인덱스2)
    // - 배열 내에서 인덱스1과 인덱스2의 요소를 바꿈
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
