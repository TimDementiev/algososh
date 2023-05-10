export type TNode<T> = {
  value: T;
  next: TNode<T> | null;
};

export class Node<T> implements TNode<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T, next: Node<T> | null = null) {
    this.value = value;
    this.next = next;
  }
}

type TLinkedList<T> = {
  append: (element: T) => void;
  prepend: (element: T) => void;
  deleteTail: () => void;
  deleteHead: () => void;
  toArray: () => TNode<T>[];
  findByIndex: (index: number) => Node<T>;
  addByIndex: (index: number, data: T) => void;
  deleteByIndex: (index: number) => void;
  getLastAddedNode: () => Node<T> | null;
  isEmpty: () => boolean;
  getLength: () => number;
};

export class LinkedList<T> implements TLinkedList<T> {
  private head: Node<T> | null;
  private tail: Node<T> | null;
  private length: number;
  private lastAddedNode: Node<T> | null;
  constructor(values: T[] = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;
    this.lastAddedNode = null;
    for (let val of values) {
      this.append(val);
    }
  }
  prepend(value: T) {
    const newNode = new Node(value, this.head);
    this.head = newNode;
    if (!this.tail) {
      this.tail = newNode;
      this.length++;
    }
    this.length++;
    this.lastAddedNode = newNode;
    return this;
  }
  append(value: T) {
    const newNode = new Node(value);
    if (!this.head || !this.tail) {
      this.head = newNode;
      this.tail = newNode;
      this.length++;
      return this;
    }

    this.tail.next = newNode;
    this.tail = newNode;
    this.length++;
    this.lastAddedNode = newNode;
    return this;
  }
  deleteTail() {
    if (!this.tail) {
      return null;
    }
    const deletedTail = this.tail;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
      this.length = 0;
      return deletedTail;
    }
    let currentNode: Node<T> | null = this.head;
    while (currentNode!.next) {
      if (!currentNode!.next.next) {
        currentNode!.next = null;
      } else {
        currentNode = currentNode!.next;
      }
    }

    this.tail = currentNode;
    this.length--;
    return deletedTail;
  }
  deleteHead() {
    if (!this.head) {
      return null;
    }
    const deletedHead = this.head;
    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }
    this.length--;
    return deletedHead;
  }

  toArray() {
    const nodes = [];
    let currentNode = this.head;
    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }
    return nodes;
  }
  findByIndex(index: number) {
    if (index < 0 || index >= this.length) {
      return null;
    }
    let current: any = this.head;
    let i = 0;
    while (i < index) {
      current = current!.next;
      i++;
    }
    return current!.value;
  }
  addByIndex(index: number, data: T): void {
    if (index < 0 || index > this.length) {
      throw new Error("Index out of bounds");
    }

    const newNode = new Node(data);

    if (index === 0) {
      newNode.next = this.head;
      this.head = newNode;
    } else if (index === this.length) {
      this.tail!.next = newNode;
      this.tail = newNode;
    } else {
      let prev: Node<T> | null = null;
      let current = this.head;
      for (let i = 0; i < index; i++) {
        prev = current;
        current = current!.next;
      }
      prev!.next = newNode;
      newNode.next = current;
    }

    this.length++;
  }

  deleteByIndex(index: number): T {
    if (index < 0 || index >= this.length) {
      throw new Error("Index out of bounds");
    }

    let deletedNode: Node<T> | null = null;

    if (index === 0) {
      deletedNode = this.head;
      this.head = this.head!.next;
      if (this.length === 1) {
        this.tail = null;
      }
    } else {
      let prev: Node<T> | null = null;
      let current = this.head;
      for (let i = 0; i < index; i++) {
        prev = current;
        current = current!.next;
      }

      deletedNode = current;
      prev!.next = current!.next;
      if (index === this.length - 1) {
        this.tail = prev;
      }
    }

    this.length--;
    return deletedNode!.value;
  }
  getLength() {
    return this.length;
  }
  getLastAddedNode() {
    return this.lastAddedNode;
  }
  isEmpty() {
    return this.length === 0;
  }
}
