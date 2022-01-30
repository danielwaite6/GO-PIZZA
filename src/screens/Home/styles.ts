import { LinearGradient } from 'expo-linear-gradient';
import { BorderlessButton } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;

export const Header = styled(LinearGradient).attrs(({ theme }) => ({
    colors: theme.COLORS.GRADIENT
}))`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${getStatusBarHeight() + 33}px 24px 58px;
`;

export const Greeting = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const GreetingEmoji = styled.Image`
    height: 32px;
    width: 32px;
    margin-right: 12px;
`;

export const GreetingText = styled.Text`
    font-size: 20px;

    ${({ theme }) => css`
        font-family: ${theme.FONTS.TITLE};
        color: ${theme.FONTS.TITLE};
    `}
`;

export const SignOut = styled(BorderlessButton)`
    
`;