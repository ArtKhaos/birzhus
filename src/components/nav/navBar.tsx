'use client'
import React, { useEffect } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useProfile } from "@/context/profileContext";
import Link from "next/link";

const NavBar: React.FC = () => {
    const { user, setUser } = useProfile();
    const searchParams = useSearchParams();

    useEffect(() => {
        const fetchUserData = async (token: string) => {
            try {
                const response = await fetch(`/api/user?token=${token}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser({ telegram_id: data.telegram_id, username: data.username, imageUrl: data.image_url });
                    localStorage.setItem('authToken', token);
                } else {
                    console.error('Ошибка при получении данных пользователя');
                    localStorage.removeItem('authToken');
                }
            } catch (error) {
                console.error('Ошибка при получении данных пользователя:', error);
                localStorage.removeItem('authToken');
            }
        };

        const token = searchParams.get('token') || localStorage.getItem('authToken');
        if (token) {
            fetchUserData(token);
        }

        const ws = new WebSocket('ws://localhost:5001');

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if (message.type === 'AUTH_SUCCESS') {
                fetchUserData(message.token);
            }
        };

        return () => {
            ws.close();
        };
    }, [searchParams, setUser]);

    const handleLogin = async () => {
        try {
            const response = await fetch('/api/generate-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                const { token } = await response.json();
                window.open(`https://t.me/birzhusBot?start=${token}`, '_blank');
            }
        } catch (error) {
            console.error('Ошибка при генерации токена:', error);
        }
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('authToken');
    };

    return (
        <nav className="container mx-auto mt-[45px] flex justify-between items-center h-[50px]">
            <div className={'relative h-[50px] w-[220px]'}>
                <Image
                    src={'/logo.svg'}
                    className={'absolute top-[-16px] w-[220px]'}
                    alt={'Биржус'}
                    width={220}
                    height={84}
                />
            </div>
            {user ? (
                <div className="flex items-center gap-[25px]">
                    <p className={'font-montserrat text-[20px] leading-[24px] font-medium'}>История просмотров</p>
                    <Link href="/manageChannels">
                        <p className={'font-montserrat text-[20px] leading-[24px] font-medium'}>Управление каналами</p>
                    </Link>
                    <div className={'relative group w-[50px] h-[50px] rounded-full overflow-hidden'} onClick={handleLogout}>
                        <Image src={user.imageUrl} alt={user.username} width={50} height={50} className="w-[50px] h-[50px]"/>
                        <div className={'absolute inset-0 bg-[#000] opacity-0 group-hover:opacity-70 transition-opacity duration-300 flex items-center justify-center'}/>
                        <Image src={'./logoutIcon.svg'} alt={'выйти'} width={'29'} height={'28'}
                               className={'absolute opacity-0 group-hover:opacity-100 top-[11px] left-[8px] transition-opacity'}/>
                    </div>
                </div>
            ) : (
                <p className={'font-montserrat font-bold leading-[24px] text-[20px]'} onClick={handleLogin}>
                    Войдите через <span className={'text-secondary cursor-pointer'}>
                            Telegram
                </span>
                </p>
            )}
        </nav>
    );
};

export default NavBar;