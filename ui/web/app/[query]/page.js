import Index from "@/app/_grid";

export const runtime = "edge";

export default async function Page({ params }) {
  const id =
    "0x" +
    Date.now().toString(16) +
    Math.floor(Math.random() * 0xffff)
      .toString(16)
      .padStart(4, "0");

  console.log(id);
  console.log(params.query);
  await fetch("https://trigger.cyberneticstream.workers.dev", {
    method: "POST",
    body: JSON.stringify({
      q: params.query,
      query: id,
    }),
  });

  return (
    <>
      <Index query={false ? "0x18c986a3e3053ca" : id} />
    </>
  );
}
