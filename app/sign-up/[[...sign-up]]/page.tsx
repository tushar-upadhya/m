import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <SignUp appearance={{ variables: { colorPrimary: "#3b82f6" } }} />
    </div>
  );
};

export default SignUpPage;
