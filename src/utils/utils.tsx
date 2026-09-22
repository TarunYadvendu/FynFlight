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

// ======================= fyn ticket extracter- START =============================

export const ticketNumberExtracter = (allTickets: string) => {
  const arrayOfTickets = allTickets.split(',');

  return arrayOfTickets.map((item, index) => {
    let seprator = item.split('/');
    return { text: seprator[seprator.length - 1], link: item };
  });
};

// ======================= fyn ticket extracter- END =============================

// ======================= fyn Assiny Name- START =============================

export const assignedNameExtracter = (allNames: string) => {
  return allNames.split(',').map(name => {
    const parts = name.trim().split(/\s+/);

    if (parts.length === 1) {
      return parts[0];
    }

    return `${parts[0]} ${parts[parts.length - 1][0]}.`;
  });
};

// ======================= fyn Assiny Name- END =============================
