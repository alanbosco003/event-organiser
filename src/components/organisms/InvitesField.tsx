import { View } from "react-native";

import { useEventForm } from "../../context/EventFormContext";
import { SAVED_CONTACTS } from "../../data/savedContacts";
import { styles } from "../../styles/invitesField";
import { LIMITS } from "../../validation/limits";
import { hasInvite } from "../../validation/email";
import { FieldError } from "../atoms/FieldError";
import { OutlineButton } from "../atoms/OutlineButton";
import { TextField } from "../atoms/TextField";
import { AppText } from "../atoms/AppText";
import { FieldHeader } from "../molecules/FieldHeader";
import { InviteChip } from "../molecules/InviteChip";
import { SavedContactRow } from "../molecules/SavedContactRow";

export function InvitesField() {
  const {
    values,
    errors,
    inviteDraft,
    setInviteDraft,
    addInviteDraft,
    addSavedContact,
    removeInvite,
  } = useEventForm();

  return (
    <View>
      <FieldHeader label="Invite people" meta="at least 1" />
      <View style={styles.composer}>
        <View style={styles.input}>
          <TextField
            value={inviteDraft}
            onChangeText={setInviteDraft}
            placeholder="name@email.com"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            autoComplete="email"
            inputMode="email"
            error={Boolean(errors.invites)}
            accessibilityLabel="Invite email"
            accessibilityHint="Paste several emails separated by commas or new lines."
            testID="invite-input"
            onSubmitEditing={addInviteDraft}
            returnKeyType="done"
          />
        </View>
        <OutlineButton
          label="Add"
          onPress={addInviteDraft}
          accessibilityLabel="Add invite"
          testID="invite-add"
        />
      </View>
      {errors.invites ? <FieldError message={errors.invites} /> : null}
      <AppText variant="hint" style={styles.tip}>
        Tip: paste several emails at once, separated by commas or new lines. Duplicates are
        removed.
      </AppText>
      {values.invites.length > 0 ? (
        <View style={styles.chips}>
          {values.invites.map((email) => (
            <InviteChip key={email} email={email} onRemove={() => removeInvite(email)} />
          ))}
          <AppText variant="hint">
            {values.invites.length} of {LIMITS.invites.max} invites
          </AppText>
        </View>
      ) : null}
      <AppText variant="label" style={styles.savedTitle}>
        Saved contacts
      </AppText>
      {SAVED_CONTACTS.map((contact) => (
        <SavedContactRow
          key={contact.id}
          name={contact.name}
          email={contact.email}
          added={hasInvite(values.invites, contact.email)}
          onAdd={() => addSavedContact(contact.email)}
        />
      ))}
    </View>
  );
}
