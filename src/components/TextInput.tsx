import { TextInputProps } from '@/types';
import React, { ChangeEventHandler } from 'react'



export default function TextInput({ containerClassName, label, required, disabled, className, placeholder, type, min, minLength, max, value, defaultValue, name, id, onChange }: TextInputProps) {
  containerClassName = containerClassName || '';
  disabled = disabled || false;
  id = id || '';
  min = min || '';
  minLength = minLength || undefined;
  max = max || '';
  name = name || '';
  // required = required || true;
  type = type || undefined;
  return (
    <div className={`${containerClassName} flex flex-col gap-1`}>
      {
        required === true ?
          <>
            <label htmlFor={id} className="text-gray-500 text-sm">{label}<span className='text-red-500 text-xs -translate-y-2'>*</span> </label>
            <input type={type} defaultValue={defaultValue} value={value} disabled={disabled} required={required} id={id} name={name} placeholder={placeholder} min={min} max={max} minLength={minLength} onChange={onChange} className={`outline-none py-2 px-4 border border-gray-300 rounded-md text-gray-600 text-sm placeholder-opacity-70 ${disabled ? 'cursor-no-drop bg-slate-200 focus-within:bg-slate-200 focus:bg-slate-200' : 'bg-transparent focus-within:bg-transparent focus:bg-transparent'} ${className}`} />
          </>
          :
          <>
            <label htmlFor={id} className="text-gray-500 text-sm">{label}</label>
            <input type={type} defaultValue={defaultValue} value={value} disabled={disabled} id={id} name={name} placeholder={placeholder} min={min} max={max} minLength={minLength} onChange={onChange} className={`outline-none py-2 px-4 border border-gray-300 rounded-md text-gray-600 text-sm placeholder-opacity-70 ${disabled ? 'cursor-no-drop bg-slate-200 focus-within:bg-slate-200 focus:bg-slate-200' : 'bg-transparent focus-within:bg-transparent focus:bg-transparent'} ${className}`} />
          </>
      }
    </div>
  )
}
