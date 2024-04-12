import { Dashboard } from "@pages/dashboard";

export default function DashboardPage() {
  // React.useEffect(() => {
  //   const getUser = async () => {
  //     try {
  //       const request = await fetch("/api/twitter-user?user=kafLamed");

  //       const res = await request.json()
  //       console.log(res)
  //     } catch (error) {
  //       console.log("error", error);
  //     }
  //   };

  //   getUser();
  // }, []);

  return <Dashboard />;
}
