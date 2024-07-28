// Remove the "use client" directive and React imports
const { motion, animate, useMotionValue, useTransform } = window.framerMotion;

function AnimatedBeam({
  containerRef,
  fromRef,
  toRef,
  startYOffset = 0,
  endYOffset = 0,
  curvature = 100,
  reverse = false,
}) {
  const [pathLength, setPathLength] = React.useState(0);
  const [pos, setPos] = React.useState({ from: { x: 0, y: 0 }, to: { x: 0, y: 0 } });

  React.useEffect(() => {
    const updatePosition = () => {
      if (
        containerRef.current &&
        fromRef.current &&
        toRef.current &&
        containerRef.current.offsetWidth > 0
      ) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const fromRect = fromRef.current.getBoundingClientRect();
        const toRect = toRef.current.getBoundingClientRect();

        setPos({
          from: {
            x: fromRect.left - containerRect.left + fromRect.width / 2,
            y: fromRect.top - containerRect.top + fromRect.height / 2,
          },
          to: {
            x: toRect.left - containerRect.left + toRect.width / 2,
            y: toRect.top - containerRect.top + toRect.height / 2,
          },
        });
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("resize", updatePosition);
    };
  }, [containerRef, fromRef, toRef]);

  const { x: x1, y: y1 } = pos.from;
  const { x: x2, y: y2 } = pos.to;

  const pathDefinition = `M${x1},${y1 + startYOffset} C${x1},${
    y1 + curvature + startYOffset
  } ${x2},${y2 + curvature + endYOffset} ${x2},${y2 + endYOffset}`;

  const progress = useMotionValue(0);
  const pathOffset = useTransform(progress, (val) =>
    reverse ? val : 1 - val
  );

  React.useEffect(() => {
    const controls = animate(progress, 1, {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    });

    return controls.stop;
  }, [progress]);

  return React.createElement(motion.path, {
    d: pathDefinition,
    fill: "none",
    stroke: "#3b82f6",
    strokeWidth: "2",
    strokeDasharray: "0 1",
    strokeDashoffset: pathOffset,
  });
}