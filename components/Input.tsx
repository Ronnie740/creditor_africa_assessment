import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { Check } from 'lucide-react';
import { cn } from '../lib/utils';
import { CheckoutFormData } from '../lib/schema';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	name: keyof CheckoutFormData;
	register: UseFormRegister<CheckoutFormData>;
	error?: string;
	wrapperClassName?: string;
	showCheckIfValid?: boolean;
}

const Input = ({ label, name, register, error, className, wrapperClassName, showCheckIfValid = false, ...props }: InputProps) => (
	<div className={cn('flex flex-col space-y-2', wrapperClassName)}>
		{label && <label className='text-sm text-gray-500 font-medium'>{label}</label>}
		<div className='relative'>
			<input
				{...register(name)}
				{...props}
				className={cn(
					'w-full bg-gray-200/70 border-2 border-transparent rounded-md px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none transition-all',
					error ? 'border-red-400 bg-red-50' : 'focus:border-primary',
					className,
				)}
			/>
			{/* Show Check if valid and no error */}
			{showCheckIfValid && !error && (
				<div className='absolute right-3 top-1/2 -translate-y-1/2 bg-black rounded-full p-0.5 animate-in fade-in zoom-in duration-200'>
					<Check className='w-3 h-3 text-white' />
				</div>
			)}
		</div>
		{error && <span className='text-xs text-red-500 font-medium'>{error}</span>}
	</div>
);

export default Input;
