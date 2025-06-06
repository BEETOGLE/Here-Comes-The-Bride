// Imgur Client ID from environment variables
// This is safe to expose in frontend as Imgur allows public client usage
const IMGUR_CLIENT_ID = process.env.REACT_APP_IMGUR_CLIENT_ID || 'c9a6efb3d7932fd';

if (!process.env.REACT_APP_IMGUR_CLIENT_ID) {
  console.warn('REACT_APP_IMGUR_CLIENT_ID not found in environment variables, using fallback');
}

interface ImgurResponse {
  data: {
    id: string;
    title: string | null;
    description: string | null;
    datetime: number;
    type: string;
    animated: boolean;
    width: number;
    height: number;
    size: number;
    views: number;
    bandwidth: number;
    vote: string | null;
    favorite: boolean;
    nsfw: boolean | null;
    section: string | null;
    account_url: string | null;
    account_id: number | null;
    is_ad: boolean;
    in_most_viral: boolean;
    has_sound: boolean;
    tags: string[];
    ad_type: number;
    ad_url: string;
    edited: string;
    in_gallery: boolean;
    deletehash: string;
    name: string;
    link: string; // This is what we need!
  };
  success: boolean;
  status: number;
}

export const imgurService = {
  /**
   * Upload an image file to Imgur
   * @param file - The image file to upload
   * @returns Promise<string> - The Imgur image URL
   */
  uploadImage: async (file: File): Promise<string> => {
    try {
      // Validate file before upload
      imgurService.validateImage(file);

      // Create FormData
      const formData = new FormData();
      formData.append('image', file);
      formData.append('type', 'file');

      // Upload to Imgur with proper authorization
      const response = await fetch('https://api.imgur.com/3/image', {
        method: 'POST',
        headers: {
          'Authorization': `Client-ID ${IMGUR_CLIENT_ID}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const errorMessage = errorData?.data?.error || `Upload failed: ${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
      }

      const data: ImgurResponse = await response.json();

      if (!data.success || !data.data?.link) {
        throw new Error('Upload failed: Invalid response from Imgur');
      }

      console.log('✅ Image uploaded to Imgur successfully:', data.data.link);
      return data.data.link;

    } catch (error) {
      console.error('❌ Error uploading to Imgur:', error);
      throw error;
    }
  },

  /**
   * Validate image file before upload
   * @param file - The file to validate
   * @param maxSizeBytes - Maximum file size in bytes (default: 10MB)
   */
  validateImage: (file: File, maxSizeBytes: number = 10 * 1024 * 1024): void => {
    if (!file) {
      throw new Error('No file selected');
    }

    if (!file.type.startsWith('image/')) {
      throw new Error('File must be an image');
    }

    if (file.size > maxSizeBytes) {
      const maxSizeMB = maxSizeBytes / (1024 * 1024);
      throw new Error(`Image size must be less than ${maxSizeMB}MB`);
    }

    // Check for supported formats
    const supportedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!supportedTypes.includes(file.type)) {
      throw new Error('Supported formats: JPEG, PNG, GIF, WebP');
    }
  }
}; 