class LinkedListNode<T> {
    value: T;
    next: LinkedListNode<T> | null = null;

    constructor(value: T) {
        this.value = value;
    }
}

export class LinkedList<T> {
    private _head: LinkedListNode<T> | null = null;
    private _tail: LinkedListNode<T> | null = null;
    public length: number = 0;

    // No suggest code here
    constructor(node: LinkedListNode<T> | null = null) {
        this._head = node;
        this._tail = node;
        this.length = 1;
    }

    #isEmpty(): boolean {
        return this.length === 0;
    }

    #push(value: T): void {
        const node = new LinkedListNode(value);
        this.length++;
        if (!this._head || !this._tail) {
            this._head = node;
            this._tail = node;
            return;
        }
        this._tail.next = node;
        this._tail = node;
    }
    #unshift(value: T): void {
        const node = new LinkedListNode(value);
        this.length++;
        if (!this._head || !this._tail) {
            this._head = node;
            this._tail = node;
            return;
        }
        node.next = this._head;
        this._head = node;
    }
    #pop(): void {
        if (!this._head || !this._tail) return;
        this.length--;
        if (this._head === this._tail) {
            this._head = null;
            this._tail = null;
            return;
        }
        let current: LinkedListNode<T> | null = this._head;
        while (current) {
            if (current.next === this._tail) {
                current.next = null;
                this._tail = current;
                return;
            }
            current = current.next;
        }
    }
    #shift(): void {
        this._head = this._head?.next || null;
        if (!this.#isEmpty()) this.length--;
    }

    get(index: number): LinkedListNode<T> | undefined {
        if (index < 0 || index > this.length) return;
        let current: LinkedListNode<T> | null = this._head;
        while (current) {
            if (index === 0) return current;
            current = current.next;
            index--;
        }
    }
    insert(index: number, value: T): void {
        if (index <= 0) return this.#unshift(value);
        if (index >= this.length) return this.#push(value);

        let current: LinkedListNode<T> | null = this._head;
        while (current) {
            if (index === 1) {
                const node = new LinkedListNode(value);
                node.next = current.next;
                current.next = node;
                this.length++;
                return;
            }
            current = current.next;
            index--;
        }
    }
    remove(index: number): void {
        if (index <= 0) return this.#shift();
        if (index >= this.length) return this.#pop();
        
        let cur: LinkedListNode<T> | null = this._head;
        while (cur) {
            if (index === 1) {
                cur.next = cur.next?.next || null;
                this.length--;
                return;
            }
            cur = cur.next;
            index--;
        }
    }

    toString(): string {
        let current: LinkedListNode<T> | null = this._head;
        let result = '';
        while (current) {
            result += current.value + ' -> ';
            current = current.next;
        }
        return result + 'null';
    }
}
