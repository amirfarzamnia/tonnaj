import { AuthTypes } from './auth';

export type SessionTypes = {
    phone_number: AuthTypes['phone_number'];
    created_at: number;
    session: string;
};
