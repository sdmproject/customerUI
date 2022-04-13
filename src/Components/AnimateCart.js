import React, { useRef, useEffect, useImperativeHandle } from 'react';

import ReactDOM from 'react-dom';

/**
 * 动画球
 * @params children - 小球扩展内容
 * @params flyOuterStyle - 小球外层扩展样式
 * @params flyInnerStyle - 小球内层扩展样式
 * @params runTime - 小球运动时间
 * @params ref - 小球dom实例
 */
const flyOuter = React.forwardRef(
  ({ children, flyOuterStyle = {}, flyInnerStyle = {}, runTime = 0.8 }, ref) => {
    const flyOuterRef = useRef();
    const flyInnerRef = useRef();
    useImperativeHandle(ref, () => ({ flyOuterRef, flyInnerRef }));


    // 运动小球外层样式
    const flyOuter_Style = Object.assign(
      {
        position: 'absolute',
        width: '20px',
        height: '20px',
        transition: `transform ${runTime}s`,
        display: 'none',
        margin: ' -20px 0 0 -20px',
        transitionTimingFunction: 'linear',
        zIndex: 3,
      },
      flyOuterStyle,
    );

    // 运动小球内层样式
    const flyInner_Style = Object.assign(
      {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        backgroundColor: '#FF8A2B',
        color: '#ffffff',
        textAlign: 'center',
        lineHeight: '1',
        transition: `transform ${runTime}s`,
        justifyContent: 'center',
        alignItems: 'center',
        // transitionTimingFunction: 'cubic-bezier(.55,0,.85,.36)', // 向上抛物线的右边
        transitionTimingFunction: 'cubic-bezier(0, 0, .25, 1.3)', // 向下抛物线的左边
      },
      flyInnerStyle,
    );

    return (
      <div style={flyOuter_Style} ref={flyOuterRef}>
        <div style={flyInner_Style} ref={flyInnerRef}>
          {children}
        </div>
      </div>
    );
  },
);


/**
 * 抛物线动画效果
 * @params startRef - 起始点dom节点
 * @params endRef - 目标点dom节点
 * @params flyOuterStyle - 小球外层扩展样式
 * @params flyInnerStyle - 小球内层扩展样式
 * @params runTime - 小球运动时间
 * @params beforeRun - 小球开始运动回调
 * @params afterRun - 小球结束运动回调
 * @params children - 小球扩展内容
 * @returns { running } - 小球开始运动函数
 */
export default function useParabola(
  {
    startRef,
    endRef,
    flyOuterStyle,
    flyInnerStyle,
    runTime = 800,
    beforeRun = () => {},
    afterRun = () => {},
  },
  children,
) {
  const containerRef = useRef(document.createElement('div'));
  const innerRef = useRef();
  let isRunning = false;

  // 挂载到dom上
  useEffect(() => {
    const container = containerRef.current;
    document.body.appendChild(container);
    return () => {
      document.body.removeChild(container);
    };
  }, []);


  useEffect(() => {
    if (startRef?.current && endRef?.current) {
      ReactDOM.render(
        React.createElement(
          flyOuter,
          { ref: innerRef, flyOuterStyle, flyInnerStyle, runTime: runTime / 1000 },
          children,
        ),
        containerRef.current,
      );
    }
  }, [startRef, endRef]); // eslint-disable-line

  function running() {
    if (startRef && endRef && innerRef) {
      beforeRun();
      const flyOuterRef = innerRef.current.flyOuterRef.current;
      const flyInnerRef = innerRef.current.flyInnerRef.current;

      // 现在起点距离终点的距离
      const startDot = startRef.current.getBoundingClientRect();
      const endDot = endRef.current.getBoundingClientRect();

      // 中心点的水平垂直距离
      const offsetX = endDot.left + endDot.width / 4 - (startDot.left + startDot.width / 2);
      // let offsetY = endDot.top + endDot.height / 2 - (startDot.top + startDot.height / 2);
      const offsetY = endDot.top + endDot.height / 4 - (startDot.top + startDot.height / 2);

      // 页面滚动尺寸
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop || 0;
      const scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft || 0;
      if (!isRunning) {
        // 初始定位
        flyOuterRef.style.display = 'block';
        flyOuterRef.style.left = `${
          startDot.left + scrollLeft + startRef.current.clientWidth / 2
        }px`;
        flyOuterRef.style.top = `${startDot.top + scrollTop + startRef.current.clientHeight / 2}px`;

        // 开始动画
        flyOuterRef.style.transform = `translateX(${offsetX}px)`;
        flyInnerRef.style.transform = `translateY(${offsetY}px)`;

        // 动画标志量
        isRunning = true;
        setTimeout(() => {
          flyOuterRef.style.display = 'none';
          flyOuterRef.style.left = '';
          flyOuterRef.style.top = '';
          flyOuterRef.style.transform = '';
          flyInnerRef.style.transform = '';
          isRunning = false;

          afterRun();
        }, runTime);
      }
    }
  }

  return { running };
}