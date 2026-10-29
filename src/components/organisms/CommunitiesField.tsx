import { View } from "react-native";

import { useEventForm } from "../../context/EventFormContext";
import { COMMUNITIES } from "../../data/communities";
import { styles } from "../../styles/communitiesField";
import { AppText } from "../atoms/AppText";
import { CommunityRow } from "../molecules/CommunityRow";
import { FieldHeader } from "../molecules/FieldHeader";

export function CommunitiesField() {
  const { values, toggleCommunity } = useEventForm();
  const selected = values.communityIds.length;

  return (
    <View>
      <FieldHeader label="Communities" meta="optional" />
      <View style={styles.card}>
        <AppText variant="hint">
          Post to selected communities. Leave all unticked and the event is visible to everyone.
        </AppText>
        <View style={styles.list}>
          {COMMUNITIES.map((community, index) => (
            <CommunityRow
              key={community.id}
              name={community.name}
              members={community.members.toLocaleString("en-US")}
              checked={values.communityIds.includes(community.id)}
              last={index === COMMUNITIES.length - 1 && selected === 0}
              onPress={() => toggleCommunity(community.id)}
            />
          ))}
        </View>
        {selected > 0 ? (
          <AppText variant="button" style={styles.selected}>
            {selected} selected
          </AppText>
        ) : null}
      </View>
    </View>
  );
}
