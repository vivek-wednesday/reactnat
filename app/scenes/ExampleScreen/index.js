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
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { PropTypes } from 'prop-types';
import styled from 'styled-components/native';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';
import SplashScreen from 'react-native-splash-screen';
import { colors } from '@themes';
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

const CustomView = styled.View`
  flex-direction: row;
  align-items: center;
`;

const CustomTextInput = styled.TextInput`
  flex: 1
  border-width: 1;
  padding: 10px;
  border-radius: 20px;
  margin-right: 10;
`;

const styles = StyleSheet.create({
  mainView: {
    padding: Platform.OS === 'android' ? StatusBar.currentHeight : 10,
    maxHeight: screenHeight
  },
  item: {
    borderWidth: 1,
    marginBottom: 10,
    flexDirection: 'row',
    borderRadius: 30,
    backgroundColor: colors.white
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

function ExampleScreen(props) {
  const { data, dataIsLoading, dataErrorMessage, fetchData } = props;

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

  return (
    <SafeAreaView styles={styles.safe} testID="container">
      {!data ? (
        <ActivityIndicator testId="loader" />
      ) : (
        <View style={styles.mainView} testID="example-container-content">
          <CustomView>
            <CustomTextInput onChangeText={text => setInput(text)} />
            <Button onPress={() => requestFetchData(input)} title="Search" />
          </CustomView>
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
  fetchData: PropTypes.func
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
