import {
  CustomFlatlist,
  CustomSegmentedButton,
  CustomText,
} from '@/components/custom';
import { SegmentedButtonItem } from '@/components/custom/customSegmentedButton/customSegmentedButton';
import { TextVariants } from '@/components/custom/customText/customText';
import { Header, SafeScreen } from '@/components/templates';
import { ApiConstants } from '@/services/apiConstants';
import { HttpMethodApi, makeRequest } from '@/services/apiInstance';
import { MobileAppsModel } from '@/services/models';
import { CustomTheme, useTheme } from '@/theme/themeProvider/paperTheme';
import { showSnackbar } from '@/utils/utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BuildCard } from './buildCard';

export const Dashboard = () => {
  /** Added by @Yuvraj 21-06-2026 -> to access app theme(colors, roundness, fonts, etc) */
  const theme = useTheme();

  /** Added by @Yuvraj 21-09-2026 -> status bar height, the navbar sits below it */
  const insets = useSafeAreaInsets();

  /** Added by @Yuvraj 21-06-2026 -> access StylesSheet with theme implemented */
  const styles = makeStyles(theme, insets.top);

  /** search  */
  const [search, setSearch] = useState('');

  const queryClient = useQueryClient();

  /** regen loading */
  const [regenLoading, setRegenLoading] = useState<string>();

  const regenarateLink = (id: string) => {
    RegenMobileAppsApi.mutate({ id: id });
  };

  /** segment biutton */
  const [selectedOS, setSelectedOS] = useState<SegmentedButtonItem>();

  /** calling the api to get the apps */
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ['mobileAppBuils'],
    queryFn: async () => {
      return await makeRequest<MobileAppsModel[]>({
        endpoint: ApiConstants.MobileApps,
        method: HttpMethodApi.Get,
      });
    },
  });

  const handleSegmentButton = (value: SegmentedButtonItem) => {
    setSelectedOS(value);
  };

  /** search finder */
  const filteredApps = useMemo(() => {
    const query = search.trim().toLowerCase();

    return (data ?? []).filter(app => {
      // OS filter
      const matchesOS =
        !selectedOS ||
        selectedOS.value === 'all' ||
        (selectedOS.value === 'ios' && app.isIos) ||
        (selectedOS.value === 'android' && !app.isIos);

      // Search filter
      const matchesSearch =
        !query ||
        [app.appName, app.ticketNumber, app.assignTo, app.note].some(value =>
          value?.toLowerCase().includes(query),
        );

      return matchesOS && matchesSearch;
    });
  }, [data, search, selectedOS]);

  /** regenrating the link */
  const RegenMobileAppsApi = useMutation({
    mutationFn: (payload: { id: string }) =>
      makeRequest<MobileAppsModel>({
        endpoint: ApiConstants.MobileApps,
        method: HttpMethodApi.Patch,
        params: payload,
      }),
    onMutate(variables) {
      setRegenLoading(variables.id);
    },
    onSettled() {
      setRegenLoading(undefined);
    },
    onSuccess(data, variables) {
      //can i update the data here so not each item will re render and the user will be there only where they were?
      queryClient.setQueryData<MobileAppsModel[]>(
        ['mobileAppBuils'],
        currentData => {
          if (!currentData) return currentData;

          return currentData.map(item =>
            item.id === variables.id ? data : item,
          );
        },
      );
    },
    onError(error, variables, context) {
      showSnackbar(error.message, 'danger');
    },
  });

  return (
    <SafeScreen>
      <View style={styles.container}>
        <Header title={'App Builds'} search={search} setSearch={setSearch} />

        <View style={styles.subContainer}>
          <CustomSegmentedButton
            items={[
              {
                label: 'All',
                value: 'all',
              },
              {
                label: 'iOS',
                value: 'ios',
              },
              {
                label: 'Android',
                value: 'android',
              },
            ]}
            selected={selectedOS}
            setSelected={handleSegmentButton}
            style={styles.segmentedBtn}
            textVariant={TextVariants.labelLarge}
          />
          <KeyboardAvoidingView
            // edge-to-edge (targetSdk 35+) disables adjustResize on Android,
            // so the list must be padded here on both platforms
            behavior="padding"
            // offset = distance from the screen top to this view's parent
            keyboardVerticalOffset={Platform.select({
              ios: 50,
              android: insets.top,
            })}
            style={styles.flex}
          >
            <CustomFlatlist
              data={filteredApps ?? []}
              contentContainerStyle={styles.flatlistContainer}
              keyExtractor={item => item.id}
              ListEmptyComponent={
                !isLoading ? (
                  <View style={styles.emptyView}>
                    <CustomText>{'No Data Available'}</CustomText>
                  </View>
                ) : (
                  <></>
                )
              }
              renderItem={({ item }) => (
                <BuildCard
                  cardItem={item}
                  regenarate={regenarateLink}
                  regenLoading={regenLoading}
                />
              )}
              refreshing={isFetching}
              onRefresh={refetch}
            />
          </KeyboardAvoidingView>
        </View>
      </View>
    </SafeScreen>
  );
};

const makeStyles = (theme: CustomTheme, topInset: number) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    flatlistContainer: {
      paddingTop: 0,
    },
    flex: {
      flex: 1,
    },
    subContainer: {
      flex: 1,
      paddingTop: 75,
    },
    segmentedBtn: {
      marginHorizontal: 16,
      backgroundColor: `${theme.colors.primaryContainer}3d`,
    },
    emptyView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default Dashboard;
