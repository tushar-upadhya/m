import { ComponentPropsWithoutRef } from "react";
import { Button } from "./ui/button";
import { LoadingIndicator } from "stream-chat-react";

interface ILoadingButtonProps extends ComponentPropsWithoutRef<"button"> {
  loading: boolean;
}

const LoadingButton = ({ loading, ...props }: ILoadingButtonProps) => {
  return (
    <div>
      <Button disabled={loading}>
        {loading ? <LoadingIndicator /> : props.children}
      </Button>
    </div>
  );
};

export default LoadingButton;
