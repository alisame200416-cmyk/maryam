/**
 * Image Upload & Compression Helper
 * Reads image files directly from device gallery/computer via FileReader
 * and compresses them using HTML Canvas to ensure optimal resolution
 * and seamless localStorage compatibility without quota issues.
 */

export function processUploadedImageFile(
  file: File,
  maxDimension = 1600,
  quality = 0.85
): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      reject(new Error('الملف المختار ليس صورة صالحة. يرجى اختيار ملف صورة (JPG, PNG, WEBP).'));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('تعذر قراءة ملف الصورة من جهازك.'));
    
    reader.onload = () => {
      const rawDataUrl = reader.result as string;
      const img = new Image();

      img.onerror = () => {
        // If image object fails to decode, fallback to raw data url
        resolve(rawDataUrl);
      };

      img.onload = () => {
        try {
          const width = img.width;
          const height = img.height;

          let targetWidth = width;
          let targetHeight = height;

          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              targetWidth = maxDimension;
              targetHeight = Math.round((height * maxDimension) / width);
            } else {
              targetHeight = maxDimension;
              targetWidth = Math.round((width * maxDimension) / height);
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = targetWidth;
          canvas.height = targetHeight;
          const ctx = canvas.getContext('2d');

          if (!ctx) {
            resolve(rawDataUrl);
            return;
          }

          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

          // Encode as JPEG for efficient size and compatibility
          const optimizedDataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(optimizedDataUrl);
        } catch (err) {
          console.warn('Canvas optimization failed, using original base64', err);
          resolve(rawDataUrl);
        }
      };

      img.src = rawDataUrl;
    };

    reader.readAsDataURL(file);
  });
}
