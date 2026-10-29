import type { EventFormState } from "../state/eventFormState";
import type { Privacy } from "../types/event";

export function useFormFields(state: EventFormState) {
  const setTitle = (title: string) => {
    state.patchValues({ title });
  };

  const setShortDescription = (shortDescription: string) => {
    state.patchValues({ shortDescription });
  };

  const setFullDescription = (fullDescription: string) => {
    state.patchValues({ fullDescription });
  };

  // Communities and invites stay put, so switching back restores the other draft.
  const setPrivacy = (privacy: Privacy) => {
    state.patchValues({ privacy });
  };

  const toggleCommunity = (id: string) => {
    state.setValues((current) => ({
      ...current,
      communityIds: toggleId(current.communityIds, id),
    }));
  };

  return {
    setTitle,
    setShortDescription,
    setFullDescription,
    setPrivacy,
    toggleCommunity,
  };
}

function toggleId(ids: string[], id: string): string[] {
  if (ids.includes(id)) return ids.filter((item) => item !== id);
  return [...ids, id];
}
