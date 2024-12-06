export function timeToHeight (gravity: number, voy: number, height: number) {
  return quadratic(gravity / 2, Math.abs(voy), -Math.abs(height));
}

export function quadratic (a: number, b: number, c: number) {
  return (
    (-b + Math.sqrt(Math.pow(b, 2) - (4 * a * c))) / (2 * a)
  )
}