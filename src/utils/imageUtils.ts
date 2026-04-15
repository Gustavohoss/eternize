
/**
 * Utility functions for image processing
 */

/**
 * Crop and resize an image to 1080x1259 pixels (aspect ratio ~0.857)
 * The crop will be centered, keeping the middle part of the image visible
 */
export const cropAndResizeImage = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();
    
    reader.onload = (e) => {
      img.onload = () => {
        // Target dimensions
        const targetWidth = 1080;
        const targetHeight = 1259;
        const targetRatio = targetWidth / targetHeight;
        
        // Original dimensions
        const originalWidth = img.width;
        const originalHeight = img.height;
        const originalRatio = originalWidth / originalHeight;
        
        // Calculate dimensions for centered crop
        let sourceX = 0;
        let sourceY = 0;
        let sourceWidth = originalWidth;
        let sourceHeight = originalHeight;
        
        if (originalRatio > targetRatio) {
          // Original image is wider than target - crop sides
          sourceWidth = originalHeight * targetRatio;
          sourceX = (originalWidth - sourceWidth) / 2;
        } else if (originalRatio < targetRatio) {
          // Original image is taller than target - crop top/bottom
          sourceHeight = originalWidth / targetRatio;
          sourceY = (originalHeight - sourceHeight) / 2;
        }
        
        // Create canvas for resizing
        const canvas = document.createElement('canvas');
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext('2d');
        
        if (ctx) {
          // Draw the cropped image on canvas
          ctx.drawImage(
            img,
            sourceX, sourceY, sourceWidth, sourceHeight,
            0, 0, targetWidth, targetHeight
          );
          
          // Convert to data URL
          const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
          resolve(dataUrl);
        } else {
          reject(new Error('Failed to get canvas context'));
        }
      };
      
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
      
      img.src = e.target?.result as string;
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsDataURL(file);
  });
};

/**
 * Convert a data URL to a File object
 */
export const dataURLToFile = (dataURL: string, filename: string): File => {
  const arr = dataURL.split(',');
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};
