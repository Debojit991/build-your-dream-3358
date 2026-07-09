import { test, expect } from '@playwright/test';

test.describe('Region Selection Modal', () => {
  test.beforeEach(async ({ context }) => {
    // Clear localStorage before each test
    await context.clearCookies();
  });

  test('modal correctly triggers on a fresh browser session', async ({ page }) => {
    // Navigate to landing page
    await page.goto('/');

    // Check if the modal is visible by checking its title
    const modalTitle = page.getByText('Where are you looking for a flat?');
    await expect(modalTitle).toBeVisible();

    // Check if Kolkata is rendered
    await expect(page.getByText('Popular Cities')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Kolkata' })).toBeVisible();
  });

  test('clicking Kolkata sets userRegion state', async ({ page }) => {
    await page.goto('/');

    const modalTitle = page.getByText('Where are you looking for a flat?');
    await expect(modalTitle).toBeVisible();

    // Click Kolkata
    await page.getByRole('button', { name: 'Kolkata' }).click();

    // Modal should close
    await expect(modalTitle).not.toBeVisible();

    // Header should update to Kolkata
    await expect(page.getByRole('button', { name: 'Kolkata' })).toBeVisible();
  });

  test('clicking any other city triggers toast and does not change region', async ({ page }) => {
    // Start on the page
    await page.goto('/');
    
    // Modal should be visible
    const modalTitle = page.getByText('Where are you looking for a flat?');
    await expect(modalTitle).toBeVisible();

    // Click Mumbai
    await page.getByRole('button', { name: 'Mumbai' }).click();

    // Toast should appear
    await expect(page.getByText('We are still expanding our services here!')).toBeVisible();

    // Modal should still be visible (not closed)
    await expect(modalTitle).toBeVisible();

    // Header should still have "Select your region"
    await page.keyboard.press('Escape'); // close modal to check header
    await expect(page.getByRole('button', { name: 'Select your region' })).toBeVisible();
  });

  test('validate the toggle functionality between "View All Cities" and "Hide all cities"', async ({ page }) => {
    // Start on the page
    await page.goto('/');

    // Check initial toggle state
    const toggleButton = page.getByRole('button', { name: 'View All Cities' });
    await expect(toggleButton).toBeVisible();

    // Other cities section shouldn't be visible yet
    await expect(page.getByText('Other Cities')).not.toBeVisible();

    // Click toggle
    await toggleButton.click();

    // Now it should say "Hide all cities"
    await expect(page.getByRole('button', { name: 'Hide all cities' })).toBeVisible();

    // Other cities should be visible
    await expect(page.getByText('Other Cities')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Pune' })).toBeVisible();

    // Click again to hide
    await page.getByRole('button', { name: 'Hide all cities' }).click();

    // Should revert back
    await expect(page.getByRole('button', { name: 'View All Cities' })).toBeVisible();
    await expect(page.getByText('Other Cities')).not.toBeVisible();
  });
});
