import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center">
        <h1 className="text-5xl font-bold">Hello, world!</h1>
        <p className="text-lg mt-4">This is a Next.js app with SWA!</p>
      </div>
    </main>
  );
}
