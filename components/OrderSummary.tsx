/** @format */
'use client';

import React from 'react';
import { Minus, Plus } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from './LanguageProvider';
import { useCart } from './CartProvider';
import { Button } from '@/components/ui/button';

const OrderSummary = () => {
	const { t, locale } = useLanguage();
	const { data, loading, updateQuantity } = useCart();

	const formatCurrency = (amount: number, currency: string) => {
		return new Intl.NumberFormat(locale === 'en' ? 'en-GB' : 'fr-FR', {
			style: 'currency',
			currency: currency,
		}).format(amount);
	};

	if (loading) {
		return (
			<div className='p-8 h-full bg-gray-50/50 rounded-l-2xl border-l border-gray-100 animate-pulse'>
				<div className='h-8 bg-gray-200 rounded w-1/3 mb-6'></div>
				<div className='h-48 bg-gray-200 rounded mb-4'></div>
				<div className='space-y-4'>
					<div className='h-4 bg-gray-200 rounded w-full'></div>
					<div className='h-4 bg-gray-200 rounded w-full'></div>
				</div>
			</div>
		);
	}

	if (!data) return null;

	return (
		<div className='bg-gray-50/50 p-8 h-full rounded-l-2xl border-l border-gray-100'>
			<h2 className='text-xl font-medium mb-6'>{t('orderSummary')}</h2>

			{/* Product List */}
			<div className='mb-8 space-y-6'>
				{data.items.map((item) => (
					<div key={item.id}>
						<div className='w-full h-48 bg-gray-100 rounded-lg overflow-hidden mb-4 relative group'>
							<Image src={item.image} alt={item.name} fill className='object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500' />
						</div>
						<div className='flex justify-between items-start mb-2'>
							<div>
								<h3 className='text-lg font-medium'>{item.name}</h3>
								<p className='text-lg font-bold mt-1'>{formatCurrency(item.price, data.currency)}</p>
							</div>
							<div className='flex items-center rounded-md '>
								<Button
									variant='ghost'
									size='icon'
									className='h-8 w-8 rounded-md bg-[#e2e9f1] hover:bg-gray-300 hover:cursor-pointer'
									onClick={() => updateQuantity(item.id, -1)}
									disabled={item.quantity <= 1}>
									<Minus className='w-3 h-3 text-gray-600' />
								</Button>
								<span className='px-3 font-medium text-sm'>{item.quantity}</span>
								<Button variant='ghost' size='icon' className='h-8 w-8 hover:cursor-pointer rounded-md hover:bg-gray-300 bg-[#e2e9f1] ' onClick={() => updateQuantity(item.id, 1)}>
									<Plus className='w-3 h-3 text-gray-600' />
								</Button>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Discount (Static for now as per design) */}
			<div className='mb-8'>
				<label className='text-sm text-gray-500 block mb-2'>Gift Card / Discount code</label>
				<div className='flex gap-4'>
					<input className='flex-1 bg-[#e2e9f1] border border-gray-200 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all' />
					<button className=' hover:cursor-pointer text-[#448cd2] hover:bg-blue-100 border border-blue-200 shadow-none p-5 rounded-md '>Apply</button>
				</div>
			</div>

			{/* Totals */}
			<div className='space-y-4 text-gray-800'>
				<div className='flex justify-between'>
					<span>{t('subtotal')}</span>
					<span className='font-medium'>{formatCurrency(data.subtotal, data.currency)}</span>
				</div>
				<div className='flex justify-between'>
					<span>{t('tax')}</span>
					<span className='font-medium'>{formatCurrency(data.tax, data.currency)}</span>
				</div>
				<div className='flex justify-between text-teal-500'>
					<span className='text-gray-800'>{t('shipping')}</span>
					<span className='font-medium'>{data.shipping === 0 ? t('freeDelivery') : formatCurrency(data.shipping, data.currency)}</span>
				</div>
				<div className='flex justify-between text-xl font-bold pt-4 border-t border-gray-200'>
					<span>{t('total')}</span>
					<span>{formatCurrency(data.total, data.currency)}</span>
				</div>
			</div>
		</div>
	);
};

export default OrderSummary;
