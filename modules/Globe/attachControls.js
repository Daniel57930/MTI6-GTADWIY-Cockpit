export function attachControls(camera, controls) {
  if (!camera) return;
  camera.controls = controls;
  if (controls && typeof controls.update === 'function') controls.update();
}