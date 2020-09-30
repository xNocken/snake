import render from './render';
import globals from './globals';
import logic from './logic';
import init from './init';

export default () => {
  const maxRetryCount = 1000;

  let lastTime = window.performance.now();
  let secondwaitTime = 0;
  let tickWaitTime = 0;
  let frameCount = 0;
  let tickCount = 0;

  const main = (totalTime) => {
    const TPS = globals.targetTPS;
    let retryCount = 0;
    globals.animationFrame = window.requestAnimationFrame(main);

    if (tickWaitTime > 1000 / TPS) {
      logic();
      tickCount += 1;
      tickWaitTime -= 1000 / TPS;
      retryCount += 1;

      if (retryCount > maxRetryCount) {
        tickWaitTime = 0;
      }
    }

    render();
    frameCount += 1;

    if (secondwaitTime > 1000) {
      globals.fps = frameCount;
      globals.tps = tickCount;

      frameCount = 0;
      tickCount = 0;

      secondwaitTime = 0;
    }

    tickWaitTime += totalTime - lastTime;
    secondwaitTime += totalTime - lastTime;
    lastTime = totalTime;
  };

  init();
  main(0);
};
