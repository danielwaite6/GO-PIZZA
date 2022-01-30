import React from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import happyEmoji from '../../assets/happy.png';

import {
    Container, Greeting, GreetingEmoji, GreetingText, Header
} from './styles';
import { useTheme } from 'styled-components/native';

export function Home() {

    const { COLORS } = useTheme()

    return (
        <Container>
            <Header>
                <Greeting>
                    <GreetingEmoji source={happyEmoji} />
                    <GreetingText>Olá, Admin</GreetingText>
                </Greeting>
                <TouchableOpacity>
                    <MaterialIcons name='logout' color={COLORS.TITLE} size={24} />
                </TouchableOpacity>
            </Header>
        </Container>
    );
}