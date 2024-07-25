export const calculateFurthestPoint = (event: MouseEvent) => {
  const element = event.target as HTMLElement;
  if (!element) return;

  const rect = element.getBoundingClientRect();
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  // Calculate distances to each corner
  const topLeft = Math.sqrt(Math.pow(mouseX - rect.left, 2) + Math.pow(mouseY - rect.top, 2));
  const topRight = Math.sqrt(Math.pow(mouseX - rect.right, 2) + Math.pow(mouseY - rect.top, 2));
  const bottomLeft = Math.sqrt(Math.pow(mouseX - rect.left, 2) + Math.pow(mouseY - rect.bottom, 2));
  const bottomRight = Math.sqrt(
    Math.pow(mouseX - rect.right, 2) + Math.pow(mouseY - rect.bottom, 2)
  );

  // Return the maximum distance
  return Math.max(topLeft, topRight, bottomLeft, bottomRight);
};
