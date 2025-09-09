import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Phone, Instagram, ShoppingCart } from 'lucide-react';

const backgroundImages = [
  "https://i.postimg.cc/nzsqsNq6/matealairelibree.jpg",
  "https://i.postimg.cc/6QPvNzFz/matetermo.jpg",
  "https://i.postimg.cc/Z579rVYZ/Matechicaguapa.jpg",
];

const logo = "https://i.postimg.cc/SNQGmWpG/fixed-20.png";
// ...existing code... (logoImages removed, using single `logo` image instead)

function App() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // logoIndex removed: footer uses static `logo` image
  // currentInstagramIndex removed (not used)
  const [activeCategory, setActiveCategory] = useState<'yerbas' | 'termos'>('yerbas');

  // About mini-section reveal on scroll
  const aboutRef = useRef<HTMLElement | null>(null);
  const [aboutVisible, setAboutVisible] = useState(false);
  const aboutText = `Life Mate transmite la idea de que el mate es más que una bebida: es un compañero de vida, una tradición que une a las personas. El mate, además, simboliza conexión, bienestar y compartir momentos. El nombre resalta cómo esta bebida puede acompañar a las personas en su día a día, siendo parte de su rutina y de sus relaciones personales.`;
  const [displayedText, setDisplayedText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);

  // Variantes de termo (imagen principal + alternativas)
  const termoVariants = [
  'https://i.postimg.cc/hG3RFj4w/Transparent-termo-beige.png',
  'https://i.postimg.cc/mZHPMKZp/fixed-14.png',
  'https://i.postimg.cc/FH75kXN7/fixed-15.png',
  'https://i.postimg.cc/VNQGfx6y/fixed-16.png',
  'https://i.postimg.cc/k47T8WKf/fixed-17.png',
  'https://i.postimg.cc/8C4h29fm/fixed-18.png'
  ];
  const [termoVariant, setTermoVariant] = useState(0);

  // Posts reales de Instagram (orden: reel preferido primero)
  const instagramEmbeds = [
    "https://www.instagram.com/p/DAzU_A-RY8k/",
    "https://www.instagram.com/p/C_rOpbDx6Wc/",
    "https://www.instagram.com/p/C7u7fu9RlVI/"
  ];

  useEffect(() => {
    // Cargar el script de Instagram cuando el componente se monta
    const script = document.createElement('script');
    script.async = true;
    script.src = '//www.instagram.com/embed.js';
    document.body.appendChild(script);

    return () => {
      // Limpiar el script cuando el componente se desmonta
      const existingScript = document.querySelector('script[src="//www.instagram.com/embed.js"]');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  // Reveal animation for the mini 'About' section when it scrolls into view
  useEffect(() => {
    const el = aboutRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAboutVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -100px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Typing animation: escribe el texto cuando aboutVisible es true
  useEffect(() => {
    if (!aboutVisible) return;
    let idx = 0;
    const speed = 18; // ms por carácter
    const typer = setInterval(() => {
      idx += 1;
      setDisplayedText(aboutText.slice(0, idx));
      if (idx >= aboutText.length) {
        clearInterval(typer);
      }
    }, speed);

    // cursor blink
    const cursor = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 500);

    return () => {
      clearInterval(typer);
      clearInterval(cursor);
    };
  }, [aboutVisible]);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // logo rotation removed; using a single static logo image

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/50 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-2" aria-hidden="true">
              {/* branding removed on user request */}
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#inicio" className="text-white hover:text-yellow-400 transition-colors duration-300 font-medium">Inicio</a>
              <a href="https://lalista.de/yerbas_de_life_mate" target="_blank" rel="noopener noreferrer" className="text-white hover:text-yellow-400 transition-colors duration-300 font-medium">Menú</a>
              <a href="#contacto" className="text-white hover:text-yellow-400 transition-colors duration-300 font-medium">Contacto</a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white z-50"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden absolute top-0 left-0 right-0 bg-black/95 backdrop-blur-md transform transition-transform duration-300 ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
          <div className="px-4 pt-20 pb-6 space-y-6">
            <a href="#inicio" className="block text-white hover:text-yellow-400 transition-colors duration-300 font-medium text-lg">Inicio</a>
            <a href="https://lalista.de/yerbas_de_life_mate" target="_blank" rel="noopener noreferrer" className="block text-white hover:text-yellow-400 transition-colors duration-300 font-medium text-lg">Menú</a>
            <a href="#contacto" className="block text-white hover:text-yellow-400 transition-colors duration-300 font-medium text-lg">Contacto</a>
          </div>
        </div>
      </nav>

      {/* Hero Section with Image Carousel */}
      <section id="inicio" className="relative h-screen overflow-hidden">
        {/* Background Images */}
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image}
              alt={`Comida mexicana ${index + 1}`}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        ))}

        {/* Hero Content */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center px-4 sm:px-6 lg:px-8">
            {/* Logo: absolute so it grows without pushing content */}
            <div className="relative mb-8">
              <div className="absolute left-1/2 -top-32 sm:-top-36 md:-top-40 transform -translate-x-1/2 z-0 animate-drop-in pointer-events-none">
                <img
                  src={logo}
                  alt="Logo Life Mate"
                  className="mx-auto w-[40vw] sm:w-[30vw] md:w-[24vw] lg:w-[20vw] max-w-[480px] h-auto drop-shadow-2xl opacity-95"
                />
              </div>
              {/* spacer so the logo doesn't push content but keeps reasonable room */}
              <div className="h-28 sm:h-32 md:h-36 lg:h-40" />
            </div>
            
            {/* Welcome Text */}
            <p className="text-xl sm:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto animate-slide-up animation-delay-300 font-coopbl">
              Somos un mayorista comprometido con nuestra Comunidad Matera. ¡Vive el momento!
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up animation-delay-600">
              <a 
                href="https://lalista.de/yerbas_de_life_mate"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl inline-flex items-center justify-center"
              >
                <ShoppingCart className="inline-block w-5 h-5 mr-2" />
                Ver Catálogo
              </a>
              <a 
                href="http://wa.me/56921636806"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 backdrop-blur-sm inline-flex items-center justify-center"
              >
                <Phone className="inline-block w-5 h-5 mr-2" />
                Contáctanos
              </a>
            </div>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {backgroundImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-yellow-400 scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </section>

      {/* About Section */}

      {/* NUESTRA HISTORIA — galería ampliada con 3 fotos */}
      <section
        id="nosotros"
        className="py-20 relative flex items-center justify-center"
        style={{
          backgroundImage: "url('https://i.postimg.cc/ZKmjTZd8/pexels-miqueas-claus-107016342-17427086.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* overlay for contrast */}
          <img
            src="https://i.postimg.cc/ZKmjTZd8/pexels-miqueas-claus-107016342-17427086.jpg"
            alt="Fondo productos"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover -z-20 transform transition-transform duration-700"
            style={{ transform: 'scale(0.70)', filter: 'contrast(1.05) saturate(1.05)' }}
          />
          <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white font-coopbl uppercase">NUESTROS PRODUCTOS</h2>
            <div className="mt-6 flex items-center justify-center space-x-3">
              <button
                onClick={() => setActiveCategory('yerbas')}
                className={`px-5 py-2 rounded-full font-semibold transition-all duration-200 ${activeCategory === 'yerbas' ? 'bg-green-600 text-white shadow-lg' : 'bg-white/10 text-white hover:bg-white/20'}`}
              >
                Yerbas Mate
              </button>
              <button
                onClick={() => setActiveCategory('termos')}
                className={`px-5 py-2 rounded-full font-semibold transition-all duration-200 ${activeCategory === 'termos' ? 'bg-green-600 text-white shadow-lg' : 'bg-white/10 text-white hover:bg-white/20'}`}
              >
                Termos
              </button>
            </div>
          </div>
          {activeCategory === 'yerbas' && (
            <div className="flex flex-col gap-y-8">
            <div className="p-4 rounded-3xl flex flex-col md:flex-row items-center gap-6">
              <div className="w-full md:w-1/2 flex items-center justify-center">
                {/* Contenedor visual grande; el área clicable es la caja centrada para evitar clicks en zonas transparentes */}
                <div className="w-4/5 md:w-5/6 lg:w-4/5 flex items-center justify-center">
                    <a
                    href="https://lalista.de/yerbas_de_life_mate"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Ir a Foodbooking - Producto 1"
                      className="inline-block"
                  >
                    <div className="relative overflow-visible rounded-xl flex items-center justify-center">
                      <img
                        src="https://i.postimg.cc/GpR7CYw9/Sara-transparent.png"
                        alt="Producto 1"
                          className="w-full h-auto max-h-[90vh] object-contain transform scale-[1.35] transition-transform duration-700 hover:scale-[1.6] cursor-pointer"
                      />
                    </div>
                  </a>
                </div>
              </div>
              <div className="w-full md:w-1/2 text-left text-white">
                <h3 className="text-2xl md:text-3xl font-bold font-coopbl">Yerba Sara</h3>
                <p className="mt-2 text-gray-200 font-coopbl lowercase"> Origen brasileño
su corte incluye una
mezcla de hojas, polvo
y un bajo porcentaje de
palillo, con una textura
muy fina de sabor
intenso y ligeramente
amargo</p>
              </div>
            </div>
            <div className="p-4 rounded-3xl flex flex-col md:flex-row items-center gap-6">
              <div className="w-full md:w-1/2 flex items-center justify-center">
                <div className="w-4/5 md:w-5/6 lg:w-4/5 flex items-center justify-center">
                    <a
                    href="https://www.foodbooking.com/ordering/restaurant/menu/addons/1807008/mi1807008?restaurant_uid=7f41adde-e963-456c-8586-137471e638de"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Ir a Foodbooking - Producto 2"
                      className="inline-block"
                  >
                    <div className="relative overflow-visible rounded-xl flex items-center justify-center">
                      <img
                        src="https://i.postimg.cc/7hHH5XCc/BALDO-2.png"
                        alt="Producto 2"
                          className="w-full h-auto max-h-[90vh] object-contain transform scale-[1.35] transition-transform duration-700 hover:scale-[1.6] cursor-pointer"
                      />
                    </div>
                  </a>
                </div>
              </div>
              <div className="w-full md:w-1/2 text-left text-white">
                <h3 className="text-2xl md:text-3xl font-bold font-coopbl">Yerba Baldo</h3>
                <p className="mt-2 text-gray-200 font-coopbl">Origen brasileño. Corte fino y polvoriento, secado sin humo, que ofrece un sabor fresco y herbáceo sin amargura intensa; adecuada para diferentes estilos de consumo de mate.</p>
              </div>
            </div>
            <div className="p-4 rounded-3xl flex flex-col md:flex-row items-center gap-6">
              <div className="w-full md:w-1/2 flex items-center justify-center">
                <div className="w-4/5 md:w-5/6 lg:w-4/5 flex items-center justify-center">
                    <a
                    href="https://lalista.de/yerbas_de_life_mate"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Ir a Foodbooking - Producto 3"
                      className="inline-block"
                  >
                    <div className="relative overflow-visible rounded-xl flex items-center justify-center">
                      <img
                        src="https://i.postimg.cc/8CwDqMXm/fixed-3.png"
                        alt="Producto 3"
                          className="w-full h-auto max-h-[90vh] object-contain transform scale-[1.35] transition-transform duration-700 hover:scale-[1.6] cursor-pointer"
                      />
                    </div>
                  </a>
                </div>
              </div>
              <div className="w-full md:w-1/2 text-left text-white">
  <h3 className="text-2xl md:text-3xl font-bold font-coopbl">Yerba Canarias Edición Especial</h3>
  <p className="mt-2 text-gray-200 font-coopbl">Origen brasileño. Yerba sin palo, con un corte muy fino y una alta proporción de polvo; se seca sin humo, por lo que su sabor es limpio, fuerte y amargo.</p>
              </div>
            </div>
            <div className="p-4 rounded-3xl flex flex-col md:flex-row items-center gap-6">
              <div className="w-full md:w-1/2 flex items-center justify-center">
                <div className="w-4/5 md:w-5/6 lg:w-4/5 flex items-center justify-center">
                    <a
                    href="https://lalista.de/yerbas_de_life_mate"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Ir a Foodbooking - Producto 4"
                      className="inline-block"
                  >
                    <div className="relative overflow-visible rounded-xl flex items-center justify-center">
                      <img
                        src="https://i.postimg.cc/zXPxPBkH/fixed-4.png"
                        alt="Producto 4"
                          className="w-full h-auto max-h-[90vh] object-contain transform scale-[1.35] transition-transform duration-700 hover:scale-[1.6] cursor-pointer"
                      />
                    </div>
                  </a>
                </div>
              </div>
              <div className="w-full md:w-1/2 text-left text-white">
                <h3 className="text-2xl md:text-3xl font-bold font-coopbl">Yerba Esmeralda</h3>
                <p className="mt-2 text-gray-200 font-coopbl"> Origen brasileño. Esta yerba ofrece un sabor suave y fresco, sin tonos amargos excesivos. Su molienda fina asegura una rápida liberación de sabor, ideal para quienes disfrutan de un mate constante y fácil.</p>
              </div>
            </div>
            <div className="p-4 rounded-3xl flex flex-col md:flex-row items-center gap-6">
              <div className="w-full md:w-1/2 flex items-center justify-center">
                <div className="w-4/5 md:w-5/6 lg:w-4/5 flex items-center justify-center">
                    <a
                    href="https://lalista.de/yerbas_de_life_mate"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Ir a Foodbooking - Producto 5"
                      className="inline-block"
                  >
                    <div className="relative overflow-visible rounded-xl flex items-center justify-center">
                      <img
                        src="https://i.postimg.cc/YCrb9FqP/fixed-5.png"
                        alt="Producto 5"
                          className="w-full h-auto max-h-[90vh] object-contain transform scale-[1.35] transition-transform duration-700 hover:scale-[1.6] cursor-pointer"
                      />
                    </div>
                  </a>
                </div>
              </div>
              <div className="w-full md:w-1/2 text-left text-white">
                <h3 className="text-2xl md:text-3xl font-bold font-coopbl">Yerba Canarias Té Verde y Jengibre</h3>
                <p className="mt-2 text-gray-200 font-coopbl">Una fusión perfecta para tu bienestar: yerba mate elaborada a partir de la reconocida yerba canaria, potenciada con té verde y jengibre. Aprovecha el poder antioxidante del té verde mientras el jengibre te ayuda a mantener una digestión saludable.</p>
              </div>
            </div>
            {/* Productos limitados a 1-5 según petición del usuario */}
          </div>
          )}
          {activeCategory === 'termos' && (
            <div className="flex flex-col gap-y-8">
              <div className="p-4 rounded-3xl flex flex-col md:flex-row items-center gap-6">
                <div className="w-full md:w-1/2 flex items-center justify-center">
                  <div className="w-4/5 md:w-5/6 lg:w-4/5 flex items-center justify-center">
                    <div className="flex items-center w-full">
                      <div className="hidden md:flex flex-col space-y-3 mr-4">
                        {termoVariants.map((v, i) => (
                          <button
                            key={i}
                            onClick={() => setTermoVariant(i)}
                            className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${i === termoVariant ? 'border-yellow-400' : 'border-transparent'} bg-white/5`}
                            aria-label={`Variante ${i + 1}`}
                          >
                            <img src={v} alt={`Variante ${i + 1}`} className="w-full h-full object-contain" />
                          </button>
                        ))}
                      </div>
                      <div className="flex-1">
                        <a
                          href="https://lalista.de/yerbas_de_life_mate"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Ir al catálogo - Termo Termolar"
                          className="inline-block w-full"
                        >
                          <div className="relative overflow-visible rounded-xl flex items-center justify-center">
                            <img
                              src={termoVariants[termoVariant]}
                              alt="Termo De Acero Inoxidable Termolar"
                              className="w-full h-auto max-h-[90vh] object-contain transform scale-[1.0] transition-transform duration-700 hover:scale-[1.02] cursor-pointer"
                            />
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2 text-left text-white">
                  <h3 className="text-2xl md:text-3xl font-bold font-coopbl">Termo De Acero Inoxidable Termolar</h3>
                  <p className="mt-2 text-gray-200 font-coopbl">Termo especial para cebadores de alta calidad de capacidad 1 litro, interior y exterior 100% acero inoxidable, irrompible, con almohada anti-ruido, aislamiento térmico al vacío y vaso protector.</p>
                  <ul className="mt-4 text-gray-200 list-disc list-inside space-y-1">
                    <li>Mantiene agua caliente hasta 20 horas</li>
                    <li>Mantiene agua fría hasta 36 horas</li>
                    <li>Con manilla</li>
                    <li>Capacidad: 1 litro</li>
                    <li>Tapa con pico cebado</li>
                  </ul>
                </div>
              </div>
              {/* Termo especial — Edición Especial Uruguay (producto independiente) */}
              <div className="p-4 rounded-3xl flex flex-col md:flex-row items-center gap-6">
                <div className="w-full md:w-1/2 flex items-center justify-center">
                  <div className="w-4/5 md:w-5/6 lg:w-4/5 flex items-center justify-center">
                    <a
                      href="https://lalista.de/yerbas_de_life_mate"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Ir al catálogo - Termo Edición Uruguay"
                      className="inline-block w-full"
                    >
                      <div className="relative overflow-visible rounded-xl flex items-center justify-center">
                        <img
                          src="https://i.postimg.cc/8cQh86mL/Termolar-Uruguay-1-lt-transparent.png"
                          alt="Termo Termolar Edición Especial Uruguay"
                          className="w-full h-auto max-h-[90vh] object-contain transform scale-[1.0] transition-transform duration-700 hover:scale-[1.02] cursor-pointer"
                        />
                      </div>
                    </a>
                  </div>
                </div>
                <div className="w-full md:w-1/2 text-left text-white">
                  <h3 className="text-2xl md:text-3xl font-bold font-coopbl">Termo De Acero Inoxidable Termolar — Edición Especial Uruguay</h3>
                  <p className="mt-2 text-gray-200 font-coopbl">Termo especial para cebadores de alta calidad de capacidad 1 litro, interior y exterior 100% acero inoxidable, irrompible, con almohada anti-ruido, aislamiento térmico al vacío y vaso protector.</p>
                  <ul className="mt-4 text-gray-200 list-disc list-inside space-y-1">
                    <li>Mantiene agua caliente hasta 20 horas</li>
                    <li>Mantiene agua fría hasta 36 horas</li>
                    <li>Con manilla</li>
                    <li>Capacidad: 1 litro</li>
                    <li>Tapa con pico cebado</li>
                  </ul>
                </div>
              </div>
              {/* Termo especial — Edición Grabado Argentina (producto independiente) */}
              <div className="p-4 rounded-3xl flex flex-col md:flex-row items-center gap-6">
                <div className="w-full md:w-1/2 flex items-center justify-center">
                  <div className="w-4/5 md:w-5/6 lg:w-4/5 flex items-center justify-center">
                    <a
                      href="https://lalista.de/yerbas_de_life_mate"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Ir al catálogo - Termo Edición Argentina"
                      className="inline-block w-full"
                    >
                      <div className="relative overflow-visible rounded-xl flex items-center justify-center">
                        <img
                          src="https://i.postimg.cc/TYntPRyR/Termolar-Argentina-1-lt-transparent.png"
                          alt="Termo Termolar Edición Grabado Argentina"
                          className="w-full h-auto max-h-[90vh] object-contain transform scale-[1.0] transition-transform duration-700 hover:scale-[1.02] cursor-pointer"
                        />
                      </div>
                    </a>
                  </div>
                </div>
                <div className="w-full md:w-1/2 text-left text-white">
                  <h3 className="text-2xl md:text-3xl font-bold font-coopbl">Termo De Acero Inoxidable Termolar — Edición Grabado Argentina</h3>
                  <p className="mt-2 text-gray-200 font-coopbl">Termo especial para cebadores de alta calidad de capacidad 1 litro, interior y exterior 100% acero inoxidable, irrompible, con almohada anti-ruido, aislamiento térmico al vacío y vaso protector.</p>
                  <ul className="mt-4 text-gray-200 list-disc list-inside space-y-1">
                    <li>Mantiene agua caliente hasta 20 horas</li>
                    <li>Mantiene agua fría hasta 36 horas</li>
                    <li>Con manilla</li>
                    <li>Capacidad: 1 litro</li>
                    <li>Tapa con pico cebado</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Mini 'About / Message' Section (above Instagram) */}
      <section
        ref={aboutRef}
        className={`py-24 md:py-36 relative min-h-[40vh] md:min-h-[65vh] transform transition-all duration-700 ease-out ${aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        style={{
          backgroundImage: "url('https://i.postimg.cc/90f5PrvH/Mate-de-fondo.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/60 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 text-center flex flex-col items-center justify-center h-full">
          <h3 className="text-5xl md:text-6xl font-bold text-white font-coopbl mb-8">Life Mate</h3>
          <p className="text-lg md:text-3xl text-gray-200 leading-relaxed max-w-4xl mx-auto px-2 md:px-0 whitespace-pre-wrap text-left">
            {displayedText}
            <span className={`inline-block ml-1 w-3 ${cursorVisible ? 'bg-white' : 'bg-transparent'} h-7 align-middle`} />
          </p>
        </div>
      </section>

      {/* Instagram Feed Section */}
      <section
        className="py-20 relative"
        style={{
          backgroundImage: "url('https://i.postimg.cc/fRFgQtw9/mate-con-pose.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* overlay for readability */}
        <div className="absolute inset-0 bg-black/60 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white font-coopbl mb-6">
              NUESTRO INSTAGRAM
            </h2>
            <p className="text-xl text-gray-300 mb-8 font-coopbl">
              Para el verdadero amante del mate, Lifemate presenta la mejor selección de accesorios de alta calidad y diseño exclusivo. Navega por nuestros materos, bolsos y bombillas.
            </p>
              <a 
              href="https://www.instagram.com/lifematecl/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <Instagram className="w-5 h-5 mr-2" />
              @lifematecl
            </a>
          </div>

          {/* Instagram Carousel */}
          <div className="relative">
            <div className="grid md:grid-cols-3 gap-8">
              {instagramEmbeds.map((embedUrl, index) => {
                const hideText = embedUrl.includes('DIl_5G2Ry5r');
                return (
                  <div key={index} className="instagram-post bg-white rounded-xl overflow-hidden shadow-xl transform hover:scale-105 transition-all duration-300 max-w-xs mx-auto">
                    <blockquote 
                      className="instagram-media" 
                      data-instgrm-permalink={embedUrl}
                      data-instgrm-version="14"
                      style={{
                        background: '#FFF',
                        border: '0',
                        borderRadius: '3px',
                        boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
                        margin: '1px',
                        maxWidth: '360px',
                        minWidth: '240px',
                        padding: '0',
                        width: '100%'
                      }}
                    >
                      <div style={{ padding: '8px' }}>
                        <div style={{ 
                          display: 'flex', 
                          flexDirection: 'row', 
                          alignItems: 'center' 
                        }}>
                          <div style={{
                            backgroundColor: '#F4F4F4',
                            borderRadius: '50%',
                            flexGrow: '0',
                            height: '40px',
                            marginRight: '14px',
                            width: '40px'
                          }}></div>
                          <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            flexGrow: '1',
                            justifyContent: 'center'
                          }}>
                            <div style={{
                              backgroundColor: '#F4F4F4',
                              borderRadius: '4px',
                              flexGrow: '0',
                              height: '14px',
                              marginBottom: '6px',
                              width: '100px'
                            }}></div>
                            <div style={{
                              backgroundColor: '#F4F4F4',
                              borderRadius: '4px',
                              flexGrow: '0',
                              height: '14px',
                              width: '60px'
                            }}></div>
                          </div>
                        </div>
                        <div style={{ padding: '12% 0' }}></div>
                        <div style={{ 
                          display: 'block', 
                          height: '40px', 
                          margin: '0 auto 8px', 
                          width: '40px' 
                        }}>
                          <svg width="40px" height="40px" viewBox="0 0 60 60" version="1.1">
                            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                              <g transform="translate(-511.000000, -20.000000)" fill="#000000">
                                <g>
                                  <path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path>
                                </g>
                              </g>
                            </g>
                          </svg>
                        </div>
                        {!hideText && (
                          <div style={{ paddingTop: '8px' }}>
                            <div style={{
                              color: '#3897f0',
                              fontFamily: 'Arial,sans-serif',
                              fontSize: '14px',
                              fontStyle: 'normal',
                              fontWeight: '550',
                              lineHeight: '18px'
                            }}>
                              Ver esta publicación en Instagram
                            </div>
                          </div>
                        )}
                        <div style={{ padding: '12.5% 0' }}></div>
                      </div>
                    </blockquote>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

  

      {/* Footer */}
      <footer className="bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <img
                src={logo}
                alt="Bandera / Logo"
                className="h-24 w-24 object-contain"
              />
              <div className="flex flex-col md:flex-row md:items-center">
                <span className="text-white text-lg font-bold font-coopbl">Lifemate</span>
                <span className="text-gray-400 text-sm md:ml-4 mt-1 md:mt-0">© 2024 Lifemate. Todos los derechos reservados.</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Botón flotante de WhatsApp */}
      {/* Botones flotantes de redes sociales */}
  <div className="fixed bottom-10 right-12 flex flex-row space-x-4 z-50 md:bottom-12 md:right-16">
        {/* Botón de WhatsApp */}
        <a 
          href="http://wa.me/56921636806" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-20 h-20 transition-transform duration-300 hover:scale-110"
        >
          <img
            src="https://i.postimg.cc/W41gJHwg/whatsapp-icon-free-png.webp"
            alt="WhatsApp"
            className="w-full h-full rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-1"
          />
        </a>
        
        {/* Botón de Instagram */}
        <a 
          href="https://www.instagram.com/lifematecl/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-20 h-20 transition-transform duration-300 hover:scale-110"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png"
            alt="Instagram"
            className="w-full h-full rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-2"
          />
        </a>
        
        {/* Botón de TikTok */}
        <a
          href="https://www.tiktok.com/@lifematecl?_t=ZM-8w3l1Ld9irt&_r=1&fbclid=PAZXh0bgNhZW0CMTEAAae0nSeGQhU0VBADGkDSBRE9w2Dr4hCsXRzfro2NHMWbwyrvJOY-W3MYS5CdQg_aem_yCQZ6WL8JLRnYsZr8KyEzg"
          target="_blank"
          rel="noopener noreferrer"
          className="w-20 h-20 rounded-full overflow-hidden transition-transform duration-300 hover:scale-110 flex items-center justify-center bg-transparent"
        >
          <img
            src="https://i.postimg.cc/wBp3d75G/Tik-Tok-logo.jpg"
            alt="TikTok Life Mate"
            className="w-full h-full object-contain transform transition-transform duration-300 p-2"
            style={{ transform: 'scale(1)', transformOrigin: 'center' }}
          />
        </a>
      </div>
    </div>
  );
}

export default App;