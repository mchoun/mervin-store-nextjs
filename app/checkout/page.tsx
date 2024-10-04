import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
export default function Page() {
  const initialOptions = {
    clientId: 'test',
    currency: 'USD',
    intent: 'capture',
  }
  return (
    <>
      <p>Checkout Page</p>
      {/* <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons />
      </PayPalScriptProvider> */}
    </>
  )
}
