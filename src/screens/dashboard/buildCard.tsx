import { Divider } from '@/components/common';
import { CustomImage, CustomText, Shadow, Tap } from '@/components/custom';
import { ImageType } from '@/components/custom/customImage/customImage';
import { TextVariants } from '@/components/custom/customText/customText';
import { MobileAppsModel } from '@/services/models';
import { Images } from '@/theme/assets/images';
import { CustomTheme, useTheme } from '@/theme/themeProvider/paperTheme';
import {
  assignedNameExtracter,
  formatDate,
  openLink,
  ticketNumberExtracter,
} from '@/utils/utils';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

type BuildCardProps = {
  cardItem: MobileAppsModel;
  regenarate: (id: string) => void;
  regenLoading?: string;
};

export const BuildCard = ({ cardItem, ...props }: BuildCardProps) => {
  /** to get the default theme of app */
  const theme = useTheme();

  /** theme integration in styles */
  const styles = makeStyle(theme);

  /** handling regenrate and iunstallation */
  const handlePress = async () => {
    if (cardItem.linkAvailable) {
      await openLink(cardItem.link);
    } else {
      props.regenarate(cardItem.id);
    }
  };

  /** ticket number */
  const extractedTickets = ticketNumberExtracter(cardItem.ticketNumber);

  /** assigned contacts */
  const assignedUsers = assignedNameExtracter(cardItem.assignTo);

  /**date format */
  const formattedDate = formatDate({
    date: cardItem.createdAt,
    returnFormat: 'MMM DD',
  });

  return (
    <Shadow style={styles.container}>
      <View style={styles.header}>
        <View
          style={[
            styles.logoContainer,
            {
              backgroundColor: cardItem.isIos
                ? theme.colors.iosBurg
                : theme.colors.androidBg,
            },
          ]}
        >
          <CustomImage
            color={theme.colors.onDark}
            source={cardItem.isIos ? Images.ios : Images.android}
            style={styles.avatar}
            type={ImageType.svg}
          />
        </View>

        <View style={styles.titleView}>
          <CustomText style={styles.appName} maxLines={1}>
            {cardItem.appName}
          </CustomText>
          <View style={styles.ticketContainer}>
            {cardItem.assignTo ? (
              assignedUsers.map((item, index) => {
                return (
                  <CustomText
                    key={index}
                    color={theme.colors.labelLight}
                    style={{
                      // textDecorationStyle: 'dashed',
                      textDecorationLine: 'underline',
                    }}
                  >
                    {`${item}${assignedUsers.length - 1 !== index ? ',' : ''}`}
                  </CustomText>
                );
              })
            ) : (
              <CustomText color={theme.colors.labelLight}>
                {'No Contact Assigned'}
              </CustomText>
            )}
          </View>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.versions}>
          <CustomText>{`Version ${cardItem.version || '-'}`}</CustomText>
          <CustomText color={theme.colors.labelLight}>{`•`}</CustomText>
          <CustomText>{`Build ${cardItem.buildVersion || '-'}`}</CustomText>
          <CustomText color={theme.colors.labelLight}>{`•`}</CustomText>
          <CustomText>{formattedDate}</CustomText>
        </View>
        <CustomText
          variant={TextVariants.titleSmall}
          color={theme.colors.labelLight}
        >
          {cardItem.note || '-'}
        </CustomText>
      </View>

      <Divider />

      <View style={styles.footer}>
        <View style={styles.footerInfo}>
          {cardItem.ticketNumber ? (
            <View style={styles.ticketContainer}>
              {extractedTickets.map(item => {
                return (
                  <Tap
                    onPress={async () => {
                      openLink(item.link);
                    }}
                    containerStyle={styles.ticketTap}
                    style={styles.ticketChipContainer}
                  >
                    <CustomImage source={Images.link} style={styles.link} />
                    <CustomText variant={TextVariants.bodySmall}>
                      {item.text}
                    </CustomText>
                  </Tap>
                );
              })}
            </View>
          ) : (
            <CustomText>{'-'}</CustomText>
          )}
        </View>

        <Tap
          onPress={handlePress}
          containerStyle={[
            styles.tapContainer,
            {
              backgroundColor: cardItem.linkAvailable
                ? theme.colors.primary
                : theme.colors.danger,
            },
          ]}
          style={styles.tap}
        >
          {props.regenLoading === cardItem.id ? (
            <ActivityIndicator size={20} color={theme.colors.onPrimary} />
          ) : (
            <CustomImage
              source={cardItem.linkAvailable ? Images.install : Images.refresh}
              color={theme.colors.onPrimary}
              style={styles.installImg}
            />
          )}
          <CustomText color={theme.colors.onPrimary}>
            {cardItem.linkAvailable ? 'Install' : 'Regenrate'}
          </CustomText>
        </Tap>
      </View>
    </Shadow>
  );
};

const makeStyle = (theme: CustomTheme) =>
  StyleSheet.create({
    flex: {
      flex: 1,
    },
    avatar: {
      height: 30,
      width: 30,
    },
    container: {
      marginHorizontal: 20,
      marginVertical: 8,
      flex: 1,
      backgroundColor: theme.colors.surface,
    },
    main: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      gap: 15,
      flex: 1,
    },
    logoContainer: {
      width: 60,
      height: 60,
      borderRadius: theme.extraRoundness,
      justifyContent: 'center',
      alignItems: 'center',
    },
    titleView: {
      flex: 1,
      minWidth: 0,
      gap: 3,
      justifyContent: 'space-around',
    },
    appName: {
      // marginLeft: 3,
    },
    contentContainer: {
      flex: 1,
      marginVertical: 15,
      marginHorizontal: 10,
    },
    versions: {
      flex: 1,
      flexDirection: 'row',
      gap: 8,
    },
    footer: {
      flex: 1,
      marginVertical: 15,
      marginHorizontal: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
      // alignItems: 'flex-end',
    },
    footerInfo: {
      flex: 1,
    },
    ticketContainer: {
      flexWrap: 'wrap',
      flexDirection: 'row',
      gap: 6,
    },
    ticketTap: {
      borderRadius: theme.roundness,
      borderWidth: 0.5,
      borderColor: theme.colors.border,
      paddingHorizontal: 8,
      paddingVertical: 4,
    },
    ticketChipContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      gap: 4,
    },
    link: {
      width: 10,
      height: 10,
    },
    tapContainer: {
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: theme.roundness,
      alignSelf: 'flex-end',
    },
    tap: {
      flexDirection: 'row',
      gap: 6,
    },
    installImg: {
      width: 20,
      height: 20,
    },
  });
