import React from 'react';
import { FlatList } from 'react-native';
import { OrderCard } from '../../components/OrderCard';

import {
    Container, Header, Title
} from './styles';

export function Orders() {
    return (
        <Container>
            <Header>
                <Title>Pedidos Feitos</Title>
            </Header>
            <FlatList
                data={['1', '2', '3']}
                keyExtractor={item => item}
                renderItem={({ item, index }) => (
                    <OrderCard index={index} />
                )}
            />
        </Container>
    );
}