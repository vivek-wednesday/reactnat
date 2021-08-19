import React, { useState } from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';
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
  justify-content: space-around;
`;

const CustomButton = styled.Button`
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
  margin-top: 20;
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
          <Text>Showing 8 result out of {data.totalCount} results.</Text>
          <CustomScrollView>
            {data.items ? (
              data.items.slice(0, 8).map((item, index) => (
                <View
                  key={index}
                  style={{
                    marginBottom: 10,
                    borderWidth: 1,
                    flexDirection: 'row',
                    borderRadius: 30,
                    backgroundColor: 'white'
                  }}
                >
                  <View
                    style={{ flex: 1, justifyContent: 'center', padding: 10 }}
                  >
                    <Image
                      style={{
                        height: 50,
                        width: 50,
                        alignSelf: 'center',
                        borderRadius: 40
                      }}
                      source={{
                        uri: item.owner.avatarUrl
                      }}
                    />
                  </View>
                  <View style={{ flex: 3, padding: 20 }}>
                    <Text style={{ fontWeight: 'bold' }}>
                      {item.owner.login}
                    </Text>
                    <Text>{item.name}</Text>
                  </View>
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
