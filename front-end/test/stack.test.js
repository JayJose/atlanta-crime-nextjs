class Stack {
  constructor() {
    this.top = -1;
    this.items = {};
  }

  get peek() {
    return this.items[this.top];
  }

  push(value) {
    this.top += 1;
    this.items[this.top] = value;
  }

  get pop() {
    let val = this.items[this.top];
    delete this.items[this.top];
    this.top -= 1;
    return val;
  }
}

describe('My Stack', () => {
  let stack;
  beforeEach(() => (stack = new Stack()));

  it('is created empty', () => {
    expect(stack.top).toBe(-1);
    expect(stack.items).toEqual({});
  });

  it('it can push to the top', () => {
    let pushVal = '😎';
    stack.push(pushVal);
    expect(stack.top).toBe(0);
    expect(stack.peek).toBe(pushVal);
  });

  it('is can pop off', () => {
    let vals = ['firstVal', 'secondVal'];
    vals.forEach((e) => stack.push(e));
    expect(stack.pop).toBe('secondVal');
  });
});
