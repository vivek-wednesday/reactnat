import React, { useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  ScrollView,
  Button,
  SafeAreaView,
  Dimensions,
  TextInput
} from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { PropTypes } from 'prop-types';
import { useTheme } from '@react-navigation/native';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';
import SplashScreen from 'react-native-splash-screen';
import {
  selectData,
  selectDataIsLoading,
  selectDataErrorMessage
} from './selectors';
import { exampleScreenActions } from './reducer';

/**
 * This is github container component.
 *
 * This screen displays the data fetched from the GitHub API.
 * Feel free to remove it.
 */

const screenHeight = Dimensions.get('window').height;

function ExampleScreen(props) {
  const {
    data,
    dataIsLoading,
    dataErrorMessage,
    fetchData,
    navigation
  } = props;
  const { colors } = useTheme();

  const [input, setInput] = useState('');

  React.useEffect(() => {
    requestFetchData('react');
  }, []);

  React.useEffect(() => {
    if (!dataIsLoading) SplashScreen.hide();
  }, [dataIsLoading]);

  const requestFetchData = rname => {
    fetchData(rname);
  };

  const styles = StyleSheet.create({
    search: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    textInput: {
      flex: 1,
      borderWidth: 1,
      padding: 10,
      borderRadius: 20,
      marginRight: 10,
      backgroundColor: colors.background
    },
    mainView: {
      padding: Platform.OS === 'android' ? StatusBar.currentHeight : 10,
      maxHeight: screenHeight,
      backgroundColor: colors.primary
    },
    item: {
      borderWidth: 1,
      marginBottom: 10,
      flexDirection: 'row',
      borderRadius: 30,
      backgroundColor: colors.background
    },
    imgView: {
      flex: 1,
      justifyContent: 'center',
      padding: 10
    },
    img: {
      height: 50,
      width: 50,
      alignSelf: 'center',
      borderRadius: 40
    },
    resultString: {
      textAlign: 'center',
      textAlignVertical: 'center'
    },
    scrollView: {
      marginTop: 20,
      height: screenHeight * 0.8
    },
    repoDetails: {
      flex: 3,
      padding: 20
    },
    repoOwner: {
      fontWeight: 'bold'
    }
  });

  return (
    <SafeAreaView styles={styles.safe} testID="container">
      <StatusBar backgroundColor={colors.primary} />
      {!data ? (
        <ActivityIndicator testId="loader" />
      ) : (
        <View style={styles.mainView} testID="example-container-content">
          <View style={styles.search}>
            <TextInput
              style={styles.textInput}
              onChangeText={text => setInput(text)}
              placeholder="search a repo..."
            />
            <Button onPress={() => requestFetchData(input)} title="Search" />
          </View>
          <ScrollView style={styles.scrollView}>
            {data.items ? (
              data.items.slice(0, 15).map((item, index) => (
                <View key={index} style={styles.item}>
                  <View style={styles.imgView}>
                    <Image
                      style={styles.img}
                      source={{
                        uri: item.owner.avatarUrl
                      }}
                    />
                  </View>
                  <View style={styles.repoDetails}>
                    <Text style={styles.repoOwner}>{item.owner.login}</Text>
                    <Text>{item.name}</Text>
                  </View>
                </View>
              ))
            ) : (
              <Text testID="wait">
                {dataErrorMessage || <ActivityIndicator testId="loader" />}
              </Text>
            )}
            <Button
              onPress={() => navigation.navigate('FormScreen')}
              title="Didn't find something? contact us."
            />
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
}

ExampleScreen.propTypes = {
  data: PropTypes.shape({
    totalCount: PropTypes.number,
    items: PropTypes.array
  }),
  dataIsLoading: PropTypes.bool,
  dataErrorMessage: PropTypes.string,
  fetchData: PropTypes.func,
  navigation: PropTypes.any
};

const mapStateToProps = createStructuredSelector({
  data: selectData(),
  dataIsLoading: selectDataIsLoading(),
  dataErrorMessage: selectDataErrorMessage()
});

const mapDispatchToProps = dispatch => ({
  fetchData: name => dispatch(exampleScreenActions.requestFetchRepo(name))
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, injectIntl)(ExampleScreen);
export { ExampleScreen as ExampleScreenTest };
