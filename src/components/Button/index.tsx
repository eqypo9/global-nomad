import React, { DetailedHTMLProps, ButtonHTMLAttributes } from 'react';
import Link from 'next/link';

interface Props extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  text: string;
  color: 'black' | 'white';
  cssName?: string;
  link?: string;
}

function Button({ text, color, onClick, cssName, link, type, disabled, ...props }: Props) {
  const enabledBackgroundColor = color === 'black' ? 'bg-[#000000]' : 'bg-[#ffffff]';
  const enabledBorderColor = color === 'white' ? 'border-[#000000]' : 'border-[#ffffff]';
  const enabledTextColor = color === 'black' ? 'text-white' : 'text-[#000000]';

  const backgroundColor = disabled ? 'bg-gray-300' : enabledBackgroundColor;
  const borderColor = disabled ? 'bg-gray-300' : enabledBorderColor;
  const textColor = disabled ? 'text-white' : enabledTextColor;

  const buttonStyle = `flex justify-center items-center px-5 py-3 font-bold border border-1 border-solid ${borderColor} ${backgroundColor} ${textColor} rounded-md disabled:cursor-not-allowed ${cssName}`;

  return link && !disabled ? (
    <Link href={link} className={buttonStyle}>
      {text}
    </Link>
  ) : (
    <button type={type === 'submit' ? 'submit' : 'button'} className={buttonStyle} onClick={onClick} disabled={disabled} {...props}>
      {text}
    </button>
  );
}

Button.defaultProps = {
  cssName: '',
  link: '',
};

export default Button;
