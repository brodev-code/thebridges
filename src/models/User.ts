export interface User {
    id?: number; // Opsiyonel hale getirildi
    name?: string;
    email?: string;
    email_verified_at?: string;
    provider?: string;
    provider_id?: string;
    phone?: string;
    avatar?: string;
    role?: string;
    location?: string;
    latitude?: number;
    longitude?: number;
    agreement?: number;
    created_at?: string;
    updated_at?: string;
}
