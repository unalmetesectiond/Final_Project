class User {
    constructor(username, PIN, balance = 0) {
        this.username = username;
        this.PIN = PIN;
        this.balance = balance;
    }

    authenticate(enteredPIN) {
        return this.PIN === enteredPIN;
    }

    viewBalance() {
        return this.balance;
    }

    deposit(amount) {
        if (amount > 0) {
            this.balance += amount;
            return true;
        }
        return false;
    }

    withdraw(amount) {
        if (amount > 0 && this.balance >= amount) {
            this.balance -= amount;
            return true;
        }
        return false;
    }

    changePIN(newPIN) {
        this.PIN = newPIN;
    }
}

module.exports = User;