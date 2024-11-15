import {
  CheckoutPaymentIntent,
  Client,
  OrdersController,
  type Order,
} from '@paypal/paypal-server-sdk'
import { ApiError } from 'next/dist/server/api-utils'

const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env

function createPayPalClient() {
  let client
  if (PAYPAL_CLIENT_ID && PAYPAL_CLIENT_SECRET) {
    client = new Client({
      clientCredentialsAuthCredentials: {
        oAuthClientId: PAYPAL_CLIENT_ID,
        oAuthClientSecret: PAYPAL_CLIENT_SECRET,
      },
    })
  }
  if (client) {
    return client
  } else {
    throw new Error('Unable to create PayPal Client')
  }
}
const payPalClient = createPayPalClient()
const ordersController = new OrdersController(payPalClient)

async function createOrder(): Promise<
  | {
      jsonResponse: Order
      httpStatusCode: number
    }
  | undefined
> {
  const orderRequest = {
    body: {
      intent: CheckoutPaymentIntent.CAPTURE,
      purchaseUnits: [
        {
          amount: {
            currencyCode: 'USD',
            value: '100.00',
          },
        },
      ],
    },
    prefer: 'return=minimal',
    paymentSource: {
      paypal: {
        experienceContext: {
          shippingPreference: 'GET_FROM_FILE',
        },
      },
    },
  }

  try {
    const { body, ...httpResponse } = await ordersController.ordersCreate(
      orderRequest
    )
    return {
      //@ts-expect-error need to figure out how to handle blobs and readable streams
      jsonResponse: JSON.parse(body),
      httpStatusCode: httpResponse.statusCode,
    }
  } catch (error) {
    if (error instanceof ApiError) {
      throw new Error(error.message)
    }
  }
}

export async function GET() {
  try {
    const { jsonResponse, httpStatusCode } = await createOrder()
    return Response.json({ jsonResponse, httpStatusCode })
  } catch (err) {
    console.error('Failed to create order:', err)
    return Response.error()
  }
}
