import { ChangeEvent, FC } from "react";

interface FormInputProps {
  type: string;
  name: string;
  placeholder?: string;
  pattern?: string;
  maxLength?: number;
  required?: boolean;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  defaultValue?: string | number | undefined;
  checked?: boolean;
  disabled?: boolean;
}

const FormInput: FC<FormInputProps> = ({
  type,
  name,
  required,
  pattern,
  maxLength,
  placeholder,
  value,
  className,
  onChange,
  defaultValue,
  checked,
  disabled,
}) => {
  return (
    <input
      className={`rounded-full border border-stone-200 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-400 md:px-6 md:py-3 ${className}`}
      type={type}
      name={name}
      placeholder={placeholder}
      maxLength={maxLength}
      pattern={pattern}
      required={required}
      value={value}
      onChange={onChange}
      defaultValue={defaultValue}
      checked={checked}
      disabled={disabled}
    />
  );
};

export default FormInput;
