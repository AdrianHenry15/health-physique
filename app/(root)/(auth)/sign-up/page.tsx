import { Message } from "@/components/form-message"
import SignUpForm from "../components/sign-up-form"

export default async function SignUp(props: {
  searchParams: Promise<Message>
}) {
  const searchParams = await props.searchParams
  return <SignUpForm searchParams={searchParams} />
}
