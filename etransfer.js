class ETransfer {
    constructor(senderEmail, recipientEmail, amount, securityQuestion, securityAnswer) {
        this.senderEmail = senderEmail;
        this.recipientEmail = recipientEmail;
        this.amount = amount;
        this.securityQuestion = securityQuestion;
        this.securityAnswer = securityAnswer;
    }

    validateAnswer(answer) {
        return this.securityAnswer === answer;
    }
}

module.exports = ETransfer;
