import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

import { useEventForm } from "../../context/EventFormContext";
import { colors } from "../../theme/colors";
import {
  communityCountLabel,
  inviteCountLabel,
  successMessage,
  visibilityLabel,
} from "../../utils/eventCopy";
import { AppText } from "../atoms/AppText";
import { KeyValueRow } from "../molecules/KeyValueRow";

export function SuccessState() {
  const { payload } = useEventForm();
  if (!payload) return null;

  const audience =
    payload.privacy === "private"
      ? { label: "Invites", value: inviteCountLabel(payload.invites?.length ?? 0) }
      : { label: "Communities", value: communityCountLabel(payload.communities?.length ?? 0) };

  return (
    <View style={styles.wrap}>
      <View style={styles.badge} accessibilityRole="image" accessibilityLabel="Success">
        <Ionicons name="checkmark" size={36} color={colors.success} />
      </View>
      <AppText variant="label" style={styles.title}>
        Event created
      </AppText>
      <AppText variant="body" style={styles.message}>
        {successMessage(payload)}
      </AppText>
      <View style={styles.rows}>
        <KeyValueRow label="Visibility" value={visibilityLabel(payload.privacy)} />
        <KeyValueRow label={audience.label} value={audience.value} />
        <KeyValueRow label="Cover image" value={payload.image.name} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    paddingTop: 36,
  },
  badge: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.successSoft,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginTop: 18,
    fontSize: 28,
    lineHeight: 34,
  },
  message: {
    marginTop: 8,
    textAlign: "center",
    color: colors.textSecondary,
  },
  rows: {
    alignSelf: "stretch",
    marginTop: 28,
  },
});
