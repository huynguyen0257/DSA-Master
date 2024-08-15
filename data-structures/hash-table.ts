type HashTableKey = string | number | object;

export class HashTable<K extends HashTableKey, V> {
    static SIZE = 16;
    private _table: Array<Array<[K, V]>> = new Array(HashTable.SIZE);
    constructor() {
        for (let i = 0; i < HashTable.SIZE; i++) {
            this._table[i] = [];
        }
    }

    #hashFunction = (key: K): number => {
        if (typeof key === 'number') {
            return key % HashTable.SIZE;
        }
        if (typeof key === 'string') {
            let hash = 0;
            for (let i = 0; i < key.length; i++) {
                hash += key.charCodeAt(i);
            }
            return hash % HashTable.SIZE;
        }

        if (typeof key === 'object') {
            const s = JSON.stringify(key);
            let hash = 0;
            for (let i = 0; i < s.length; i++) {
                hash += s.charCodeAt(i);
            }
            return hash % HashTable.SIZE;
        }
        throw new Error('Invalid key type: ' + typeof key);
    };

    get(key: K): V | undefined {
        const index = this.#hashFunction(key);
        for (const [k, v] of this._table[index]) {
            if (k === key) return v;
        }
    }

    set(key: K, value: any): void {
        const index = this.#hashFunction(key);
        if (!this._table[index]) {
            this._table[index] = [];
        }
        for (const [k, _] of this._table[index]) {
            if (k === key) return;
        }
        this._table[index].push([key, value]);
    }

    remove(key: K): any {
        const index = this.#hashFunction(key);
        for (let i = 0; i < this._table[index].length; i++) {
            if (this._table[index][i][0] === key) {
                this._table[index].splice(i, 1);
                return;
            }
        }
    }

    toString(): string {
        return this._table
            .map((item, index) => {
                let str = `${index}:\t${item.map(([k, v]) => `[${k}, ${v}]`).join(' - ')}`;
                if (index === 0) {
                    str = `[KEY]:\t[VALUE]\n` + str;
                }
                return str;
            })
            .join('\n');
    }
}
