const CANVAS_WIDTH = 800;

const CANVAS_HEIGHT = 480;

const GAME_BASELINE_THICKNESS = 4;

const GAME_BASELINE_POSITION = 450;

const GAME_BASELINE_UPPER_LIMIT = GAME_BASELINE_POSITION - (GAME_BASELINE_THICKNESS / 2);

function rect_rect_collision (A, B) {
  if (
    (A.x < (B.x + B.width)) &&
    (A.x + A.width > B.x) &&
    (A.y < B.y + B.height) &&
    (A.y + A.height > B.y)
  ) {
    return pixel_perfect_collision(A, B);
  } else {
    return false;
  }
}

function pixel_perfect_collision (player, obstacle) {
  const x1 = Math.max(player.x, obstacle.x);
  const x2 = Math.min((player.x + player.width), (obstacle.x + obstacle.width));
  
  const y1 = Math.max(player.y, obstacle.y);
  const y2 = Math.min((player.y + player.height), (obstacle.y + obstacle.height));

  for (let x = x1; x <= x2; x++) {
    for (let y = y1; y <= y2; y++) {
      const a = player.sprite[0].isPointFilled(
        Math.ceil(x - player.x), 
        Math.ceil(y - player.y)
      );
      const b = true;

      if (a && b) {
        return true;
      }
    }
  }

  return false;
}