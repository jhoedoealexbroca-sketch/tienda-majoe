'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon 
} from '@heroicons/react/24/outline'

const Footer = () => {
  const footerSections = [
    {
      title: 'Tienda',
      links: [
        { name: 'Hombres', href: '/men' },
        { name: 'Mujeres', href: '/women' },
        { name: 'Nuevos Productos', href: '/new' },
        { name: 'Ofertas', href: '/sale' },
      ]
    },
    {
      title: 'Ayuda',
      links: [
        { name: 'Guía de Tallas', href: '/size-guide' },
        { name: 'Envíos y Devoluciones', href: '/shipping' },
        { name: 'Preguntas Frecuentes', href: '/faq' },
        { name: 'Contacto', href: '/contact' },
      ]
    },
    {
      title: 'Empresa',
      links: [
        { name: 'Sobre Nosotros', href: '/about' },
        { name: 'Sostenibilidad', href: '/sustainability' },
        { name: 'Careers', href: '/careers' },
        { name: 'Prensa', href: '/press' },
      ]
    }
  ]

  const socialLinks = [
    { name: 'Instagram', href: '#', icon: '📷' },
    { name: 'Facebook', href: '#', icon: '📘' },
    { name: 'Twitter', href: '#', icon: '🐦' },
    { name: 'TikTok', href: '#', icon: '🎵' },
  ]

  return (
    <footer className="bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h3 className="text-3xl font-display font-bold mb-4 text-gradient">
            Mantente al día con Majoe
          </h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Suscríbete a nuestro newsletter y recibe las últimas tendencias, ofertas exclusivas 
            y novedades directamente en tu correo.
          </p>
          
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="flex-1 px-6 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent backdrop-blur-sm"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary whitespace-nowrap"
            >
              Suscribirse
            </motion.button>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-luxury-600 to-accent-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl font-display">M</span>
              </div>
              <span className="text-2xl font-display font-bold text-gradient">
                majoe
              </span>
            </Link>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              Descubre la moda que define tu estilo. Calidad premium, 
              diseños únicos y la última tendencia en un solo lugar.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPinIcon className="h-5 w-5 text-primary-400" />
                <span>Madrid, España</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <PhoneIcon className="h-5 w-5 text-primary-400" />
                <span>+34 900 123 456</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <EnvelopeIcon className="h-5 w-5 text-primary-400" />
                <span>hola@majoe.com</span>
              </div>
            </div>
          </motion.div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h4 className="text-xl font-display font-semibold mb-6 text-white">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-primary-400 transition-colors duration-300 hover:translate-x-1 transform inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            
            {/* Copyright */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-gray-400 text-center lg:text-left"
            >
              © 2024 Majoe. Todos los derechos reservados. Hecho con ❤️ en España.
            </motion.p>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center space-x-4"
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center text-2xl transition-all duration-300 backdrop-blur-sm border border-white/10 hover:border-white/30"
                  title={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>

            {/* Legal Links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center space-x-6 text-sm"
            >
              <Link href="/privacy" className="text-gray-400 hover:text-luxury-400 transition-colors duration-300">
                Privacidad
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-luxury-400 transition-colors duration-300">
                Términos
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-luxury-400 transition-colors duration-300">
                Cookies
              </Link>
              <Link href="/admin" className="text-gray-500 hover:text-luxury-500 transition-colors duration-300 font-medium">
                Admin
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

