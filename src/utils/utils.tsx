import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import relativeTime from 'dayjs/plugin/relativeTime'; // Import plugin
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { Linking } from 'react-native';
import { MessageType, showMessage } from 'react-native-flash-message';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime); // Extend dayjs with relativeTime
dayjs.extend(isSameOrBefore);
dayjs.extend(customParseFormat);

// ======================== date format START ==========================
export const formatDate = ({
  date,
  parseFormat = '',
  returnFormat = 'MMM DD, YYYY',
}: {
  date: string | Date;
  parseFormat?: string;
  returnFormat?: string;
}): string => {
  dayjs.extend(customParseFormat);
  const parsedDate = parseFormat ? dayjs(date, parseFormat) : dayjs(date);
  return parsedDate.isValid() ? parsedDate.format(returnFormat) : '';
};

// ======================== date format END ==========================

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

// ======================= link opening handling - START =============================
export const openLink = async (url: string) => {
  try {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      showSnackbar('Invalid or unavailable link', 'danger');
    }
  } catch (error) {
    showSnackbar('Invalid or unavailable link', 'danger');
  }
};
// ======================= link opening handling - END =============================
