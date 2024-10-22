'use client';

import { useState, type HTMLInputTypeAttribute } from 'react';
import { useAddDestinationContext  } from '@/context/addDestination';
import { type NewDestinationType, newDestinationSchema } from "@/schemas/destination";

interface InputProps {
  label: string;
  id: keyof NewDestinationType;
  description?: string;
  required?: boolean;
  pattern?: string;
  type: HTMLInputTypeAttribute;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  errorMsg?: string;
  disabled?: boolean;
  hidden?: boolean;
  readonly?: boolean;
  className?: string
}

const validateClientError = (id: keyof NewDestinationType, value: string) : string | null => {
  const {error} = newDestinationSchema.shape[id].safeParse(value)
  return error ? error.errors[0].message : null
}
export default function Input({
  label,
  id,
  required,
  pattern,
  type,
  minLength,
  maxLength,
  min,
  max,
  description,
  errorMsg,
  disabled = false,
  hidden = false,
  readonly = false,
  className
}: InputProps) {
  const { updateNewDestinationDetails, newDestinationData } = useAddDestinationContext();
  const [clientErr, setClientErr] = useState<string | null>(null);
  
  const handleInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {   
    updateNewDestinationDetails({[target.name]: target.value});
    if (clientErr) setClientErr(validateClientError(id, target.value));
  };

  const handleBlur = ({target}: React.FocusEvent<HTMLInputElement>) => {
    setClientErr(validateClientError(id, target.value));
  };

  return (
    <div hidden={hidden} className={className}>
      <label className="block text-lg" htmlFor={id}>
        {label}
        {description && (
          <span className="text-sm text-slate-200 block mb-1">
            {description}
          </span>
        )}
      </label>
      <input
        className={`w-full rounded-md py-4 px-2 text-slate-900 ${
          (errorMsg || clientErr) ? 'border-red-500' : 'border-slate-300'
        } border-2`}
        type={type}
        name={id}
        id={id}
        required={required}
        pattern={pattern}
        minLength={minLength}
        maxLength={maxLength}
        min={min}
        max={max}
        onChange={handleInputChange}
        onBlur={handleBlur}
        disabled={disabled}
        readOnly={readonly}
        value={newDestinationData[id]}
      />
      <div className="min-h-8 mt-1">
        {( clientErr || errorMsg) && (
          <span className="text-red-500 text-sm block ">{errorMsg || clientErr}</span>
        )}
      </div>
    </div>
  );
}
