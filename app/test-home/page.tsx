import { permanentRedirect } from "next/navigation"

// The /test-home design has been promoted to the main homepage (/).
// This route now permanently redirects to / so any old links keep working.
export default function TestHomePage() {
  permanentRedirect("/")
}
