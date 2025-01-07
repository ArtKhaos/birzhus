import React from 'react';

interface StatusButtonProps {
    status: boolean;
    labelFalse: string;
    labelTrue: string;
    onClick: () => void;
}

const StatusButton: React.FC<StatusButtonProps> = ({ status, labelFalse, labelTrue, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`transition-all duration-300 ease-in-out rounded-[12px] w-[207px] h-[35px] font-semibold font-montserrat text-[16px]
        ${status ? 'bg-[#FF4D4D]' : 'bg-[#4CAF50]'}`}
            style={{
                color: '#FFF',
                boxShadow: status
                    ? '0 0 25px rgba(255, 77, 77, 0.42)'
                    : '0 0 25px rgba(76, 175, 80, 0.42)',
            }}
        >
            {status ? labelTrue : labelFalse}
        </button>
    );
};

export default StatusButton;