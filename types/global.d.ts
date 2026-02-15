export {};

declare global {
    var Paytm:
        | {
              CheckoutJS: {
                  init: (config: any) => Promise<void>;
                  invoke: () => void;
              };
          }
        | undefined;
}
