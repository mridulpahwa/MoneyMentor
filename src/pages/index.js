// import Image from "next/image";
// import { Inter } from "next/font/google";

// const inter = Inter({ subsets: ["latin"] });
import { useAtomValue } from "jotai";
import Chart from "~/Chart";
import Info from "~/Info";
import { balanceAtom } from "~/atoms";

export default function Home() {
  const balance = useAtomValue(balanceAtom);

  return (
    <main className="mt-5 flex flex-col gap-4 items-center">
      <Info />

      <Chart />
    </main>
  );
}
