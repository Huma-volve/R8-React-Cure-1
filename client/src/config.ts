/**
 * Central Configuration for API URLs
 * 
 * This file automatically determines whether the app is running in Development or Production
 * and sets the API base URL accordingly.
 */

const isProduction = import.meta.env.PROD;

// In Production: Use the full backend URL
// In Development: Use empty string to let Vite Proxy handle the request
export const API_BASE_URL = isProduction
    ? 'https://round8-cure-php-team-two.huma-volve.com'
    : '';

// Helper for full URLs (like Google Redirects that might need absolute paths)
export const getFullApiUrl = (path: string) => {
    if (path.startsWith('http')) return path;

    // Clean slash to avoid double slashes
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${API_BASE_URL}${cleanPath}`;
};
