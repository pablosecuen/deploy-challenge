import { SignUp } from "@clerk/nextjs";
import "./sing-up.css";
export default function Page() {
  return (
    <div className="h-screen w-screen grid place-content-center">
      <SignUp />
    </div>
  );
}
