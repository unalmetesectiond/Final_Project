const fs = require('fs');
const User = require('./user');
const ETransfer = require('./etransfer');
const { validateEmail, validatePIN, validateAmount } = require('./utils');

class BankingApp {
    constructor() {
        this.users = [];
        this.pendingTransfers = [];
        this.failedAttempts = {};
        this.loadData();
    }

    loadData() {
        try {
            const userData = fs.readFileSync('./data/users.json', 'utf8');
            this.users = JSON.parse(userData).map(
                (u) => new User(u.username, u.PIN, u.balance)
            );

            const transferData = fs.readFileSync('./data/pendingTransfers.json', 'utf8');
            this.pendingTransfers = JSON.parse(transferData).map(
                (t) => new ETransfer(t.senderEmail, t.recipientEmail, t.amount, t.securityQuestion, t.securityAnswer)
            );

            const failedAttemptsData = fs.readFileSync('./data/failedAttempts.json', 'utf8');
            this.failedAttempts = JSON.parse(failedAttemptsData);
        } catch (err) {
            console.error('Error loading data:', err);
        }
    }

    saveData() {
        fs.writeFileSync(
            './data/users.json',
            JSON.stringify(
                this.users.map((u) => ({
                    username: u.username,
                    PIN: u.PIN,
                    balance: u.balance,
                })),
                null,
                2
            )
        );
        fs.writeFileSync('./data/pendingTransfers.json', JSON.stringify(this.pendingTransfers, null, 2));
        fs.writeFileSync('./data/failedAttempts.json', JSON.stringify(this.failedAttempts, null, 2));
    }

    authenticateUser(email, PIN) {
        const user = this.users.find((u) => u.username === email);

        if (!this.failedAttempts[email]) {
            this.failedAttempts[email] = 0;
        }

        if (this.failedAttempts[email] >= 10) {
            return 'LOCKED';
        }

        if (user && user.authenticate(PIN)) {
            this.failedAttempts[email] = 0;
            this.saveData();
            return user;
        }

        this.failedAttempts[email]++;
        this.saveData();

        if (this.failedAttempts[email] >= 10) {
            console.log('Your account is permanently locked.');
            return 'LOCKED';
        }

        return null;
    }

    isValidEmail(email) {
        // Check if the email exists in the list of users
        return this.users.some((user) => user.username === email);
    }
    

    isAccountLocked(email) {
        return this.failedAttempts[email] >= 10;
    }