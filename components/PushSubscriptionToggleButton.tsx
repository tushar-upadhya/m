import {
  getCurrentPushSubscription,
  registerPushNotification,
  unRegisterPushNotification,
} from "@/app/notifications/pushService";
import { BellOff, BellRing } from "lucide-react";
import { useEffect, useState } from "react";

const PushSubscriptionToggleButton = () => {
  const [hasActivePushSubscription, setHasActivePushSubscription] =
    useState<boolean>();

  const [loading, setLoading] = useState(false);

  const [confirmationMessage, setConfirmationMessage] = useState<string>();

  useEffect(() => {
    async function getActivePushSubscription() {
      const subscription = await getCurrentPushSubscription();
      setHasActivePushSubscription(!!subscription);
    }
    getActivePushSubscription();
  }, []);

  async function setPushNotificationsEnabled(enabled: boolean) {
    if (loading) return;
    setLoading(true);
    setConfirmationMessage(undefined);

    try {
      if (enabled) {
        await registerPushNotification();
      } else {
        await unRegisterPushNotification();
      }
      setConfirmationMessage(
        "Push notifications " + (enabled ? "enabled" : "disabled"),
      );
      setHasActivePushSubscription(enabled);
    } catch (error) {
      console.error(error);
      if (enabled && Notification.permission === "denied") {
        alert("Please enable push notifications in your browser settings");
      } else {
        alert("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  if (hasActivePushSubscription === undefined) return null;
  return (
    <div>
      {hasActivePushSubscription ? (
        <span title="Disable push notifications on tis device">
          <BellOff
            onClick={() => setPushNotificationsEnabled(false)}
            className="cursor-pointer"
          />
        </span>
      ) : (
        <span title="Enable push notifications on this device">
          <BellRing
            onClick={() => setPushNotificationsEnabled(true)}
            className="cursor-pointer"
          />
        </span>
      )}
    </div>
  );
};

export default PushSubscriptionToggleButton;
