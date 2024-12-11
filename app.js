const BankingApp = require('./bankingApp');

const readInput = (query) =>
    new Promise((resolve) => {
        process.stdout.write(query);
        process.stdin.once('data', (data) => resolve(data.toString().trim()));
    });