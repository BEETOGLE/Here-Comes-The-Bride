// Imgur Client ID - You'll need to register at https://api.imgur.com/oauth2/addclient
// For demo purposes, using a public client ID. In production, use your own.
const IMGUR_CLIENT_ID = 'c9a6efb3d7932fd';

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
      // Validate file
      if (!file.type.startsWith('image/')) {
        throw new Error('File must be an image');
      }

      // Create FormData
      const formData = new FormData();
      formData.append('image', file);
      formData.append('type', 'file');

      // Upload to Imgur
      const response = await fetch('https://api.imgur.com/3/image', {
        method: 'POST',
        headers: {
          'Authorization': `Client-ID ${IMGUR_CLIENT_ID}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.data?.error || 
          `Imgur upload failed: ${response.status} ${response.statusText}`
        );
      }

      const data: ImgurResponse = await response.json();

      if (!data.success || !data.data?.link) {
        throw new Error('Imgur upload failed: Invalid response');
      }

      console.log('Image uploaded to Imgur successfully:', data.data.link);
      return data.data.link;

    } catch (error) {
      console.error('Error uploading to Imgur:', error);
      throw error;
    }
  },

  /**
   * Validate image file before upload
   * @param file - The file to validate
   * @param maxSizeBytes - Maximum file size in bytes (default: 10MB)
   */
  validateImage: (file: File, maxSizeBytes: number = 10 * 1024 * 1024): void => {
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