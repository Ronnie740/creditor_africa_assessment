import { ShoppingBag, ChevronDown } from 'lucide-react';
import { useLanguage } from './LanguageProvider';

const Navbar = () => {
  const { locale, setLocale } = useLanguage();

  return (
    <nav className='flex items-center justify-between px-8 py-6 bg-white border-b border-gray-100'>
        <div className='text-2xl font-black tracking-tight'>dummy.</div>
        <div className='hidden md:flex space-x-12 text-gray-600 font-medium'>
            <a href='#' className='hover:text-black'>
                Home
            </a>
            <a href='#' className='hover:text-black'>
                Shop
            </a>
            <a href='#' className='hover:text-black'>
                Contact
            </a>
            <a href='#' className='hover:text-black'>
                Help
            </a>
        </div>
        <div className='flex items-center space-x-8'>
            <button 
                onClick={() => setLocale(locale === 'en' ? 'fr' : 'en')}
                className='flex items-center font-medium hover:text-gray-600 uppercase'
            >
                {locale} <ChevronDown className='ml-1 w-4 h-4' />
            </button>
            <button className='flex items-center font-medium hover:text-gray-600'>
                Account <ChevronDown className='ml-1 w-4 h-4' />
            </button>
            <button className='flex items-center font-medium hover:text-gray-600'>
                <ShoppingBag className='w-5 h-5 mr-2' /> 3 items
            </button>
        </div>
    </nav>
  );
};

export default Navbar;
