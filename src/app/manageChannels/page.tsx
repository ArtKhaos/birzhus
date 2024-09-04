'use client'
import React, { useState, useEffect } from 'react';
import { useProfile } from "@/context/profileContext";

interface Channel {
    channel_id: string;
    title: string;
    image_url: string;
    username: string;
}

const ManageChannels: React.FC = () => {
    const { user } = useProfile();
    const [channels, setChannels] = useState<Channel[]>([]);

    useEffect(() => {
        const fetchUserChannels = async () => {
            if (user?.telegram_id) {
                try {
                    const response = await fetch(`/api/user-channels?telegramId=${user.telegram_id}`);
                    if (response.ok) {
                        const data: Channel[] = await response.json();
                        setChannels(data);
                    } else {
                        console.error('Ошибка при получении каналов пользователя');
                    }
                } catch (error) {
                    console.error('Ошибка:', error);
                }
            }
        };

        fetchUserChannels();
    }, [user?.telegram_id]);

    return (
        <div className="container mx-auto">
            <h1>Управление каналами</h1>
            {channels.length > 0 ? (
                <ul>
                    {channels.map((channel) => (
                        <li key={channel.channel_id} className="border p-2 mb-2">
                            <h2>{channel.title}</h2>
                            <img src={channel.image_url} alt={channel.title} width={100} />
                            <p>Юзернейм: {channel.username}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>У вас нет каналов для управления.</p>
            )}
        </div>
    );
};

export default ManageChannels;