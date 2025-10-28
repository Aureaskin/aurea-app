// app/api/subscribe/route.ts (Improved version)
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { email } = await request.json()

  if (!process.env.MAILERLITE_API_KEY) {
    return NextResponse.json(
      { error: 'MailerLite configuration missing' },
      { status: 500 }
    )
  }

  try {
    // First, check if subscriber already exists in the group
    const checkResponse = await fetch(
      `https://api.mailerlite.com/api/v2/subscribers/${encodeURIComponent(email)}`,
      {
        headers: {
          'X-MailerLite-ApiKey': process.env.MAILERLITE_API_KEY,
        },
      }
    )

    // If subscriber exists, return error
    if (checkResponse.status === 200) {
      return NextResponse.json(
        { error: 'This email is already subscribed to our waitlist!' },
        { status: 400 }
      )
    }

    // If subscriber doesn't exist, add them
    const addResponse = await fetch(
      'https://api.mailerlite.com/api/v2/subscribers',
      {
        method: 'POST',
        headers: {
          'X-MailerLite-ApiKey': process.env.MAILERLITE_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          groups: [process.env.MAILERLITE_GROUP_ID]
        }),
      }
    )

    if (!addResponse.ok) {
      const errorData = await addResponse.json()
      throw new Error(errorData.error?.message || 'Failed to subscribe')
    }

    return NextResponse.json({ 
      success: true,
      message: 'Thank you for joining our waitlist!'
    })

  } catch (error) {
    console.error('Subscription error:', error)
    return NextResponse.json(
      { error: 'There was an error subscribing. Please try again.' },
      { status: 500 }
    )
  }
}

// import { NextResponse } from 'next/server'

// export async function POST(request: Request) {
//   const { email } = await request.json()

//   if (!process.env.MAILERLITE_API_KEY) {
//     return NextResponse.json(
//       { error: 'MailerLite configuration missing' },
//       { status: 500 }
//     )
//   }

//   try {
//     const response = await fetch(
//       'https://api.mailerlite.com/api/v2/subscribers',
//       {
//         method: 'POST',
//         headers: {
//           'X-MailerLite-ApiKey': process.env.MAILERLITE_API_KEY,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email: email,
//           groups: [process.env.MAILERLITE_GROUP_ID] 
//         }),
//       }
//     )

//     const data = await response.json()

//     if (!response.ok) {
//       // MailerLite returns error in data.error if email exists
//       if (data.error && data.error.email) {
//         return NextResponse.json(
//           { error: 'This email is already subscribed to our waitlist!' },
//           { status: 400 }
//         )
//       }
//       throw new Error(data.error?.message || 'Failed to subscribe')
//     }

//     return NextResponse.json({ success: true })
//   } catch (error) {
//     console.error('Subscription error:', error)
//     return NextResponse.json(
//       { error: 'Failed to subscribe. Please try again.' },
//       { status: 500 }
//     )
//   }
// }
