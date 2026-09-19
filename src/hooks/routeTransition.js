// Transição de rota "cortina primeiro": o TransitionLink chama begin() (a
// cortina do Loading desce), navega quando a tela já está coberta e o Loading,
// ao ver o pathname mudar, sabe que a cortina já está no ar (consumePending).
const listeners = new Set();
let pending = false;

export const CURTAIN_DOWN_MS = 560;

export const routeTransition = {
  begin() {
    pending = true;
    listeners.forEach((fn) => fn());
  },
  consumePending() {
    const was = pending;
    pending = false;
    return was;
  },
  subscribe(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
};
