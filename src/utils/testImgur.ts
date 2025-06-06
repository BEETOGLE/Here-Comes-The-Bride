import { imgurService } from '../services/imgurService';

export const testImgurService = () => {
  console.log('🖼️ Testing Imgur Service');
  
  // Test file validation
  console.log('📝 Testing file validation...');
  
  try {
    // Test with invalid file size
    const largeFile = new File(['x'.repeat(11 * 1024 * 1024)], 'large.jpg', { type: 'image/jpeg' });
    imgurService.validateImage(largeFile);
    console.log('❌ Large file validation should have failed');
  } catch (error: any) {
    console.log('✅ Large file validation failed as expected:', error.message);
  }
  
  try {
    // Test with invalid file type
    const invalidFile = new File(['test'], 'test.txt', { type: 'text/plain' });
    imgurService.validateImage(invalidFile);
    console.log('❌ Invalid file type validation should have failed');
  } catch (error: any) {
    console.log('✅ Invalid file type validation failed as expected:', error.message);
  }
  
  try {
    // Test with valid file
    const validFile = new File(['valid image data'], 'test.jpg', { type: 'image/jpeg' });
    imgurService.validateImage(validFile);
    console.log('✅ Valid file validation passed');
  } catch (error: any) {
    console.log('❌ Valid file validation should have passed:', error.message);
  }
  
  console.log('🎉 Imgur service validation tests completed!');
  console.log('📤 To test actual upload, use the admin panel with a real image file.');
}; 