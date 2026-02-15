import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '../lib/utils';
import { useLanguage } from './LanguageProvider';

const StepIndicator = ({ step }: { step: 'account' | 'shipping' | 'payment' }) => {
    const { t } = useLanguage();
    
	return (
		<div className='flex items-center mb-8 text-lg font-medium select-none'>
			<span className='text-blue-600'>{t('stepAccount')}</span>

			<span className='h-[2px] w-6 bg-blue-300 mx-3'></span>
			<div className={cn('w-5 h-5 rounded-full flex items-center justify-center transition-colors duration-300', step !== 'account' ? 'bg-black text-white' : 'bg-gray-300')}>
				{step !== 'account' && <Check className='w-3 h-3' />}
			</div>
			<span className='h-[2px] w-6 bg-blue-300 mx-3'></span>

			<span className={cn(step !== 'account' ? 'text-blue-600' : 'text-gray-800')}>{t('stepShipping')}</span>

			<span className='h-[2px] w-6 bg-blue-300 mx-3'></span>
			<div className={cn('w-5 h-5 rounded-full flex items-center justify-center transition-colors duration-300', step === 'payment' ? 'bg-black text-white' : 'bg-gray-300')}>
				{step === 'payment' && <Check className='w-3 h-3' />}
			</div>
			<span className='h-[2px] w-6 bg-blue-300 mx-3'></span>

			<span className={cn(step === 'payment' ? 'text-blue-600' : 'text-gray-800')}>{t('stepPayment')}</span>
		</div>
	);
};

export default StepIndicator;
