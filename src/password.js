function generatePassword(length) {
    if (length < 8) {
        throw new Error("Password length must be at least 8 characters");
    }
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let password = "";

    while (!/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/\d/.test(password) || !/[\W_]/.test(password) || password.length < length) {
        password = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
    }

    return password;
}

module.exports = generatePassword;