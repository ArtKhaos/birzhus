import React from 'react';
import Image from 'next/image';

type SmallInputWithIconProps = {
    iconSrc: string;
    placeholder: string;
    setText: (event: React.ChangeEvent<HTMLInputElement>) => void;
    text: string;
}

const SmallInputWithIcon: React.FC<SmallInputWithIconProps> = (props) => {
    return (
        <div className={'relative w-min h-min'}>
            <Image src={props.iconSrc} alt="icon" width={24} height={24} />
            <input
                value={props.text}
                onChange={props.setText}
                type="text"
                className={'bg-white'}
                placeholder={props.placeholder}
            />
        </div>
    );
};

export default SmallInputWithIcon;