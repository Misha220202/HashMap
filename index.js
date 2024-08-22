class HashMap {
    constructor(initialCapacity = 16) {
        this.buckets = Array.from({ length: initialCapacity }, () => []);
        this.size = 0;
        this.loadFactor = 0.75;
        this.initialCapacity = 16;
        this.capacity = initialCapacity;
    }

    check(index) {
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bound");
        }
    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
        return hashCode;
    }

    set(key, value) {
        const index = this.hash(key);
        for (let i = 0; i < this.buckets[index].length; i++) {
            const currentKey = this.buckets[index][i][0];
            if (key === currentKey) {
                this.buckets[index][i] = [key, value];
                return;
            }
        }
        this.buckets[index].push([key, value]);
        this.size++;

        if (this.size / this.capacity >= this.loadFactor) {
            const newCapacity = this.capacity * 2;
            const newBuckets = Array.from({ length: newCapacity }, () => []);
            this.buckets.forEach(bucket => {
                bucket.forEach(dataSet => {
                    const key = dataSet[0];
                    const index = this.hash(key) % newCapacity;
                    newBuckets[index].push(dataSet);
                });
            });
            this.buckets = newBuckets;
            this.capacity = newCapacity;
        }
    }

    get(key) {
        const index = this.hash(key);
        for (let i = 0; i < this.buckets[index].length; i++) {
            const currentKey = this.buckets[index][i][0];
            if (key === currentKey) {
                const value = this.buckets[index][i][1];
                return value;
            }
        }
        return null;
    }

    has(key) {
        return this.get(key) !== null;
    }

    remove(key) {
        const index = this.hash(key);
        for (let i = 0; i < this.buckets[index].length; i++) {
            const currentKey = this.buckets[index][i][0];
            if (key === currentKey) {
                this.buckets[index].splice(i, 1);
                this.size--;
                return true;
            }
        }
        return false;
    }

    length() {
        return this.size;
    }

    clear() {
        this.buckets = Array.from({ length: this.initialCapacity }, () => []);
        this.size = 0;
        this.capacity = this.initialCapacity;
    }

    keys() {
        const keysArr = [];
        this.buckets.forEach(bucket => {
            bucket.forEach(dataSet => keysArr.push(dataSet[0]));
        });
        return keysArr;
    }

    values() {
        const valuesArr = [];
        this.buckets.forEach(bucket => {
            bucket.forEach(dataSet => valuesArr.push(dataSet[1]));
        });
        return valuesArr;
    }

    entries() {
        const entriesArr = [];
        this.buckets.forEach(bucket => {
            bucket.forEach(dataSet => entriesArr.push(dataSet));
        });
        return entriesArr;
    }
}

const test = new HashMap()

test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')
test.set('moon', 'silver')

console.log(test)