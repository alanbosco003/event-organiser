import { useRouter } from "expo-router";

import { CreateEventTemplate } from "../components/templates/CreateEventTemplate";

export function CreateEventScreen() {
  const router = useRouter();

  return <CreateEventTemplate onViewEvent={() => router.push("/event")} />;
}
