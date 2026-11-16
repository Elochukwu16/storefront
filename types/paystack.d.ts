type PaystackSetupOptions = {
  key: string;
  email: string;
  amount: number; // in kobo
  currency?: string;
  ref?: string;
  callback: (response: { reference: string; status: string }) => void;
  onClose: () => void;
};

interface Window {
  PaystackPop?: {
    setup: (options: PaystackSetupOptions) => { openIframe: () => void };
  };
}
