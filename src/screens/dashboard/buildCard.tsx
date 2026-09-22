import { Divider } from '@/components/common';
import {
  ChipModeEnum,
  CustomAvatar,
  CustomChip,
  CustomImage,
  CustomText,
  Shadow,
  Tap,
} from '@/components/custom';
import { TextVariants } from '@/components/custom/customText/customText';
import { MobileAppsModel } from '@/services/models';
import { Images } from '@/theme/assets/images';
import { CustomTheme, useTheme } from '@/theme/themeProvider/paperTheme';
import { Linking, StyleSheet, View } from 'react-native';
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
      await Linking.openURL(cardItem.link);
    } else {
      props.regenarate(cardItem.id);
    }
  };

  return (
    <Shadow style={styles.container}>
      <View style={styles.header}>
        <CustomAvatar size={60} style={styles.avatar} name={cardItem.appName} />
        <View style={styles.titleView}>
          <CustomText style={styles.appName} maxLines={1}>
            {cardItem.appName}
          </CustomText>
          <CustomChip
            mode={ChipModeEnum.Flat}
            label={cardItem.isIos ? 'iOS' : 'Android'}
          />
        </View>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.versions}>
          <CustomText>{`Version ${cardItem.version || '-'}`}</CustomText>
          <CustomText color={theme.colors.labelLight}>{`•`}</CustomText>
          <CustomText>{`Build ${cardItem.buildVersion || '-'}`}</CustomText>
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
          <CustomText
          // variant={TextVariants.titleSmall}
          >
            {cardItem.ticketNumber || '-'}
          </CustomText>
          <CustomText
            variant={TextVariants.titleSmall}
            color={theme.colors.labelLight}
          >
            {cardItem.assignTo || '-'}
          </CustomText>
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
      flexShrink: 0,
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
    titleView: {
      flex: 1,
      minWidth: 0,
      gap: 3,
      justifyContent: 'space-between',
    },
    appName: {
      marginLeft: 3,
    },
    contentContainer: {
      flex: 1,
      marginVertical: 15,
      marginHorizontal: 10,
    },
    versions: {
      flex: 1,
      flexDirection: 'row',
      gap: 15,
    },
    footer: {
      flex: 1,
      marginVertical: 15,
      marginHorizontal: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    footerInfo: {
      justifyContent: 'space-between',
    },
    tapContainer: {
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: theme.roundness,
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
