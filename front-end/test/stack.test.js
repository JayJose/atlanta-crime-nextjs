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
}

describe('My Stack', () => {
  let stack;
  beforeEach(() => (stack = new Stack()));

  it('is created empty', () => {
    expect(stack.top).toBe(-1);
    expect(stack.items).toEqual({});
  });

  it('it can push to the top', () => {
    stack.push('XXX');
    expect(stack.top).toBe(0);
    expect(stack.peek).toBe('XXX');
  });

  it.todo('is can pop off');
  //  removes the last element from an array and returns that element
});
