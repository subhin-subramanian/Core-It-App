export {};

declare global {
  interface Window {
    Razorpay: any; // or RazorpayOptions if you want full typing later
  }
}