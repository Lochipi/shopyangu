import { Button } from "@mantine/core";
import Link from "next/link";

const Home = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-white">
      <Button component={Link} href="/hello">
        Next link button
      </Button>
    </main>
  );
};

export default Home;
