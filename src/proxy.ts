import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import getOrCreateDB from './models/server/dbsetup'
import getOrCreateStorage from './models/server/storage.Setup'

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  await Promise.all([
    getOrCreateDB(),
    getOrCreateStorage()
  ])

  return NextResponse.next() // after performing all the middleware tasks we are passing the control to the next middleware or whatever that is supposed to happen after this middleware

}
 
// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }
 
//  whatever path that you will define in this matcher the middleware (proxy) will run on that path and if you do not define any path in the matcher the nextjs will by default run the middleware on all the paths 
export const config = {
  // match all request paths execept for the ones that starts with:
  // api, _next/static, _next/image, favicon.ico
  // for now we are only matching this route only to test if the database is successfully created or not, so to run this middleware you have to run this particular api route
  matcher: ['/test-db'],
}