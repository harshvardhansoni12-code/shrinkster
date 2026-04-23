import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <input placeholder="link" className="bg-white text-black p-1 m-1" />
      <button>shrink</button>
    </div>
  );
}
