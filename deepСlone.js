function deepCopy(obj, clonedObjects = new WeakMap()) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    if (clonedObjects.has(obj)) {
        return clonedObjects.get(obj);
    }

    let clone;

    if (obj instanceof Date) {
        clone = new Date(obj);
    } 

    else if (obj instanceof Map) {
        clone = new Map(Array.from(obj, ([key, val]) => [key, deepCopy(val, clonedObjects)]));
    } 

    else if (obj instanceof Set) {
        clone = new Set(Array.from(obj, val => deepCopy(val, clonedObjects)));
    } 

    else if (Array.isArray(obj)) {
        clone = obj.map(item => deepCopy(item, clonedObjects));
    } 

    else if (typeof obj === 'object') {
        clone = Object.create(Object.getPrototypeOf(obj));

        clonedObjects.set(obj, clone);
        for (let key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                clone[key] = deepCopy(obj[key], clonedObjects);
            }
        }
    }

    return clone;
}

const originalObj = {
    name: 'John',
    age: 30,
    address: {
        city: 'New York',
        country: 'USA'
    }
};

// Проверяю, что объекты глубоко копируются, и изменения в копии не влияют на исходный объект
const copiedObj = deepCopy(originalObj);

copiedObj.age = 40;
copiedObj.address.city = 'Los Angeles';

console.log(originalObj); 
console.log(copiedObj);  

//Проверяю, что изменения в исходном объекте не влияют на его копию
originalObj.name = 'Alice';
originalObj.address.country = 'Canada';

console.log(originalObj); 
console.log(copiedObj);  

//Проверяю, что циклические ссылки обрабатываются правильно
const cyclicObj = { prop: {} };
cyclicObj.prop.circularRef = cyclicObj;

const copiedCyclicObj = deepCopy(cyclicObj);

console.log(copiedCyclicObj);

//Проверяю, что специальные типы данных копируются правильно
const originalMap = new Map([[1, 'one'], [2, 'two']]);
const copiedMap = deepCopy(originalMap);

originalMap.set(3, 'three');

console.log(originalMap); 
console.log(copiedMap); 