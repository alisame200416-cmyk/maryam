import React, { useState } from 'react';
import { Camera, X, ChevronRight, ChevronLeft, Maximize2 } from 'lucide-react';
import { GALLERY_ITEMS, getGalleryItemsWithImages } from '../data/chaletData';
import { GalleryItem, ResortImagesConfig } from '../types';

interface GallerySectionProps {
  imagesConfig?: ResortImagesConfig;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ imagesConfig }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'كافة الصور' },
    { id: 'pool', label: 'المسبح والشلال' },
    { id: 'villa', label: 'الفيلا والغرف' },
    { id: 'farm', label: 'المزرعة والحيوانات' },
    { id: 'outdoor', label: 'الجلسات والحدائق' },
  ];

  const galleryItems = imagesConfig ? getGalleryItemsWithImages(imagesConfig) : GALLERY_ITEMS;

  const filteredItems =
    selectedCategory === 'all'
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  const openLightbox = (index: number) => {
    setActiveLightboxIndex(index);
  };

  const closeLightbox = () => {
    setActiveLightboxIndex(null);
  };

  const nextImage = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % filteredItems.length);
    }
  };

  const prevImage = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex(
        (activeLightboxIndex - 1 + filteredItems.length) % filteredItems.length
      );
    }
  };

  return (
    <section id="gallery" className="py-20 bg-[#0f1a15] border-t border-[#1d3027] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#182a20] border border-[#c5a059]/30 text-[#c5a059] text-xs font-semibold mb-3">
            <Camera className="w-3.5 h-3.5" />
            <span>معرض الصور الحي</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#f4efe6] mb-4">
            جولة بصرية في رحاب الواحة الملكية
          </h2>
          <p className="text-[#a39a8c] text-sm sm:text-base leading-relaxed">
            استكشف تفاصيل المكان والهدوء الساحر عبر لقطات حية للمسبح، الغرف، الجلسات الخارجية وبساتين المزرعة.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#c5a059] text-[#0c1411] shadow-md shadow-[#c5a059]/30'
                    : 'bg-[#14221c] text-[#a39a8c] hover:text-[#f4efe6] hover:bg-[#1b2d24] border border-[#23382e]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => openLightbox(idx)}
              className="group relative h-64 sm:h-72 rounded-2xl overflow-hidden cursor-pointer border border-[#23382e] shadow-lg bg-[#14221c]"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c1411] via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

              <div className="absolute inset-0 p-5 flex flex-col justify-end">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-[#f4efe6] group-hover:text-[#c5a059] transition-colors">
                    {item.title}
                  </p>
                  <div className="w-8 h-8 rounded-full bg-[#0c1411]/80 border border-[#c5a059]/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-4 h-4 text-[#c5a059]" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeLightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-md animate-fade-in">
          <button
            onClick={closeLightbox}
            className="absolute top-6 left-6 p-3 rounded-full bg-[#14221c] border border-[#2e4639] text-[#f4efe6] hover:text-[#c5a059] transition-colors z-10 cursor-pointer"
            aria-label="إغلاق المعرض"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={nextImage}
            className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#14221c]/80 border border-[#2e4639] text-[#f4efe6] hover:text-[#c5a059] transition-colors z-10 cursor-pointer"
            aria-label="الصورة التالية"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={prevImage}
            className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#14221c]/80 border border-[#2e4639] text-[#f4efe6] hover:text-[#c5a059] transition-colors z-10 cursor-pointer"
            aria-label="الصورة السابقة"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-4xl max-h-[85vh] flex flex-col items-center">
            <img
              src={filteredItems[activeLightboxIndex].imageUrl}
              alt={filteredItems[activeLightboxIndex].title}
              className="max-h-[75vh] w-auto max-w-full rounded-2xl object-contain border border-[#2e4639] shadow-2xl"
              referrerPolicy="no-referrer"
            />
            <p className="mt-4 text-[#f4efe6] text-center font-bold text-base">
              {filteredItems[activeLightboxIndex].title}
            </p>
            <span className="text-xs text-[#a39a8c]">
              {activeLightboxIndex + 1} من {filteredItems.length}
            </span>
          </div>
        </div>
      )}
    </section>
  );
};
