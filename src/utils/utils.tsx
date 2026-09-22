import { MessageType, showMessage } from 'react-native-flash-message';

export function showSnackbar(
  msg: string,
  type: MessageType | undefined = 'default',
  delay?: number,
) {
  if (msg.length > 0) {
    showMessage({
      message: msg,
      type: type,
      floating: true,
      ...(delay ? { duration: delay } : {}),
      titleProps: {
        allowFontScaling: false,
      },
    });
  }
}
