import styled, { css } from 'styled-components/native'
import { RectButton } from 'react-native-gesture-handler'
import { TouchableOpacity } from 'react-native';


export type TypeProps = 'primary' | 'secondary';

type ContainerProps = {
    type: TypeProps;
}

export const Container = styled(RectButton)`
    flex: 1;
    max-height: 56px;
    min-height: 56px;
    border-radius: 12px;
    justify-content: center;
    align-items: center;

    
`;

export const Title = styled.Text`
    font-size: 14px;
    ${({ theme }) => css`
        color: ${theme.COLORS.TITLE};
        font-family: ${theme.FONTS.TEXT};
    `}
`;


export const Load = styled.ActivityIndicator.attrs(({ theme }) => ({
    color: theme.COLORS.TITLE,
}))``;