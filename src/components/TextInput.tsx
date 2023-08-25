import React from 'react'
type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    type?: 'text' | 'password' | 'number' | 'email';
    label?: string;
    className?: string;
};



function TextInput({label, ...rest}: TextInputProps) {
  return (
    <>
        {label && 
        <label 
            className='block'
            htmlFor={rest.name}
            >{label}</label>}
        <input className='className="block w-full px-4 py-3 mt-2 text-gray-700 bg-transparent border border-gray-300 focus:border-primary focus:ring-secondary focus:ring-opacity-40 focus:outline-none focus:ring' {...rest}/>
    </>
  )
}

export default TextInput