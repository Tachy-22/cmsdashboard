import Link from "next/link";

export default function Home() {
  return (
    <main className="flex  flex-col items-center justify-between p-24  ">
      <p className="">
        {" "}
        This is the main landing page. Kindly navigate to the{" "}
        <Link color="primary" className="underline text-primary" href={`/dashboard`}>
          dashboard
        </Link>.
      </p>
    </main>
  );
}
