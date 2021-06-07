export class LocalStorage {
    static getItem(itemName) {
        return window.localStorage.getItem(itemName);
    }

    static setItem(itemName, itemValue) {
        return window.localStorage.setItem(itemName, itemValue);
    }

    static clear() {
        window.localStorage.clear();
    }
}