import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';
import { CheckoutFormData } from '../lib/schema';

interface SelectOption {
    label: string;
    value: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
	label?: string;
	name: keyof CheckoutFormData;
	options: (string | SelectOption)[];
	register: UseFormRegister<CheckoutFormData>;
	wrapperClassName?: string;
}

const Select = ({ label, name, options, register, className, wrapperClassName, ...props }: SelectProps) => (
	<div className={cn('flex flex-col space-y-2', wrapperClassName)}>
		{label && <label className='text-sm text-gray-500 font-medium'>{label}</label>}
		<div className='relative'>
			<select
				{...register(name)}
				{...props}
				className={cn(
					'w-full bg-gray-200/70 border-2 border-transparent rounded-md px-4 py-3 text-gray-900 appearance-none focus:border-primary focus:outline-none cursor-pointer',
					className,
				)}>
				{options.map((opt) => {
                    const value = typeof opt === 'string' ? opt : opt.value;
                    const label = typeof opt === 'string' ? opt : opt.label;
                    return (
                        <option key={value} value={value}>
                            {label}
                        </option>
                    );
                })}
			</select>
			<ChevronDown className='absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-800 pointer-events-none' />
		</div>
	</div>
);

export default Select;