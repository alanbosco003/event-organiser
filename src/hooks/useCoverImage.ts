import { Linking } from "react-native";

import { pickCoverImage } from "../services/pickCoverImage";
import type { EventFormState } from "../state/eventFormState";

export function useCoverImage(state: EventFormState) {
  const pickImage = async () => {
    const result = await pickCoverImage();

    if (result.type === "canceled") return;

    if (result.type === "permission") {
      state.setImageIssue({ kind: "permission" });
      return;
    }

    if (result.type === "rejected") {
      state.setImageIssue(result.issue);
      return;
    }

    state.setImageIssue(null);
    state.patchValues({ image: result.image });
  };

  const removeImage = () => {
    state.setImageIssue(null);
    state.patchValues({ image: null });
  };

  const openSettings = () => {
    Linking.openSettings().catch(() => undefined);
  };

  return { pickImage, removeImage, openSettings };
}
