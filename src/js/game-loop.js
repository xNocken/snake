import render from './render';
import globals from './globals';
import logic from './logic';
import init from './init';

export default () => {
  const TPS = 10;

  let lastTime = window.performance.now();
  let secondwaitTime = 0;
  let tickWaitTime = 0;
  let frameCount = 0;
  let tickCount = 0;

  const main = (totalTime) => {
    globals.animationFrame = window.requestAnimationFrame(main);

    while (tickWaitTime > 1000 / TPS) {
      logic();
      tickCount += 1;
      tickWaitTime -= 1000 / TPS;
    }

    render();
    frameCount += 1;

    while (secondwaitTime > 1000) {
      globals.fps = frameCount;
      globals.tps = tickCount;

      frameCount = 0;
      tickCount = 0;

      secondwaitTime -= 1000;
    }

    tickWaitTime += totalTime - lastTime;
    secondwaitTime += totalTime - lastTime;
    lastTime = totalTime;
  };

  init();
  main(0);
};
