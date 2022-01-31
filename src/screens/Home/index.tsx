import React from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import happyEmoji from '../../assets/happy.png';

import {
    Container, Greeting, GreetingEmoji, GreetingText, Header, MenuHeader, MenuItemNumber, Title
} from './styles';
import { useTheme } from 'styled-components/native';
import { Search } from '../../components/Search';

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
            <Search onSearch={() => { }} onClear={() => { }} />
            <MenuHeader>
                <Title>Cardápio</Title>
                <MenuItemNumber>10 pizzas</MenuItemNumber>
            </MenuHeader>
        </Container>
    );
}