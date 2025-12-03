import { Message } from "@/components/form-message";
import SignInForm from "../components/sign-in-form";

export default async function SignIn(props: { searchParams: Promise<Message> }) {
    const searchParams = await props.searchParams;
    return <SignInForm searchParams={searchParams} />;
}
