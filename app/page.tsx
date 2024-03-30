import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="mb-1 text-6xl font-extrabold  text-blue-500">Chat</h1>
      <p className="mb-10">The coolest chat app on the planet</p>

      <Link href={"/chat"}>
        <Button>Room</Button>
      </Link>
    </div>
  );
}

// 3 44
