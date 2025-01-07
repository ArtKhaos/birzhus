'use client'
import React, { useState, useEffect } from 'react';
import { useProfile } from "@/context/profileContext";
import ManageChannelLi from "@/components/manageChannelLI/manageChannelLi";

const ManageChannels: React.FC = () => {
    const { user } = useProfile();
    const [channels, setChannels] = useState<channel[]>([]);

    useEffect(() => {
        const fetchUserChannels = async () => {
            if (user?.telegram_id) {
                try {
                    const response = await fetch(`/api/user-channels?telegramId=${user.telegram_id}`);
                    if (response.ok) {
                        const data: channel[] = await response.json();
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

    const handleUpdateChannel = (updatedChannel: channel) => {
        setChannels(prevChannels =>
            prevChannels.map(channel =>
                channel.channel_id === updatedChannel.channel_id ? updatedChannel : channel
            )
        );
    };

    return (
        <div className="container mx-auto">
            <h1 className="font-montserrat font-bold text-[32px] leading-[39px] text-center mb-[25px] mt-[25px]">
                Управление каналами
            </h1>
            {channels.length > 0 ? (
                <ul>
                    {channels.map((channel) => (
                        <ManageChannelLi
                            key={channel.channel_id}
                            channel={channel}
                            onUpdateChannel={handleUpdateChannel}
                        />
                    ))}
                </ul>
            ) : (
                <p>У вас нет каналов для управления.</p>
            )}
        </div>
    );
};

export default ManageChannels;