import React from 'react';
import Image from "next/image";

interface MiniInputWithIconProps {
    placeholder?: string;
    imageSrc: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MiniInputWithIcon: React.FC<MiniInputWithIconProps> = ({ placeholder, imageSrc, value, onChange }) => {
    return (
        <div className={'relative'}>
            <input
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="rounded-[12px] w-[207px] h-[35px] bg-[#ffffff] shadow-smallInput text-[16px] leading-[20px] text-center font-montserrat font-regular placeholder-[#202020] placeholder:opacity-70"
            />
            {/* Using only 17x17px images */}
            <Image src={imageSrc} alt={''} width={30} height={30} className={'w-[17px] h-[17px] absolute top-[9px] left-[13px]'}/>
        </div>
    );
};

export default MiniInputWithIcon;