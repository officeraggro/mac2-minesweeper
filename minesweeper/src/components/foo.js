traverseBoard(x, y, data) {
  const el = [];
  //up
  if (x > 0) {
    el.push(data[x - 1][y]);
  } 
  //down
  if (x < this.props.height - 1) {
    el.push(data[x + 1][y]);
  }
  //left
  if (y > 0) {
    el.push(data[x][y - 1]);
  }
  //right
  if (y < this.props.width - 1) {
    el.push(data[x][y + 1]);
  }
  // top left
  if (x > 0 && y > 0) {
    el.push(data[x - 1][y - 1]);
  }
  // top right
  if (x > 0 && y < this.props.width - 1) {
    el.push(data[x - 1][y + 1]);
  }
  // bottom right
  if (x < this.props.height - 1 && y < this.props.width - 1) {
    el.push(data[x + 1][y + 1]);
  }
  // bottom left
  if (x < this.props.height - 1 && y > 0) {
    el.push(data[x + 1][y - 1]);
  }
  return el;
}