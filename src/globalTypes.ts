// globalTypes.ts

type channel = {
    channel_id: string;
    title: string;
    image_url: string;
    link: string;
    status: boolean;
    price?: string;  // Добавлено поле для цены
    placementType?: string;  // Добавлено поле для типа размещения
    subscribers?: number;  // Добавлено поле для количества подписчиков
    username?: string;  // Добавлено поле для имени пользователя канала
};

interface StatusButtonProps {
    status: boolean;
    setStatus: (status: boolean) => void;
    labelTrue: string;
    labelFalse: string;
    onClick?: () => void;  // Добавлен необязательный обработчик клика
}

interface User {
    telegram_id: string;
    username: string;
    imageUrl: string;
    token?: string;  // Добавлено поле для токена авторизации
}

interface MiniInputWithIconProps {
    placeholder?: string;
    imageSrc: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// Добавим интерфейс для props компонента ManageChannelLi
interface ManageChannelLiProps {
    channel: channel;
    onUpdateChannel: (updatedChannel: channel) => void;
}

// Добавим тип для контекста профиля
interface ProfileContextType {
    user: User | null;
    setUser: (user: User | null) => void;
}