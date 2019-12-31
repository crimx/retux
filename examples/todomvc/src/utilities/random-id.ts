export const getRandomId = (): string =>
  Date.now()
    .toString()
    .slice(6) +
  Math.random()
    .toString()
    .slice(2, 8)
