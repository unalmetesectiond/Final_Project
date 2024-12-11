const BankingApp = require('./bankingApp');

const readInput = (query) =>
    new Promise((resolve) => {
        process.stdout.write(query);
        process.stdin.once('data', (data) => resolve(data.toString().trim()));
    });

(async () => {
    const app = new BankingApp();
    console.log('Welcome to the Banking App!');
    let authenticatedUser = null;
    let sessionFailures = 0;
    let email = null;

    // Prompt for email
    do {
        email = await readInput('Enter your email: ');

        // Strictly validate email existence
        if (!app.isValidEmail(email)) {
            console.log('Invalid email. Please try again.'); // Notify the user
            continue; // Re-prompt for email
        }

        // Check if the account is locked
        if (app.isAccountLocked(email)) {
            console.log('Your account is permanently locked due to too many failed attempts.');
            process.stdin.pause();
            return;
        }

        // If email is valid and account is not locked, proceed
        break;
    } while (true);
