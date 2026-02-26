import path from 'path';
import { test } from '../../fixtures/portfolio-fixtures';
import { TheInternetUploadPage } from '../../pages/the-internet/upload-page';

test.describe('The Internet - File Upload @ui @smoke', () => {
  test('uploads a file', async ({ page, siteUrls }) => {
    const uploadPage = new TheInternetUploadPage(page, siteUrls.theInternet);
    const filePath = path.resolve(process.cwd(), 'tests', 'data', 'files', 'upload.txt');

    await uploadPage.goto();
    await uploadPage.uploadFile(filePath);
    await uploadPage.expectUploadedFileName('upload.txt');
  });
});
