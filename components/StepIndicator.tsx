/** @format */

import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '../lib/utils';
import { useLanguage } from './LanguageProvider';

const StepIndicator = ({ step }: { step: 'account' | 'shipping' | 'payment' }) => {
	const { t } = useLanguage();

	return (
		<div className='flex flex-col sm:flex-row items-center justify-center mb-10 text-sm sm:text-lg font-medium select-none space-y-2 sm:space-y-0'>
			<div className='flex flex-col sm:flex-row items-center sm:contents'>
				<span className='text-[#448cd2]'>{t('stepAccount')}</span>

				<div className='flex flex-col sm:flex-row items-center'>
					<span className='w-0.5 h-4 sm:h-0.5 sm:w-8 bg-blue-300 mx-2 sm:mx-4'></span>
					<div className={cn('w-5 h-5 rounded-full flex items-center justify-center transition-colors duration-300', step !== 'account' ? 'bg-black text-white' : 'bg-gray-300')}>
						{step !== 'account' && <Check className='w-3 h-3' />}
					</div>
					<span className='w-0.5 h-4 sm:h-0.5 sm:w-8 bg-blue-300 mx-2 sm:mx-4'></span>
				</div>
			</div>

			<div className='flex flex-col sm:flex-row items-center sm:contents'>
				<span className={cn(step !== 'account' ? 'text-[#448cd2]' : 'text-gray-800')}>{t('stepShipping')}</span>

				<div className='flex flex-col sm:flex-row items-center'>
					<span className='w-0.5 h-4 sm:h-0.5 sm:w-8 bg-blue-300 mx-2 sm:mx-4'></span>
					<div className={cn('w-5 h-5 rounded-full flex items-center justify-center transition-colors duration-300', step === 'payment' ? 'bg-black text-white' : 'bg-gray-300')}>
						{step === 'payment' && <Check className='w-3 h-3' />}
					</div>
					<span className='w-0.5 h-4 sm:h-0.5 sm:w-8 bg-blue-300 mx-2 sm:mx-4'></span>
				</div>
			</div>

			<span className={cn(step === 'payment' ? 'text-[#448cd2]' : 'text-gray-800')}>{t('stepPayment')}</span>
		</div>
	);
};

export default StepIndicator;
