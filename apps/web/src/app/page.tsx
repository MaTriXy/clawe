import { redirect } from "next/navigation";

export default async function Home() {
  // const session = await getServerAuthSession();

  // if (false) {
  //   redirect("/login");
  // }

  redirect("/board");
}
