const validateEmail = (email) => {
    if (typeof email !== 'string') return false;
    const atIndex = email.indexOf('@');
    const dotIndex = email.lastIndexOf('.');
    return (
        atIndex > 0 &&
        dotIndex > atIndex + 1 &&
        dotIndex < email.length - 1
    );
};

const validatePIN = (pin) => {
    return typeof pin === 'string' && pin.length === 4 && !isNaN(pin) && Number.isInteger(Number(pin));
};

const validateAmount = (amount) => {
    return typeof amount === 'number' && amount > 0;
};

module.exports = {
    validateEmail,
    validatePIN,
    validateAmount,
};
