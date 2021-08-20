import React from 'react';
import styled from 'styled-components/native';
import AppContainer from '@atoms/Container';
import { colors, images } from '@themes';

const Container = styled(AppContainer)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.light.background};
`;

const Logo = styled.Image`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
`;

const SplashScreen = () => (
  <Container testID="splash-screen">
    <Logo source={images.gitexLogo} resizeMode="contain" />
  </Container>
);

export default SplashScreen;
