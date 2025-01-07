'use client'
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface UserProfile {
    telegram_id: string;
    username: string;
    imageUrl: string;
}

interface ProfileContextProps {
    user: UserProfile | null;
    setUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
    loading: boolean;
    error: string | null;
}

const ProfileContext = createContext<ProfileContextProps | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const tg = (window as any).Telegram.WebApp;
            if (!tg.initDataUnsafe?.user) {
                setLoading(false);
                setError('Не удалось получить данные пользователя Telegram');
                return;
            }

            const telegramId = tg.initDataUnsafe.user.id;

            try {
                const response = await fetch(`/api/user?telegram_id=${telegramId}`);
                if (response.ok) {
                    const userData: UserProfile = await response.json();
                    setUser(userData);
                } else {
                    setError('Ошибка при получении данных пользователя');
                }
            } catch (error) {
                console.error('Ошибка при получении данных пользователя:', error);
                setError('Произошла ошибка при загрузке данных пользователя');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    return (
        <ProfileContext.Provider value={{ user, setUser, loading, error }}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = (): ProfileContextProps => {
    const context = useContext(ProfileContext);
    if (!context) {
        throw new Error('useProfile must be used within a ProfileProvider');
    }
    return context;
};
