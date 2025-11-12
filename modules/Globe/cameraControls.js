import { Vector3 } from 'three';

// Simple promise-based fly-to using linear interpolation over duration
export function FlyToCamera(camera, targetVec3, opts = {}) {
  const duration = opts.duration ?? 900; // ms
  const startPos = camera.position.clone();
  const startTarget = (camera.target && camera.target.clone && camera.target.clone()) || new Vector3(0,0,0);
  const endPos = targetVec3.clone().add(new Vector3(0, 0, 2.6)); // offset back a bit

  const startTime = performance.now();

  function easeOutQuart(t) { return 1 - Math.pow(1 - t, 4); }

  return new Promise(resolve => {
    function step(now) {
      const t = Math.min(1, (now - startTime) / duration);
      const e = easeOutQuart(t);
      camera.position.lerpVectors(startPos, endPos, e);
      // if you're using OrbitControls, set controls.target here if accessible
      if (camera.controls && camera.controls.target) {
        camera.controls.target.lerpVectors(startTarget, targetVec3, e);
        camera.controls.update && camera.controls.update();
      }
      if (t < 1) requestAnimationFrame(step);
      else resolve();
    }
    requestAnimationFrame(step);
  });
}