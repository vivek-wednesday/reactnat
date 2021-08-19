import React, { useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { PropTypes } from 'prop-types';
import styled from 'styled-components/native';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';
import SplashScreen from 'react-native-splash-screen';

import AppContainer from '@atoms/Container';
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

const Container = styled(AppContainer)`
  margin: 30px;
  flex: 1;
  align-items: center;
`;

const CustomButton = styled.Button`
  margin-top: 0;
  flex: 1;
`;

const CustomView = styled.View`
  flex-direction: row;
  align-items: center;
`;

const CustomTextInput = styled.TextInput`
  flex: 1;
  border-width: 1;
  margin: 10px;
  padding: 10px;
  border-radius: 20px;
`;

const CustomScrollView = styled.ScrollView`
  align-content: space-between;
`;

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
    <Container testID="container">
      {!data ? (
        <ActivityIndicator testId="loader" />
      ) : (
        <View testID="example-container-content">
          <CustomView>
            <CustomTextInput onChangeText={text => setInput(text)} />
            <CustomButton
              onPress={() => requestFetchData(input)}
              title="Search"
            />
          </CustomView>
          <Text>Showing 15 result out of {data.totalCount} results.</Text>
          <CustomScrollView style={{ marginTop: 30 }}>
            {data.items ? (
              data.items.slice(0, 15).map((item, index) => (
                <View
                  key={index}
                  style={{ margin: 5, borderWidth: 1, padding: 10 }}
                >
                  <Text>Name: {item.fullName}</Text>
                  <Text>URL: {item.htmlUrl}</Text>
                  <Text>Description: {item.description}</Text>
                </View>
              ))
            ) : (
              <Text testID="wait">
                {dataErrorMessage || <ActivityIndicator testId="loader" />}
              </Text>
            )}
          </CustomScrollView>
        </View>
      )}
    </Container>
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
