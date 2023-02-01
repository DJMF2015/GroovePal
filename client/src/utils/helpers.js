export const catchErrors = (fn) => {
  return function (...args) {
    return fn(...args).catch((err) => {
      console.error(err);
    });
  };
};

export const formatDuration = (ms) => {
  const mins = Math.floor(ms / 60000);
  const secs = Math.floor(ms / 1000) % 60;
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};
