import { useEffect, useRef } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  type ScrollViewInstance,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useEventForm } from "../../context/EventFormContext";
import { colors } from "../../theme/colors";
import { spacing } from "../../theme/spacing";
import { OutlineButton } from "../atoms/OutlineButton";
import { PrimaryButton } from "../atoms/PrimaryButton";
import { AlertBanner } from "../molecules/AlertBanner";
import { ScreenHeader } from "../molecules/ScreenHeader";
import { EventForm } from "../organisms/EventForm";
import { SuccessState } from "../organisms/SuccessState";

type Props = {
  onViewEvent: () => void;
};

export function CreateEventTemplate({ onViewEvent }: Props) {
  const insets = useSafeAreaInsets();
  const { status, attentionCount, failureNonce, submit, reset } = useEventForm();
  const scrollRef = useRef<ScrollViewInstance>(null);
  const success = status === "success";

  useEffect(() => {
    if (failureNonce === 0) return;
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  }, [failureNonce]);

  const clearForm = () => {
    reset();
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  };

  return (
    <View style={styles.canvas}>
      <View style={[styles.column, { paddingTop: insets.top }]}>
        <ScreenHeader
          title="Create event"
          leftLabel={success ? undefined : "Cancel"}
          onLeftPress={success ? undefined : clearForm}
        />
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView
            ref={scrollRef}
            key={success ? "success" : "form"}
            style={styles.flex}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.content}
          >
            {success ? (
              <SuccessState />
            ) : (
              <>
                {attentionCount > 0 ? <AlertBanner count={attentionCount} /> : null}
                <EventForm />
              </>
            )}
          </ScrollView>
          <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 12) }]}>
            {success ? (
              <>
                <PrimaryButton
                  label="View event"
                  onPress={onViewEvent}
                  testID="view-event"
                />
                <OutlineButton
                  label="Create another"
                  size="large"
                  onPress={reset}
                  accessibilityLabel="Create another event"
                  testID="create-another"
                />
              </>
            ) : (
              <PrimaryButton
                label={status === "submitting" ? "Creating..." : "Create event"}
                loading={status === "submitting"}
                onPress={submit}
                testID="create-event-submit"
              />
            )}
          </View>
        </KeyboardAvoidingView>
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
    overflow: "hidden",
  },
  flex: {
    flex: 1,
    minHeight: 0,
  },
  content: {
    paddingHorizontal: spacing.screen,
    paddingTop: spacing.lg,
    paddingBottom: 28,
  },
  footer: {
    paddingHorizontal: spacing.screen,
    paddingTop: 12,
    gap: 10,
    backgroundColor: colors.background,
    zIndex: 2,
  },
});
