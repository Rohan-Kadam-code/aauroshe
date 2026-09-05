/**
 * Security Headers Configuration for AAUROSHE E-Commerce Platform
 * Complies with strict PCI-DSS & OWASP security rules
 */
export const SECURITY_HEADERS = {
  // Prevent clickjacking attacks
  "X-Frame-Options": "DENY",
  // Prevent MIME-type sniffing
  "X-Content-Type-Options": "nosniff",
  // XSS Auditor legacy support
  "X-XSS-Protection": "1; mode=block",
  // Referrer Policy
  "Referrer-Policy": "strict-origin-when-cross-origin",
  // Modern Permissions Policy
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(self 'https://api.razorpay.com')",
  // Strict Transport Security (1 year + subdomains)
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
  // Content Security Policy
  "Content-Security-Policy": [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://checkout.razorpay.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: https: https://images.unsplash.com https://cdn.razorpay.com",
    "connect-src 'self' https://api.razorpay.com https://lumberjack.razorpay.com",
    "frame-src 'self' https://api.razorpay.com",
  ].join("; "),
};
