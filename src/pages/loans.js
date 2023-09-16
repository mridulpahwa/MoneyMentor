// const inter = Inter({ subsets: ["latin"] });
import { useAtomValue } from "jotai";
import LoanProgress from "~/LoanProgress";
import { loansAtom } from "~/atoms";

export default function Home() {
  const loans = useAtomValue(loansAtom);

  return (
    <main className="mt-5 flex flex-col gap-4 items-center justify-stretch w-full">
      {...loans.map((loan) => <LoanProgress {...loan} />)}
    </main>
  );
}
