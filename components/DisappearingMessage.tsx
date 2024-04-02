import { useEffect, useState } from "react";

interface IDisappearingMessageProps {
  children: React.ReactNode;
  duration?: number;
  className?: string;
}

const DisappearingMessage = ({
  children,
  className,
  duration = 500,
}: IDisappearingMessageProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeOut = setTimeout(() => setVisible(false), duration);

    return () => clearTimeout(timeOut);
  }, [duration]);

  return (
    <div
      className={`${visible ? "opacity-100" : "opacity-0"} w-max transition-opacity duration-500 ${className}`}
    >
      {children}
    </div>
  );
};

export default DisappearingMessage;
