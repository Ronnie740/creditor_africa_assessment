/** @format */

'use client';

import React, { useState } from 'react';
import { ChevronDown, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import { checkoutSchema, CheckoutFormData } from '../lib/schema';
import Navbar from './Navbar';
import Input from './Input';
import Select from './Select';
import StepIndicator from './StepIndicator';
import OrderSummary from './OrderSummary';
import { useLanguage } from './LanguageProvider';

export default function Account() {
	const [step, setStep] = useState<'account' | 'shipping' | 'payment'>('account');
	const [isLoading, setIsLoading] = useState(false);
	const { t } = useLanguage();
	const router = useRouter();

	const {
		register,
		trigger,
		watch,
		formState: { errors },
	} = useForm<CheckoutFormData>({
		resolver: zodResolver(checkoutSchema),
		mode: 'onChange', // Validate on change so checkmarks appear dynamically
		defaultValues: {
			email: 'johndoe@tesemail.com',
			password: '********',
			addressLine1: '123',
			streetName: 'Electric avenue',
			postcode: 'ABC - 123',
			shippingMethod: 'Free delivery',
			cardName: 'John Smith',
			cardNumber: '1234-4567',
			expMonth: '03',
			expYear: '24',
			cvc: '123',
		},
	});

	// Watch values to control the "Check" icon visibility
	const values = watch();

	const handleCancel = () => {
		if (confirm('Are you sure you want to cancel the order?')) {
			router.push('/');
		}
	};

	const handleNextStep = async (targetStep: 'shipping' | 'payment' | 'complete') => {
		let isValid = false;
		setIsLoading(true);

		try {
			if (step === 'account') {
				isValid = await trigger(['email', 'password']);
				if (isValid) {
					const res = await fetch('/api/checkout/account', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ email: values.email, password: values.password }),
					});
					if (!res.ok) throw new Error('Account validation failed');
					setStep('shipping');
				}
			} else if (step === 'shipping') {
				isValid = await trigger(['addressLine1', 'streetName', 'postcode', 'shippingMethod']);
				if (isValid) {
					const res = await fetch('/api/checkout/shipping', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							addressLine1: values.addressLine1,
							streetName: values.streetName,
							postcode: values.postcode,
							shippingMethod: values.shippingMethod,
						}),
					});
					if (!res.ok) throw new Error('Shipping validation failed');
					setStep('payment');
				}
			} else if (step === 'payment') {
				isValid = await trigger(['cardName', 'cardNumber', 'expMonth', 'expYear', 'cvc']);
				if (isValid && targetStep === 'complete') {
					const res = await fetch('/api/checkout/payment', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							cardName: values.cardName,
							cardNumber: values.cardNumber,
							expMonth: values.expMonth,
							expYear: values.expYear,
							cvc: values.cvc,
						}),
					});

					if (!res.ok) throw new Error('Payment validation failed');

					// Final complete call
					const completeRes = await fetch('/api/checkout/complete', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ ...values }),
					});
					if (!completeRes.ok) throw new Error('Order completion failed');

					toast.success('Order placed successfully!');
					setTimeout(() => {
						router.push('/');
					}, 2000);
				}
			}
		} catch (error) {
			console.error(error);
			toast.error('An error occurred. Please try again.');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='min-h-screen bg-white font-sans text-slate-900'>
			<Toaster position='top-center' />
			<Navbar />

			<div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-80px)]'>
				{/* Left Column: Forms */}
				<div className='lg:col-span-7 p-8 lg:p-16 bg-gray-50 rounded-md m-10'>
					<div className='max-w-xl mx-auto'>
						<StepIndicator step={step} />

						<form onSubmit={(e) => e.preventDefault()}>
							{/* --- Account Step --- */}
							{step === 'account' && (
								<div className='animate-in fade-in slide-in-from-right-4 duration-300'>
									<h2 className='text-xl font-semibold mb-6'>{t('accountDetails')}</h2>

									<div className='space-y-6'>
										<Input
											label={t('emailAddress')}
											name='email'
											register={register}
											error={errors.email?.message ? t('errorEmail') : undefined}
											showCheckIfValid={!!values.email && !errors.email}
										/>
										<Input
											label={t('password')}
											type='password'
											name='password'
											placeholder={t('password')}
											register={register}
											error={errors.password?.message ? t('errorPassword') : undefined}
											showCheckIfValid={!!values.password && !errors.password}
										/>

										<div className='flex items-center justify-between pt-4'>
											<span className='text-gray-800 font-medium cursor-pointer hover:underline'>{t('registerAccount')}</span>
											<button
												type='button'
												className='bg-[#448cd2] hover:bg-[#2a7dd0] cursor-pointer text-white px-10 py-3 rounded-lg font-medium transition-colors shadow-sm hover:shadow-md flex items-center justify-center min-w-[120px]'
												onClick={() => handleNextStep('shipping')}
												disabled={isLoading}>
												{isLoading ? <Loader2 className='animate-spin' /> : t('login')}
											</button>
										</div>
									</div>

									<div className='border-t border-gray-200 mt-24 pt-8 flex items-center justify-end gap-6'>
										<button type='button' onClick={handleCancel} className='text-gray-600 hover:text-black font-medium transition-colors'>
											{t('cancelOrder')}
										</button>
										<button
											type='button'
											onClick={() => handleNextStep('shipping')}
											className='bg-[#448cd2] hover:bg-[#2a7dd0] cursor-pointer text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-sm hover:shadow-md flex items-center justify-center min-w-[160px]'
											disabled={isLoading}>
											{isLoading ? <Loader2 className='animate-spin' /> : t('shippingDetails')}
										</button>
									</div>
								</div>
							)}

							{/* --- Shipping Step --- */}
							{step === 'shipping' && (
								<div className='animate-in fade-in slide-in-from-right-4 duration-300'>
									<h2 className='text-xl font-semibold mb-6'>{t('shippingDetails')}</h2>

									<div className='space-y-6'>
										{/* Visual only select */}
										<div className='flex flex-col space-y-2'>
											<label className='text-sm text-gray-500 font-medium'>{t('useSavedAddress')}</label>
											<div className='relative'>
												<select className='w-full bg-gray-200/70 border-none rounded-md px-4 py-3 text-gray-900 appearance-none focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer'>
													<option>123 , Electric avenue</option>
												</select>
												<ChevronDown className='absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-800 pointer-events-none' />
											</div>
										</div>

										<Input
											label={t('firstLineAddress')}
											name='addressLine1'
											register={register}
											error={errors.addressLine1?.message ? t('errorRequired') : undefined}
											showCheckIfValid={!!values.addressLine1 && !errors.addressLine1}
										/>

										<Input
											label={t('streetName')}
											name='streetName'
											register={register}
											error={errors.streetName?.message ? t('errorRequired') : undefined}
											showCheckIfValid={!!values.streetName && !errors.streetName}
										/>

										<div className='grid grid-cols-2 gap-6'>
											<Input label={t('postcode')} name='postcode' register={register} error={errors.postcode?.message ? t('errorRequired') : undefined} />
											<Select
												label={t('selectShipping')}
												name='shippingMethod'
												register={register}
												options={[
													{ value: 'Free delivery', label: t('freeDelivery') },
													{ value: 'Express (£5.00)', label: t('expressDelivery') },
												]}
											/>
										</div>
									</div>

									<div className='mt-24 pt-8 flex items-center justify-end gap-6'>
										<button type='button' onClick={handleCancel} className='text-gray-600 hover:text-black font-medium transition-colors'>
											{t('cancelOrder')}
										</button>
										<button
											type='button'
											onClick={() => handleNextStep('payment')}
											className='bg-[#448cd2] hover:bg-[#2a7dd0] cursor-pointer text-white px-12 py-3 rounded-lg font-medium transition-colors shadow-sm hover:shadow-md flex items-center justify-center min-w-[140px]'
											disabled={isLoading}>
											{isLoading ? <Loader2 className='animate-spin' /> : t('paymentDetails')}
										</button>
									</div>
								</div>
							)}

							{/* --- Payment Step --- */}
							{step === 'payment' && (
								<div className='animate-in fade-in slide-in-from-right-4 duration-300'>
									<h2 className='text-xl font-semibold mb-6'>{t('paymentDetails')}</h2>

									<div className='space-y-6'>
										<div className='flex flex-col space-y-2'>
											<label className='text-sm text-gray-500 font-medium'>{t('useSavedCard')}</label>
											<div className='relative'>
												<select className='w-full bg-gray-200/70 border-none rounded-md px-4 py-3 text-gray-900 appearance-none focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer'>
													<option>Mastercard ending 234</option>
												</select>
												<ChevronDown className='absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-800 pointer-events-none' />
											</div>
										</div>

										<Input
											label={t('nameOnCard')}
											name='cardName'
											register={register}
											error={errors.cardName?.message ? t('errorRequired') : undefined}
											showCheckIfValid={!!values.cardName && !errors.cardName}
										/>

										<Input
											label={t('cardNumber')}
											name='cardNumber'
											placeholder='XXXX-XXXX'
											register={register}
											error={errors.cardNumber?.message ? t('errorRequired') : undefined}
										/>

										<div className='grid grid-cols-2 gap-6'>
											<div className='flex gap-2'>
												<Input
													label={t('expiration')}
													name='expMonth'
													placeholder='MM'
													register={register}
													error={errors.expMonth?.message ? t('errorRequired') : undefined}
													wrapperClassName='w-1/2'
													className='text-center'
												/>
												<span className='self-end pb-5 text-2xl text-gray-400'>/</span>
												<Input
													label='&nbsp;'
													name='expYear'
													placeholder='YY'
													register={register}
													error={errors.expYear?.message ? t('errorRequired') : undefined}
													wrapperClassName='w-1/2'
													className='text-center'
												/>
											</div>
											<Input label={t('cvc')} name='cvc' register={register} error={errors.cvc?.message ? t('errorRequired') : undefined} />
										</div>
									</div>

									<div className='mt-20 pt-8 flex items-center justify-end gap-6'>
										<button type='button' onClick={handleCancel} className='text-gray-600 hover:text-black font-medium transition-colors'>
											{t('cancelOrder')}
										</button>
										<button
											type='button'
											onClick={() => handleNextStep('complete')}
											className='bg-[#448cd2] hover:bg-[#2a7dd0] cursor-pointer text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-sm hover:shadow-md flex items-center justify-center min-w-[160px]'
											disabled={isLoading}>
											{isLoading ? <Loader2 className='animate-spin' /> : t('completeOrder')}
										</button>
									</div>
								</div>
							)}
						</form>
					</div>
				</div>

				{/* Right Column: Order Summary */}
				<div className='lg:col-span-5 bg-gray-50 m-10 rounded-md'>
					<OrderSummary />
				</div>
			</div>
		</div>
	);
}
