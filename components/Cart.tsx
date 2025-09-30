'use client'

import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useCartStore } from '@/store/cart'

const Cart = () => {
  const { items, isOpen, toggleCart, updateQuantity, removeItem, getTotalPrice } = useCartStore()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={toggleCart}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col bg-white shadow-xl">
                    
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-6 bg-gradient-to-r from-primary-50 to-accent-50 border-b border-gray-100">
                      <Dialog.Title className="text-2xl font-display font-bold text-gray-900">
                        Tu Carrito
                      </Dialog.Title>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        type="button"
                        className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-white/50 transition-all duration-300"
                        onClick={toggleCart}
                      >
                        <XMarkIcon className="h-6 w-6" />
                      </motion.button>
                    </div>

                    {items.length === 0 ? (
                      /* Empty Cart */
                      <div className="flex-1 flex flex-col items-center justify-center p-6">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="text-center"
                        >
                          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-4xl">🛍️</span>
                          </div>
                          <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">
                            Tu carrito está vacío
                          </h3>
                          <p className="text-gray-500 mb-6">
                            Agrega algunos productos increíbles a tu carrito
                          </p>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={toggleCart}
                            className="btn-primary"
                          >
                            Seguir Comprando
                          </motion.button>
                        </motion.div>
                      </div>
                    ) : (
                      <>
                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto px-6 py-6">
                          <AnimatePresence>
                            {items.map((item) => (
                              <motion.div
                                key={`${item.product.id}-${item.size}-${item.color}`}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="flex items-center space-x-4 py-6 border-b border-gray-100 last:border-b-0"
                              >
                                <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-100">
                                  <Image
                                    src={item.product.images[0]}
                                    alt={item.product.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>

                                <div className="flex-1 min-w-0">
                                  <h4 className="font-semibold text-gray-900 truncate">
                                    {item.product.name}
                                  </h4>
                                  <div className="flex items-center space-x-2 mt-1 text-sm text-gray-500">
                                    <span>Talla: {item.size.toUpperCase()}</span>
                                    <span>•</span>
                                    <div className="flex items-center space-x-1">
                                      <span>Color:</span>
                                      <div 
                                        className="w-4 h-4 rounded-full border border-gray-300"
                                        style={{ backgroundColor: item.color }}
                                      />
                                    </div>
                                  </div>
                                  <p className="font-semibold text-primary-600 mt-1">
                                    {formatPrice(item.product.price)}
                                  </p>
                                </div>

                                <div className="flex flex-col items-end space-y-2">
                                  <div className="flex items-center space-x-2">
                                    <motion.button
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      onClick={() => updateQuantity(
                                        item.product.id, 
                                        item.size, 
                                        item.color, 
                                        item.quantity - 1
                                      )}
                                      className="p-1 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 transition-all duration-300"
                                    >
                                      <MinusIcon className="h-4 w-4" />
                                    </motion.button>
                                    
                                    <span className="w-8 text-center font-semibold">
                                      {item.quantity}
                                    </span>
                                    
                                    <motion.button
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      onClick={() => updateQuantity(
                                        item.product.id, 
                                        item.size, 
                                        item.color, 
                                        item.quantity + 1
                                      )}
                                      className="p-1 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 transition-all duration-300"
                                    >
                                      <PlusIcon className="h-4 w-4" />
                                    </motion.button>
                                  </div>

                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => removeItem(item.product.id, item.size, item.color)}
                                    className="text-xs text-red-500 hover:text-red-700 transition-colors duration-300"
                                  >
                                    Eliminar
                                  </motion.button>
                                </div>
                              </motion.div>
                            ))}
                          </AnimatePresence>
                        </div>

                        {/* Footer */}
                        <div className="border-t border-gray-100 p-6 bg-gray-50">
                          <div className="flex justify-between items-center mb-6">
                            <span className="text-lg font-display font-semibold text-gray-900">
                              Total
                            </span>
                            <span className="text-2xl font-display font-bold text-primary-600">
                              {formatPrice(getTotalPrice())}
                            </span>
                          </div>

                          <div className="space-y-3">
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="w-full btn-primary"
                            >
                              Proceder al Pago
                            </motion.button>
                            
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={toggleCart}
                              className="w-full btn-secondary"
                            >
                              Seguir Comprando
                            </motion.button>
                          </div>

                          <p className="text-xs text-gray-500 text-center mt-4">
                            Envío gratuito en pedidos superiores a 50€
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default Cart

