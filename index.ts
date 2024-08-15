import { HashTable, LinkedList } from './data-structures';

(() => {
    console.log('--- Hash Table ---');
    const hashTable = new HashTable<string, string>();
    const baseChar = 'A'.charCodeAt(0); // ASCII value for 'A'

    // Generate 16 unique keys that each map to a different bucket
    for (let i = 0; i < HashTable.SIZE; i++) {
        let key = String.fromCharCode(baseChar + i) + String.fromCharCode(baseChar + i);
        if (i === 15) {
            key += 'O'; // Add 'O' to the last key to make it hash to bucket 15
        }
        hashTable.set(key, `Value ${i}`);
    }
    hashTable.set('PPO', 'Tommy Ng');
    hashTable.set('john', 'John Doe');
    hashTable.set('tommy', 'Tommy Ng');
    console.log(hashTable.toString());
    console.log('Get key: john, value:', hashTable.get('john'));
    console.log('Get key: tommy, value:', hashTable.get('tommy'));
    console.log('Get key: hihi, value:', hashTable.get('hihi'));
    console.log('Remove key: john', hashTable.remove('john'));
    console.log(hashTable.toString());

    console.log('--- Linked List ---');
    // Create a new linked list
    const linkedList = new LinkedList<number>();

    // Add 10 elements to the linked list
    for (let i = 1; i <= 10; i++) {
        linkedList.insert(i, i);
    }

    console.log('Initial linked list:', linkedList.toString());

    // Insert value at index
    linkedList.insert(5, 50);
    console.log('After inserting 50 at index 5:', linkedList.toString());

    // Remove value at index
    linkedList.remove(7);
    console.log('After removing value at index 7:', linkedList.toString());

    // Get value at index
    const node = linkedList.get(3);
    console.log('Value at index 3:' + node?.value);

    linkedList.insert(-1, 60);
    linkedList.insert(12, 70);
    console.log('After inserting 60 at index -1 and 70 at index 12:', linkedList.toString());
})();
