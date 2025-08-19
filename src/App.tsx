import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MapPin, Clock, ChefHat, Utensils, Star, Instagram, ChevronLeft, ChevronRight } from 'lucide-react';

const backgroundImages = [
  "https://static.wixstatic.com/media/5ffcac_f127c5f2095840809d1607e9ccedc46f~mv2.jpg/v1/fill/w_976,h_655,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/5ffcac_f127c5f2095840809d1607e9ccedc46f~mv2.jpg",
  "https://static.wixstatic.com/media/5ffcac_639756dcea0546ee8b90923ca85ede01~mv2.jpg/v1/fill/w_976,h_655,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/5ffcac_639756dcea0546ee8b90923ca85ede01~mv2.jpg",
  "https://static.wixstatic.com/media/5ffcac_23412ee0ae0e4dee8925dc755ed48bb6~mv2.jpg/v1/fill/w_976,h_655,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/5ffcac_23412ee0ae0e4dee8925dc755ed48bb6~mv2.jpg",
  "https://static.wixstatic.com/media/5ffcac_fae5b932ddc546f2afa20f04423a945d~mv2.jpg/v1/fill/w_1518,h_1236,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/5ffcac_fae5b932ddc546f2afa20f04423a945d~mv2.jpg"
];

const logo = "https://static.wixstatic.com/media/5ffcac_35a17ca9bc2d4e6391b100d62e75a847~mv2.png/v1/fill/w_600,h_337,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Logo%20La%20Mexicana%20Blanco.png";

function App() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentInstagramIndex, setCurrentInstagramIndex] = useState(0);

  // Posts reales de Instagram (orden: reel preferido primero)
  const instagramEmbeds = [
    "https://www.instagram.com/reel/DLBQv4lP7Xo/",
    "https://www.instagram.com/p/DIHSuulpmKk/",
    "https://www.instagram.com/p/DJr063cyyq4/"
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
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/50 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-2">
              <img
                src="https://em-content.zobj.net/source/apple/232/flag-for-mexico_1f1f2-1f1fd.png"
                alt="Bandera de México"
                className="h-8 w-8 object-contain"
              />
              <span className="text-white text-xl font-bold font-mexicana">La Mexicana</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#inicio" className="text-white hover:text-yellow-400 transition-colors duration-300 font-medium">Inicio</a>
              <a href="https://www.foodbooking.com/ordering/restaurant/menu?restaurant_uid=7f41adde-e963-456c-8586-137471e638de" target="_blank" rel="noopener noreferrer" className="text-white hover:text-yellow-400 transition-colors duration-300 font-medium">Menú</a>
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
            <a href="https://www.foodbooking.com/ordering/restaurant/menu?restaurant_uid=7f41adde-e963-456c-8586-137471e638de" target="_blank" rel="noopener noreferrer" className="block text-white hover:text-yellow-400 transition-colors duration-300 font-medium text-lg">Menú</a>
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
            {/* Logo */}
            <div className="mb-8 animate-fade-in">
              <img
                src={logo}
                alt="Logo La Mexicana"
                className="mx-auto h-32 sm:h-40 lg:h-48 w-auto drop-shadow-2xl"
              />
            </div>
            
            {/* Welcome Text */}
            <p className="text-xl sm:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto animate-slide-up animation-delay-300">
              Auténticos sabores mexicanos que despiertan tus sentidos
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up animation-delay-600">
              <a 
                href="https://www.foodbooking.com/ordering/?restaurant_uid=7f41adde-e963-456c-8586-137471e638de&site_url=aHR0cHM6Ly93d3cubGFtZXhpY2FuYS5jbC8%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl inline-flex items-center justify-center"
              >
                <Utensils className="inline-block w-5 h-5 mr-2" />
                Ver Nuestro Menú
              </a>
              <a 
                href="https://wa.me/56967494740"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 backdrop-blur-sm inline-flex items-center justify-center"
              >
                <Phone className="inline-block w-5 h-5 mr-2" />
                Hacer Reservación
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
      <section id="nosotros" className="py-20 bg-black flex items-center justify-center">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white font-mexicana">NUESTROS PRODUCTOS</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-1 items-center">
            <div className="p-0 rounded-3xl flex items-center justify-center overflow-visible">
              <a
                href="https://www.foodbooking.com/ordering/restaurant/menu/addons/1806983/mi1806983?restaurant_uid=7f41adde-e963-456c-8586-137471e638de"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ir a Foodbooking - Producto 1"
                className="w-full"
              >
                <img
                  src="https://static.wixstatic.com/media/5ffcac_e4af7e3745294983beca27552dbbbd85~mv2.png/v1/fill/w_256,h_256,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/5ffcac_e4af7e3745294983beca27552dbbbd85~mv2.png"
                  alt="Picoteo - Imagen 1"
                  className="w-full h-80 sm:h-96 md:h-[30rem] object-contain transition-transform duration-500 ease-out transform hover:scale-105 hover:-translate-y-2 hover:rotate-1 cursor-pointer"
                />
              </a>
            </div>
            <div className="p-0 rounded-3xl flex items-center justify-center overflow-visible">
              <a
                href="https://www.foodbooking.com/ordering/restaurant/menu/addons/1807008/mi1807008?restaurant_uid=7f41adde-e963-456c-8586-137471e638de"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ir a Foodbooking - Producto 2"
                className="w-full"
              >
                <img
                  src="https://static.wixstatic.com/media/5ffcac_b661c683c6b641e09ce43c74dae76efa~mv2.png/v1/fill/w_256,h_256,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/5ffcac_b661c683c6b641e09ce43c74dae76efa~mv2.png"
                  alt="Picoteo - Imagen 2"
                  className="w-full h-80 sm:h-96 md:h-[30rem] object-contain transition-transform duration-500 ease-out transform hover:scale-105 hover:-translate-y-2 hover:rotate-1 cursor-pointer"
                />
              </a>
            </div>
            <div className="p-0 rounded-3xl flex items-center justify-center overflow-visible">
              <a
                href="https://www.foodbooking.com/ordering/restaurant/menu?restaurant_uid=7f41adde-e963-456c-8586-137471e638de"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ir a Foodbooking - Producto 3"
                className="w-full"
              >
                <img
                  src="https://static.wixstatic.com/media/5ffcac_7fe770a3204446ada8605f0e32e80921~mv2.png/v1/fill/w_256,h_256,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/5ffcac_7fe770a3204446ada8605f0e32e80921~mv2.png"
                  alt="Picoteo - Imagen 3"
                  className="w-full h-80 sm:h-96 md:h-[30rem] object-contain transition-transform duration-500 ease-out transform hover:scale-105 hover:-translate-y-2 hover:rotate-1 cursor-pointer"
                />
              </a>
            </div>
            <div className="p-0 rounded-3xl flex items-center justify-center overflow-visible">
              <a
                href="https://www.foodbooking.com/ordering/restaurant/menu?restaurant_uid=7f41adde-e963-456c-8586-137471e638de"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ir a Foodbooking - Producto 4"
                className="w-full"
              >
                <img
                  src="https://static.wixstatic.com/media/5ffcac_cae7263ca0ad4698a69de688439dc6c7~mv2.png/v1/fill/w_256,h_256,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/5ffcac_cae7263ca0ad4698a69de688439dc6c7~mv2.png"
                  alt="Picoteo - Imagen 4"
                  className="w-full h-80 sm:h-96 md:h-[30rem] object-contain transition-transform duration-500 ease-out transform hover:scale-105 hover:-translate-y-2 hover:rotate-1 cursor-pointer"
                />
              </a>
            </div>
            <div className="p-0 rounded-3xl flex items-center justify-center overflow-visible">
              <a
                href="https://www.foodbooking.com/ordering/restaurant/menu?restaurant_uid=7f41adde-e963-456c-8586-137471e638de"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ir a Foodbooking - Producto 5"
                className="w-full"
              >
                <img
                  src="https://static.wixstatic.com/media/5ffcac_46c328032b2a4939b6b9a88743a31b1e~mv2.png/v1/fill/w_256,h_256,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/5ffcac_46c328032b2a4939b6b9a88743a31b1e~mv2.png"
                  alt="Picoteo - Imagen 5"
                  className="w-full h-80 sm:h-96 md:h-[30rem] object-contain transition-transform duration-500 ease-out transform hover:scale-105 hover:-translate-y-2 hover:rotate-1 cursor-pointer"
                />
              </a>
            </div>
            <div className="p-0 rounded-3xl flex items-center justify-center overflow-visible">
              <a
                href="https://www.foodbooking.com/ordering/restaurant/menu?restaurant_uid=7f41adde-e963-456c-8586-137471e638de"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ir a Foodbooking - Producto 6"
                className="w-full"
              >
                <img
                  src="https://static.wixstatic.com/media/5ffcac_e3b510a4c05d43cdbfc8f13968cab2b1~mv2.png/v1/fill/w_256,h_256,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/5ffcac_e3b510a4c05d43cdbfc8f13968cab2b1~mv2.png"
                  alt="Picoteo - Imagen 6"
                  className="w-full h-80 sm:h-96 md:h-[30rem] object-contain transition-transform duration-500 ease-out transform hover:scale-105 hover:-translate-y-2 hover:rotate-1 cursor-pointer"
                />
              </a>
            </div>
            <div className="p-0 rounded-3xl flex items-center justify-center overflow-visible">
              <a
                href="https://www.foodbooking.com/ordering/restaurant/menu?restaurant_uid=7f41adde-e963-456c-8586-137471e638de"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ir a Foodbooking - Producto 7"
                className="w-full"
              >
                <img
                  src="https://static.wixstatic.com/media/5ffcac_770f4829cf6f4e07a3708d5544f3b393~mv2.png/v1/fill/w_256,h_256,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/5ffcac_770f4829cf6f4e07a3708d5544f3b393~mv2.png"
                  alt="Picoteo - Imagen 7"
                  className="w-full h-80 sm:h-96 md:h-[30rem] object-contain transition-transform duration-500 ease-out transform hover:scale-105 hover:-translate-y-2 hover:rotate-1 cursor-pointer"
                />
              </a>
            </div>
            <div className="p-0 rounded-3xl flex items-center justify-center overflow-visible">
              <a
                href="https://www.foodbooking.com/ordering/restaurant/menu?restaurant_uid=7f41adde-e963-456c-8586-137471e638de"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ir a Foodbooking - Producto 8"
                className="w-full"
              >
                <img
                  src="https://static.wixstatic.com/media/5ffcac_c500a04459a14e5cbdf480e3ffc6716a~mv2.png/v1/fill/w_256,h_256,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/5ffcac_c500a04459a14e5cbdf480e3ffc6716a~mv2.png"
                  alt="Picoteo - Imagen 8"
                  className="w-full h-80 sm:h-96 md:h-[30rem] object-contain transition-transform duration-500 ease-out transform hover:scale-105 hover:-translate-y-2 hover:rotate-1 cursor-pointer"
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Feed Section */}
      <section
        className="py-20 relative"
        style={{
          backgroundImage: "url('https://tb-static.uber.com/prod/image-proc/processed_images/95ac7f078699f45c0ca45dc1048d754b/16bb0a3ab8ea98cfe8906135767f7bf4.jpeg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* overlay for readability */}
        <div className="absolute inset-0 bg-black/60 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white font-mexicana mb-6">
              NUESTRO INSTAGRAM
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Descubre nuestros platillos más deliciosos y momentos especiales
            </p>
            <a 
              href="https://www.instagram.com/lamexicanach/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <Instagram className="w-5 h-5 mr-2" />
              @lamexicanach
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

  {/* Location and Contact Section */}
  <section id="contacto"
        className="py-20 bg-gray-900 relative"
        style={{
          backgroundImage: "url('https://i.postimg.cc/HnRP49cn/Whats-App-Image-2025-08-18-at-11-19-29-PM.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* overlay to improve text contrast */}
        <div className="absolute inset-0 bg-black/60 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-white mb-8 font-mexicana">Contacto</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-red-600 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Teléfono</h3>
                    <p className="text-gray-300">+56 9 6749 4740</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-red-600 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Dirección</h3>
                    <p className="text-gray-300">
                      Av. Valparaíso 1137<br />
                      Viña del Mar, Chile
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-red-600 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Horarios</h3>
                    <p className="text-gray-300">
                      Lun - Jue: 12:00 - 22:30<br />
                      Vie - Sab: 12:00 - 23:30<br />
                      Dom: Cerrado
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Location Map */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8 font-mexicana">Encuentranos</h2>
              <p className="text-gray-300 mb-6">
                Encuentranos fácilmente en el corazón de Viña del Mar. Estamos ubicados en una zona privilegiada con fácil acceso.
              </p>
              
              <div className="bg-gray-800 rounded-xl overflow-hidden shadow-xl">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3344.8234567890123!2d-71.5519!3d-33.0247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9689de75010857cb%3A0x64eab8c19ef81afa!2sla%20mexicana!5e0!3m2!1ses!2scl!4v1234567890123!5m2!1ses!2scl"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                ></iframe>
                
                <div className="p-6 flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://www.google.com/maps/place/la+mexicana/data=!4m2!3m1!1s0x9689de75010857cb:0x64eab8c19ef81afa?sa=X&ved=1t:242&ictx=111"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold text-center transition-colors duration-300"
                  >
                    Ver en Google Maps
                  </a>
                  <a
                    href="https://www.google.com/maps/dir//la+mexicana/@-33.0247,-71.5519,15z"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold text-center transition-colors duration-300"
                  >
                    Cómo Llegar
                  </a>
                </div>
              </div>
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
                src="https://em-content.zobj.net/source/apple/232/flag-for-mexico_1f1f2-1f1fd.png"
                alt="Bandera de México"
                className="h-6 w-6 object-contain"
              />
              <span className="text-white text-lg font-bold font-mexicana">La Mexicana</span>
            </div>
            <p className="text-gray-400 text-sm">
              © 2024 La Mexicana. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* Botón flotante de WhatsApp */}
      {/* Botones flotantes de redes sociales */}
      <div className="fixed bottom-6 right-6 flex flex-row space-x-3 z-50">
        {/* Botón de WhatsApp */}
        <a 
          href="https://wa.me/56967494740" 
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
          href="https://www.instagram.com/lamexicanach/" 
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
        
        {/* Botón de UberEats */}
        <a
          href="https://www.ubereats.com/cl-en/valparaiso/food-delivery/taqueria-la-mexicana/bnlcRsz9QdSgzgT8ee2yIQ"
          target="_blank"
          rel="noopener noreferrer"
          className="w-20 h-20 rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-110 flex items-center justify-center bg-transparent"
        >
          <img
            src="https://i.postimg.cc/SR54H95Y/1200x630wa-removebg-preview.png"
            alt="UberEats La Mexicana"
            className="w-full h-full object-contain transform transition-transform duration-300"
            style={{ transform: 'scale(2.4)', transformOrigin: 'center' }}
          />
        </a>
      </div>
    </div>
  );
}

export default App;