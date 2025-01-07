'use client'
import React from 'react';
import Image from 'next/image';
import { useProfile } from "@/context/profileContext";
import Link from "next/link";

const NavBar: React.FC = () => {
    const { user } = useProfile();

    return (
        <nav className="container mx-auto mt-[45px] flex justify-between items-center h-[50px]">
            <div className={'relative h-[50px] w-[220px]'}>
                <Link href={'/'}>
                    <Image src={'/logo.svg'} className={'absolute top-[-16px] w-[220px]'} alt={'Биржус'} width={220} height={84} priority />
                </Link>
            </div>
            {user ? (
                <div className="flex items-center gap-[25px]">
                    <p className={'font-montserrat text-[20px] leading-[24px] font-medium'}>История просмотров</p>
                    <Link href="/manageChannels">
                        <p className={'font-montserrat text-[20px] leading-[24px] font-medium'}>Управление каналами</p>
                    </Link>
                    <div className={'relative group w-[50px] h-[50px] rounded-full overflow-hidden'}>
                        <Image src={user.imageUrl} alt={user.username} width={50} height={50} className="w-[50px] h-[50px]"/>
                    </div>
                </div>
            ) : (
                <p className={'font-montserrat font-bold leading-[24px] text-[20px]'}>
                    Загрузка...
                </p>
            )}
        </nav>
    );
};

export default NavBar;
