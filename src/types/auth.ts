interface PhoneNumber {
    phone_number: string;
}

interface VerificationCode extends PhoneNumber {
    verification_code: string;
}

export type AuthTypes = PhoneNumber | VerificationCode;
