'use client';

import { type InputHTMLAttributes, useState, forwardRef } from 'react';
import { useFormStatus } from 'react-dom';
import { type ZodSchema } from 'zod';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  errorMsg?: string;
  schema?: ZodSchema,
  onChangeValue?: (value: string) => void;
  isLoading?: boolean;
}
export default forwardRef<HTMLInputElement, InputProps>( function Input(inpProps, ref) {
  const { pending } = useFormStatus();
  const {
    label,
    id,
    description,
    errorMsg,
    hidden,
    className,
    onChangeValue,
    schema,
    readOnly,
    isLoading,
    ...props
  } = inpProps;
  const [clientErr, setClientErr] = useState<string | null>(null);
  
  const handleInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if (onChangeValue) onChangeValue(target.value);    
    if (clientErr) setClientErr(validateClientError(target.value));
  };

  const handleBlur = ({target}: React.FocusEvent<HTMLInputElement>) => {
    setClientErr(validateClientError(target.value));
  };

  const validateClientError = (value: string) : string | null => {
    if (schema) {
      const {error} = schema.safeParse(value)
      return error ? error.errors[0].message : null
    }
    return null
  }

  return (
    <div hidden={hidden} className={className}>
      {!!label &&
        <label className="block text-lg" htmlFor={id}>
          {label}
          {!!description && (
            <span className="text-sm text-slate-200 block mb-1">
              {description}
            </span>
          )}
        </label>
      }
      <input
        {...props}
        className={`w-full rounded-md py-4 px-2 text-slate-900 border-2
          ${(errorMsg || clientErr) ? 'border-red-500' : 'border-slate-300'} 
          ${isLoading ? 'bg-zinc-800 animate-pulse' : ''}
        `}
        onChange={handleInputChange}
        onBlur={handleBlur}
        readOnly={readOnly || pending || isLoading}
        id={id}
        ref={ref}
      />
      <div className="min-h-8 mt-1">
        {( clientErr || errorMsg) && (
          <span className="text-red-500 text-sm block ">{errorMsg || clientErr}</span>
        )}
      </div>
    </div>
  );
})
