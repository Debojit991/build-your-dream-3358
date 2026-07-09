import { test, expect } from '@playwright/test';

test.describe('Public Landing Page', () => {
  test('Client Reviews section renders correctly with at least 3 cards', async ({ page }) => {
    await page.goto('/');
    
    // Wait for the reviews section to be visible
    const reviewsHeading = page.getByRole('heading', { name: 'What our users say' });
    await expect(reviewsHeading).toBeVisible();
    
    // Find the section containing the reviews
    const reviewsSection = page.locator('section').filter({ hasText: 'What our users say' });
    
    // Ensure there are at least 3 review cards (we hardcoded 3 mock reviews)
    const reviewCards = reviewsSection.locator('.bg-white.rounded-2xl.shadow-md');
    await expect(reviewCards).toHaveCount(3);
    
    // Verify specific content inside the cards based on mock data preferences
    await expect(reviewsSection.getByText('Arijit M.')).toBeVisible();
    await expect(reviewsSection.getByText('Sneha D.')).toBeVisible();
    await expect(reviewsSection.getByText('Rahul K.')).toBeVisible();
    
    // Ensure tags are present
    await expect(reviewsSection.getByText('Salaried Professional in New Town')).toBeVisible();
    await expect(reviewsSection.getByText('Student near Jadavpur')).toBeVisible();
  });
});
