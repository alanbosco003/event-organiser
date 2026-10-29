import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, View } from "react-native";

import { useEventForm } from "../../context/EventFormContext";
import { styles } from "../../styles/coverImageField";
import { colors } from "../../theme/colors";
import { imageMetaLabel } from "../../utils/formatFileSize";
import { imageIssueMessage } from "../../validation/imageFile";
import { FieldError } from "../atoms/FieldError";
import { OutlineButton } from "../atoms/OutlineButton";
import { AppText } from "../atoms/AppText";
import { FieldHeader } from "../molecules/FieldHeader";

export function CoverImageField() {
  const { values, errors, imageIssue, pickImage, removeImage, openSettings } = useEventForm();
  const image = values.image;
  const notice = image && imageIssue ? imageIssueMessage(imageIssue) : undefined;
  const message = errors.image ?? notice;
  const permission = !image && imageIssue?.kind === "permission";
  const rejectedType =
    !image && (imageIssue?.kind === "invalid-type" || imageIssue?.kind === "too-large");
  const missing = !image && Boolean(errors.image) && !permission;

  const actionLabel = image
    ? "Change"
    : permission
      ? "Try again"
      : rejectedType
        ? "Choose another file"
        : "Add image";

  return (
    <View>
      <FieldHeader label="Cover image" meta="required" />
      {image ? (
        <View>
          <Image
            source={{ uri: image.uri }}
            style={styles.preview}
            accessibilityLabel={`Selected cover image, ${image.name}`}
            accessibilityIgnoresInvertColors
          />
          <View style={styles.fileRow}>
            <AppText variant="hint" style={styles.fileName} numberOfLines={1}>
              {imageMetaLabel(image.name, image.size)}
            </AppText>
            <OutlineButton
              label="Change"
              onPress={pickImage}
              accessibilityLabel="Change cover image"
            />
            <OutlineButton
              label="Remove"
              tone="danger"
              onPress={removeImage}
              accessibilityLabel="Remove cover image"
            />
          </View>
        </View>
      ) : (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={actionLabel}
          onPress={pickImage}
          testID="cover-image-picker"
          style={[
            styles.empty,
            permission && styles.permission,
            (rejectedType || missing) && styles.rejected,
          ]}
        >
          <Ionicons name="image-outline" size={30} color={colors.iconMuted} />
          <AppText variant="hint" style={styles.emptyLabel}>
            No image selected
          </AppText>
          <View style={styles.fakeButton} pointerEvents="none">
            <AppText variant="button">{actionLabel}</AppText>
          </View>
        </Pressable>
      )}

      {!message && !image ? (
        <AppText variant="hint" style={styles.hint}>
          JPG, PNG or HEIC · up to 10 MB
        </AppText>
      ) : null}
      {message ? <FieldError message={message} /> : null}
      {imageIssue?.kind === "permission" ? (
        <Pressable
          accessibilityRole="link"
          accessibilityLabel="Open Settings"
          onPress={openSettings}
          style={styles.settings}
        >
          <AppText variant="button" style={styles.settingsLabel}>
            Open Settings
          </AppText>
        </Pressable>
      ) : null}
    </View>
  );
}
