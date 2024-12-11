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

    // Prompt for PIN
    do {
        const PIN = await readInput('Enter your PIN: ');

        const authResult = app.authenticateUser(email, PIN);

        // Handle locked account
        if (authResult === 'LOCKED') {
            console.log('Your account is permanently locked. Please contact support.');
            process.stdin.pause();
            return;
        }

        // Handle incorrect PIN
        if (!authResult) {
            sessionFailures++;
            console.log(`Invalid PIN. Attempt ${sessionFailures} of 3 for this session.`);

            // Exit after 3 incorrect attempts in the session
            if (sessionFailures >= 3) {
                console.log('Too many failed attempts. Exiting the application.');
                process.stdin.pause();
                return;
            }
        } else {
            // Reset session failures on successful login
            sessionFailures = 0;
            authenticatedUser = authResult;
        }
    } while (!authenticatedUser);

    // If authenticated, proceed to main menu
    if (authenticatedUser) {
        await app.mainMenu(authenticatedUser, readInput);
    }

    process.stdin.pause();
})();
