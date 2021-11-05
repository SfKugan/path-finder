export const PUSH_NOTIFICATION = "NOTIFICATION@PUSH_NOTIFICATION";
export const TRY_NOTIFY = "NOTIFICATION@TRY_NOTOFY";
export const REMOVE_NOTIFICATION = "NOTIFICATION@REMOVE_NOTIFICATION";

export const pushNotification = message => ({ type: PUSH_NOTIFICATION, payload: message })
export const tryNotify = message => ({ type: TRY_NOTIFY, payload: message })
export const removeNotification = key => ({ type: REMOVE_NOTIFICATION, payload: key })