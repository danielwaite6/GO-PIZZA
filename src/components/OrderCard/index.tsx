import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import {
    Container, Description, Image, StatusContainer, StatusLAbel, Name
} from './styles';

type Props = TouchableOpacityProps & {
    index: number;
}

export function OrderCard({ index, ...rest }: Props) {
    return (
        <Container index={index} {...rest}>
            <Image source={{ uri: 'https://github.com/danielwaite6.png' }} />
            <Name>4 Queijos</Name>
            <Description>
                Mesa 5 º Qntd: 1
            </Description>
            <StatusContainer status='Preparando'>
                <StatusLAbel status='Preparando'>Preparando</StatusLAbel>
            </StatusContainer>
        </Container>
    );
}