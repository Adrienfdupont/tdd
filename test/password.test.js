const generatePassword = require('../src/password');

describe('Password Generator', () => {

    test('should generate a password with at least 8 characters', () => {
        const password = generatePassword(8);
        expect(password.length).toBeGreaterThanOrEqual(8);
    });

    test('should generate a password with at least 1 digit', () => {
        const password = generatePassword(8);
        expect(password).toMatch(/\d/);
    });

    test('should generate a password with at least 1 uppercase letter', () => {
        const password = generatePassword(8);
        expect(password).toMatch(/[A-Z]/);
    });

    test('should generate a password with at least 1 lowercase letter', () => {
        const password = generatePassword(8);
        expect(password).toMatch(/[a-z]/);
    });

    test('should generate a password with at least 1 special character', () => {
        const password = generatePassword(8);
        expect(password).toMatch(/[\W_]/);
    });

    test('should generate a password of the specified length', () => {
        const length = 12;
        const password = generatePassword(length);
        expect(password.length).toBe(length);
    });

    test('should throw an error when the password length is less than 8 characters', () => {
        expect(() => generatePassword(7)).toThrow('Password length must be at least 8 characters');
    });
});
