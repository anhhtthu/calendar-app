export const calendarVariants = (direction) => ({
  hidden: { opacity: 0.1, x: direction === 0 ? 100 : -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "tween",
      ease: "easeInOut",
      duration: 0.4,
    },
  },
  exit: { opacity: 0, x: direction === 0 ? -100 : 100 },
});
