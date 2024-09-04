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
}

const ProfileContext = createContext<ProfileContextProps | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserProfile | null>(null);

    useEffect(() => {
        const loadUserData = async () => {
            if (user?.telegram_id) { // Используйте telegram_id вместо userId
                try {
                    const response = await fetch(`/api/user-data?userId=${user.telegram_id}`);
                    if (response.ok) {
                        const userData = await response.json();
                        if (userData) {
                            setUser(userData);
                        } else {
                            console.error('Пользователь не найден');
                        }
                    } else {
                        console.error('Ошибка при загрузке данных пользователя');
                    }
                } catch (error) {
                    console.error('Ошибка при загрузке данных пользователя:', error);
                }
            }
        };

        loadUserData();
    }, [user?.telegram_id]); // Добавьте зависимость

    return (
        <ProfileContext.Provider value={{ user, setUser }}>
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