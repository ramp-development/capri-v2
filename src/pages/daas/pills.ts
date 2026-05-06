// Declare Matter.js global from CDN
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const Matter: any;

export const pills = () => {
  // Wait for Matter.js to be available
  if (typeof Matter === 'undefined') {
    console.error('Matter.js not loaded');
    return;
  }

  const { Engine, Bodies, World, Events, Runner } = Matter;

  const container = document.querySelector<HTMLElement>('[data-problem="container"]');
  const pillElements = document.querySelectorAll<HTMLElement>('[data-problem="pill"]');

  if (!container || pillElements.length === 0) {
    console.error('Required elements not found');
    return;
  }

  // Get container dimensions
  const containerRect = container.getBoundingClientRect();
  const containerWidth = containerRect.width;
  const containerHeight = containerRect.height;

  // Create physics engine
  const engine = Engine.create({
    gravity: { x: 0, y: 1 },
  });

  // Create invisible runner (no canvas)
  const runner = Runner.create();

  // Store pill data
  const pillData: Array<{
    element: HTMLElement;
    body: Matter.Body;
    width: number;
    height: number;
  }> = [];

  // Create physics bodies for each pill
  pillElements.forEach((pill, index) => {
    const rect = pill.getBoundingClientRect();
    const { width } = rect;
    const { height } = rect;
    const radius = height / 2;

    // Starting position pattern: left, right, middle, left, right, middle...
    const positions = [0, containerWidth - width, (containerWidth - width) / 2];
    const startX = positions[index % 3] + width / 2;
    const remInPixels = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const verticalGap = 2 * remInPixels; // 2rem gap
    const startY = -(height + index * (height + verticalGap)); // Stack above container with gaps

    // Create pill-shaped body (rectangle with rounded ends)
    const body = Bodies.rectangle(startX, startY, width, height, {
      chamfer: { radius: radius },
      restitution: 0.4,
      friction: 0.3,
      density: 0.001,
      angle: (Math.random() - 0.5) * 0.5, // Small random initial rotation
    });

    World.add(engine.world, body);

    pillData.push({
      element: pill,
      body,
      width,
      height,
    });

    // Set initial position and hide pill
    pill.style.position = 'absolute';
    pill.style.left = '0';
    pill.style.top = '0';
    pill.style.opacity = '0';
  });

  // Create static walls (invisible boundaries)
  const wallThickness = 50;
  const floor = Bodies.rectangle(
    containerWidth / 2,
    containerHeight + wallThickness / 2,
    containerWidth,
    wallThickness,
    { isStatic: true }
  );

  const leftWall = Bodies.rectangle(
    -wallThickness / 2,
    containerHeight / 2,
    wallThickness,
    containerHeight * 2,
    { isStatic: true }
  );

  const rightWall = Bodies.rectangle(
    containerWidth + wallThickness / 2,
    containerHeight / 2,
    wallThickness,
    containerHeight * 2,
    { isStatic: true }
  );

  World.add(engine.world, [floor, leftWall, rightWall]);

  // Track pills that are currently flashing
  const flashingPills = new Set<HTMLElement>();

  // Collision detection for yellow flash
  Events.on(engine, 'collisionStart', (event) => {
    event.pairs.forEach((pair) => {
      pillData.forEach(({ element, body }) => {
        if (pair.bodyA === body || pair.bodyB === body) {
          if (!flashingPills.has(element)) {
            flashingPills.add(element);

            // Apply flash styles
            element.classList.add('w-variant-c3f742c5-d7b7-7392-d792-44247bb8a44f');
            // element.style.backgroundColor = 'yellow';
            // element.style.color = 'black';

            // Revert after brief delay
            setTimeout(() => {
              element.classList.remove('w-variant-c3f742c5-d7b7-7392-d792-44247bb8a44f');
              //   element.style.backgroundColor = '';
              //   element.style.color = '';
              flashingPills.delete(element);
            }, 150);
          }
        }
      });
    });
  });

  // Track if animation is complete
  let animationComplete = false;
  let settlementTimer: number | null = null;

  // Update DOM elements to match physics bodies
  Events.on(engine, 'afterUpdate', () => {
    if (animationComplete) return;

    pillData.forEach(({ element, body, width, height }) => {
      const { x, y } = body.position;
      const { angle } = body;

      // Offset by half width/height since Matter.js uses center point
      const offsetX = x - width / 2;
      const offsetY = y - height / 2;

      element.style.transform = `translate(${offsetX}px, ${offsetY}px) rotate(${angle}rad)`;
      element.style.transformOrigin = 'center';
    });

    // Check if all bodies have settled (low velocity)
    const allSettled = pillData.every(({ body }) => {
      const speed = Math.sqrt(body.velocity.x ** 2 + body.velocity.y ** 2);
      const angularSpeed = Math.abs(body.angularVelocity);
      return speed < 0.1 && angularSpeed < 0.01;
    });

    if (allSettled) {
      // Wait a bit to ensure they're truly settled
      if (!settlementTimer) {
        settlementTimer = window.setTimeout(() => {
          animationComplete = true;
          Runner.stop(runner);
        }, 500);
      }
    } else {
      // Reset timer if movement detected
      if (settlementTimer) {
        clearTimeout(settlementTimer);
        settlementTimer = null;
      }
    }
  });

  // ScrollTrigger to start animation
  gsap.registerPlugin(ScrollTrigger);

  ScrollTrigger.create({
    trigger: container,
    start: 'top 80%',
    once: true,
    onEnter: () => {
      // Show pills and start physics engine
      pillData.forEach(({ element }) => {
        element.style.opacity = '1';
      });
      Runner.run(runner, engine);
    },
  });
};
