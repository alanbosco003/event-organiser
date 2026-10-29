import { useEffect, useRef } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  type ScrollViewInstance,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useEventForm } from "../../context/EventFormContext";
import { styles } from "../../styles/createEventTemplate";
import { OutlineButton } from "../atoms/OutlineButton";
import { PrimaryButton } from "../atoms/PrimaryButton";
import { AlertBanner } from "../molecules/AlertBanner";
import { ScreenHeader } from "../molecules/ScreenHeader";
import { EventForm } from "../organisms/EventForm";
import { SubmittingState } from "../organisms/SubmittingState";
import { SuccessState } from "../organisms/SuccessState";

type Props = {
  onViewEvent: () => void;
};

export function CreateEventTemplate({ onViewEvent }: Props) {
  const insets = useSafeAreaInsets();
  const { status, attentionCount, failureNonce, submit, reset } = useEventForm();
  const scrollRef = useRef<ScrollViewInstance>(null);
  const success = status === "success";
  const submitting = status === "submitting";

  useEffect(() => {
    // A new nonce on every failed submit scrolls to the banner even when the error count is unchanged.
    if (failureNonce === 0) return;
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  }, [failureNonce]);

  return (
    <View style={styles.canvas}>
      <View style={[styles.column, { paddingTop: insets.top }]}>
        <ScreenHeader title="Create event" />
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView
            ref={scrollRef}
            // Remount when the screen changes so the creating state starts at the top.
            key={status}
            style={styles.flex}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={[styles.content, submitting && styles.submitting]}
          >
            {success ? (
              <SuccessState />
            ) : submitting ? (
              <SubmittingState />
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
