class Sprite {
  constructor (x, y, width, height, image) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = image;
    this.bitmask = [];

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')

    canvas.width = width;
    canvas.height = height;
    
    ctx.drawImage(image, this.x, this.y, this.width, this.height, 0, 0, this.width, this.height);

    const { data } = ctx.getImageData(0, 0, this.width, this.height)

    for (let i = 0; i < data.length; i += 4) {
      const { [3 + i]: a } = data;

      this.bitmask.push(a !== 0 ? true : false)
    }
  }

  isPointFilled (x, y) {
    return this.bitmask[x + (y * this.width)];
  }
}