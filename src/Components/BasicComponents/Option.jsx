import React from 'react';

const PromptOption = ({ title, description, selected, onClick }) => {
    return (
        <div
            onClick={onClick}
            style={{
                width: '100%',
                height: 'auto',
                padding: 10,
                borderRadius: 8,
                border: `1.6px solid ${selected ? '#5670F1' : '#EAEEFD'}`, // 선택되었으면 테두리 색상이 파란색
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                gap: 16,
                display: 'inline-flex',
                cursor: 'pointer' // 클릭 가능하게 처리
            }}
        >
            {/* Title */}
            <div
                style={{
                    color: 'black',
                    fontSize: '16px',
                    fontFamily: 'Questrial',
                    fontWeight: '400',
                    lineHeight: '24px',
                    wordWrap: 'break-word'
                }}
            >
                {title}
            </div>

            {/* Description Box */}
            <div
                style={{
                    paddingLeft: 8,
                    paddingRight: 8,
                    background: '#EAEEFD',
                    borderRadius: 4,
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 10,
                    display: 'inline-flex'
                }}
            >
                <div
                    style={{
                        color: '#5670F1',
                        fontSize: '10px',
                        fontFamily: 'Pretendard',
                        fontWeight: '500',
                        lineHeight: '18px',
                        wordWrap: 'break-word'
                    }}
                >
                    {description}
                </div>
            </div>
        </div>
    );
};

export default PromptOption;
