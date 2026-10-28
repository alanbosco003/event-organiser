import { useRouter } from "expo-router";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { PrimaryButton } from "../components/atoms/PrimaryButton";
import { AppText } from "../components/atoms/AppText";
import { ScreenHeader } from "../components/molecules/ScreenHeader";
import { useEventForm } from "../context/EventFormContext";
import { communityName } from "../data/communities";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import { visibilityLabel } from "../utils/eventCopy";

export function EventDetailScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { payload } = useEventForm();

  const goBack = () => {
    if (router.canGoBack()) router.back();
    else router.replace("/");
  };

  return (
    <View style={styles.canvas}>
      <View style={[styles.column, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <ScreenHeader title="Event" leftLabel="Back" onLeftPress={goBack} />
        {!payload ? (
          <View style={styles.empty}>
            <AppText variant="body" style={styles.emptyCopy}>
              Create an event to see it here.
            </AppText>
            <PrimaryButton label="Back to the form" onPress={() => router.replace("/")} />
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.content}>
            <Image
              source={{ uri: payload.image.uri }}
              style={styles.image}
              accessibilityLabel={`Cover image, ${payload.image.name}`}
              accessibilityIgnoresInvertColors
            />
            <AppText variant="label" style={styles.title}>
              {payload.title}
            </AppText>
            <AppText variant="body">{payload.shortDescription}</AppText>
            <AppText variant="body" style={styles.full}>
              {payload.fullDescription}
            </AppText>
            <AppText variant="label" style={styles.section}>
              Visibility
            </AppText>
            <AppText variant="body">{visibilityLabel(payload.privacy)}</AppText>
            {payload.privacy === "public" ? (
              <>
                <AppText variant="label" style={styles.section}>
                  Communities
                </AppText>
                {(payload.communities ?? []).length === 0 ? (
                  <AppText variant="body">Visible to everyone</AppText>
                ) : (
                  payload.communities?.map((id) => (
                    <AppText key={id} variant="body">
                      {communityName(id)}
                    </AppText>
                  ))
                )}
              </>
            ) : (
              <>
                <AppText variant="label" style={styles.section}>
                  Invites
                </AppText>
                {payload.invites?.map((email) => (
                  <AppText key={email} variant="body">
                    {email}
                  </AppText>
                ))}
              </>
            )}
          </ScrollView>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
    backgroundColor: colors.canvas,
    alignItems: "center",
  },
  column: {
    flex: 1,
    width: "100%",
    maxWidth: 480,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.screen,
    paddingBottom: 32,
    gap: 6,
  },
  image: {
    height: 180,
    width: "100%",
    borderRadius: 12,
    backgroundColor: colors.preview,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    lineHeight: 30,
    marginBottom: 4,
  },
  full: {
    marginTop: 8,
  },
  section: {
    marginTop: 18,
  },
  empty: {
    flex: 1,
    padding: spacing.screen,
    justifyContent: "center",
    gap: 16,
  },
  emptyCopy: {
    textAlign: "center",
    color: colors.textSecondary,
  },
});
