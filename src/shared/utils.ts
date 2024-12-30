export function timeToHeight (gravity: number, voy: number, height: number) {
  return quadratic(gravity / 2, Math.abs(voy), -Math.abs(height));
}

export function quadratic (a: number, b: number, c: number) {
  return (
    (-b + Math.sqrt(Math.pow(b, 2) - (4 * a * c))) / (2 * a)
  )
}

export function elt<T extends HTMLElement>(name: string, attrs: Record<string, string>): T {
  let dom = document.createElement(name);

  for (let attr of Object.keys(attrs)) {
    dom.setAttribute(attr, attrs[attr]);
  }

  return dom as T;
}

export async function loadImage (url: string): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    const img = elt<HTMLImageElement>('img', { src: url });

    img.addEventListener('load', () => {
      resolve(img);
    }, { once: true })
  })
}