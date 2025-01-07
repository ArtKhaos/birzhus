import React, { useState } from 'react';
import Link from "next/link";
import MiniInputWithIcon from "@/components/inputs/miniInputWithIcon";
import StatusButton from "@/components/statusButton/statusButton";

interface ChannelProps {
    channel: channel;
    onUpdateChannel: (updatedChannel: channel) => void;
}

const ManageChannelLi: React.FC<ChannelProps> = ({ channel, onUpdateChannel }) => {
    const [status, setStatus] = useState(channel.status);
    const [price, setPrice] = useState(channel.price || '');
    const [placementType, setPlacementType] = useState(channel.placementType || '');

    const toggleStatus = () => {
        setStatus(!status);
    };

    return (
        <li key={channel.channel_id}>
            <div className="p-2 mb-0 rounded-t-[24px] h-[94px] border-strokeColor border-[3px] border-c bg-grey px-[30px] flex flex-row items-center gap-[25px] py-[25px] justify-between">
                <div className={'flex items-center gap-[15px]'}>
                    <img src={channel.image_url} alt={channel.title} width={100} className="rounded-full h-[50px] w-[50px]" />
                    <Link href={channel.link} className={'font-montserrat font-medium text-[20px] leading-[24px]'}>
                        {channel.title}
                    </Link>
                </div>
                <div className={'flex gap-[50px]'}>
                    <div className={'flex flex-row items-center gap-[15px]'}>
                        <p className={'text-[16px] leading-[20px] font-montserrat font-semibold'}>Цена:</p>
                        <MiniInputWithIcon
                            placeholder={'1000 - 5000'}
                            imageSrc={'./icons/input/ruble.svg'}
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <div className={'flex flex-row items-center gap-[15px]'}>
                        <p className={'text-[16px] leading-[20px] font-montserrat font-semibold'}>Тип размещения:</p>
                        <MiniInputWithIcon
                            placeholder={'1 / 24'}
                            imageSrc={'./icons/input/time.svg'}
                            value={placementType}
                            onChange={(e) => setPlacementType(e.target.value)}
                        />
                    </div>
                </div>
                <button
                    className={'rounded-[12px] w-[207px] h-[35px] bg-[#1b92d1] text-[#FFF] font-semibold font-montserrat text-[16px]'}
                    style={{boxShadow: '0 0 25px 0 rgba(27, 146, 209, 0.42)'}}
                    onClick={() => onUpdateChannel({ ...channel, status, price, placementType })}
                >
                    Сохранить
                </button>
            </div>
            <div className="p-2 mb-2 rounded-b-[24px] h-[65px] border-strokeColor border-[3px] border-c bg-grey px-[30px] flex flex-row items-center justify-center gap-[25px] py-[25px]">
                <div className={'flex flex-row items-center gap-[15px]'}>
                    <p className={'text-[16px] leading-[20px] font-montserrat font-semibold'}>Статус:</p>
                    <StatusButton
                        status={status}
                        labelFalse={'Активен'}
                        labelTrue={'Остановлен'}
                        onClick={toggleStatus}
                    />
                </div>
            </div>
        </li>
    );
};

export default ManageChannelLi;