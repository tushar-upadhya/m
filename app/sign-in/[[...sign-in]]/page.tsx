import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <SignIn appearance={{ variables: { colorPrimary: "#3b82f6" } }} />
    </div>
  );
};

export default SignInPage;
