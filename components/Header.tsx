'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MagnifyingGlassIcon, 
  ShoppingBagIcon, 
  Bars3Icon, 
  XMarkIcon,
  UserIcon,
  HeartIcon
} from '@heroicons/react/24/outline'
import { useCartStore } from '@/store/cart'
import Cart from './Cart'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { toggleCart, getTotalItems } = useCartStore()
  const totalItems = getTotalItems()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: 'Inicio', href: '/' },
    { name: 'Hombres', href: '/men' },
    { name: 'Mujeres', href: '/women' },
    { name: 'Niños', href: '/kids-boys' },
    { name: 'Niñas', href: '/kids-girls' },
    { name: 'Nuevos', href: '/new' },
    { name: 'Ofertas', href: '/sale' },
  ]

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled 
            ? 'glass-effect shadow-lg' 
            : 'bg-white/95 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-luxury-600 to-accent-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg font-display">M</span>
                </div>
                <span className="text-xl font-display font-bold text-gradient">
                  majoe
                </span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="text-dark-700 hover:text-luxury-600 font-medium transition-colors duration-300 relative group text-sm"
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-luxury-600 to-accent-600 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 text-gray-700 hover:text-primary-600 transition-colors duration-300"
              >
                <MagnifyingGlassIcon className="h-6 w-6" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 text-gray-700 hover:text-primary-600 transition-colors duration-300"
              >
                <UserIcon className="h-6 w-6" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 text-gray-700 hover:text-primary-600 transition-colors duration-300"
              >
                <HeartIcon className="h-6 w-6" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleCart}
                className="relative p-2 text-gray-700 hover:text-primary-600 transition-colors duration-300"
              >
                <ShoppingBagIcon className="h-6 w-6" />
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleCart}
                className="relative p-2 text-gray-700"
              >
                <ShoppingBagIcon className="h-6 w-6" />
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-700"
              >
                {isMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden glass-effect border-t border-white/20"
            >
              <div className="px-4 py-6 space-y-4">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-gray-700 hover:text-primary-600 font-medium py-2 transition-colors duration-300"
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                
                <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 text-gray-700 hover:text-primary-600 transition-colors duration-300"
                  >
                    <MagnifyingGlassIcon className="h-6 w-6" />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 text-gray-700 hover:text-primary-600 transition-colors duration-300"
                  >
                    <UserIcon className="h-6 w-6" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 text-gray-700 hover:text-primary-600 transition-colors duration-300"
                  >
                    <HeartIcon className="h-6 w-6" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <Cart />
    </>
  )
}

export default Header

