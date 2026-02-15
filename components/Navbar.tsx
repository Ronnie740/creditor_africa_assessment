'use client';

import React, { useState } from 'react';
import { ShoppingBag, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from './LanguageProvider';
import { useCart } from './CartProvider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { locale, setLocale, t } = useLanguage();
  const { data } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat(locale === 'en' ? 'en-GB' : 'fr-FR', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const totalItems = data?.items.reduce((acc, item) => acc + item.quantity, 0) || 0;

  return (
    <nav className='flex items-center justify-between px-8 py-6 bg-white border-b border-gray-100'>
        <div className='text-2xl font-black tracking-tight'>dummy.</div>
        <div className='hidden md:flex space-x-12 text-gray-600 font-medium'>
            <a href='#' className='hover:text-black'>Home</a>
            <a href='#' className='hover:text-black'>Shop</a>
            <a href='#' className='hover:text-black'>Contact</a>
            <a href='#' className='hover:text-black'>Help</a>
        </div>
        <div className='flex items-center space-x-4 md:space-x-8'>
            {/* Shadcn Language Dropdown */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="uppercase font-medium">
                        {locale} <ChevronDown className='ml-1 w-4 h-4' />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setLocale('en')}>
                        English
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setLocale('fr')}>
                        Français
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" className='hidden sm:flex items-center font-medium'>
                Account <ChevronDown className='ml-1 w-4 h-4' />
            </Button>

            {/* Shadcn Cart Dialog */}
            <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
                <DialogTrigger asChild>
                    <Button variant="ghost" className='flex items-center font-medium'>
                        <ShoppingBag className='w-5 h-5 mr-2' /> 
                        {totalItems} {totalItems === 1 ? 'item' : 'items'}
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{t('orderSummary')}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        {data?.items.map((item) => (
                            <div key={item.id} className="flex items-center gap-4">
                                <div className="relative h-16 w-16 overflow-hidden rounded-md border">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium leading-none">{item.name}</p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {item.quantity} x {formatCurrency(item.price, data.currency)}
                                    </p>
                                </div>
                                <div className="text-sm font-semibold">
                                    {formatCurrency(item.price * item.quantity, data.currency)}
                                </div>
                            </div>
                        ))}
                    </div>
                    {data && (
                        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center font-bold">
                            <span>{t('total')}</span>
                            <span>{formatCurrency(data.total, data.currency)}</span>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    </nav>
  );
};

export default Navbar;