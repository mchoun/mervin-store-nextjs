'use client'

import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import { ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode }) {
  const initialOptions = {
    clientId: 'test',
    currency: 'USD',
    intent: 'capture',
  }
  return (
    <PayPalScriptProvider options={initialOptions}>
      {children}
    </PayPalScriptProvider>
  )
}
