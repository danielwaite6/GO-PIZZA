import React, { useState, useCallback } from 'react';
import { Alert, TouchableOpacity, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import firestore from '@react-native-firebase/firestore';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import happyEmoji from '../../assets/happy.png';
import { useAuth } from '../../hooks/auth'
import {
    Container, Greeting, GreetingEmoji, GreetingText, Header, MenuHeader, MenuItemNumber, Title, NewProductButton
} from './styles';
import { useTheme } from 'styled-components/native';
import { Search } from '../../components/Search';
import { ProductCard, ProductProps } from '../../components/ProductCard';

export function Home() {

    const { signOut, user } = useAuth();

    const [pizzas, setPizzas] = useState<ProductProps[]>([]);
    const [search, setSearch] = useState('');

    const navigation = useNavigation();

    const { COLORS } = useTheme();

    async function fetchPizzas(value: string) {
        const formattedValue = value.toLocaleLowerCase().trim();
        firestore()
            .collection('pizzas')
            .orderBy('name_insensitive')
            .startAt(formattedValue)
            .endAt(`${formattedValue}\uf8ff`)
            .get()
            .then((response) => {
                const data = response.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data(),
                    }
                }) as ProductProps[];
                setPizzas(data);

            })
            .catch(() => Alert.alert('Consulta', 'Não foi possivel realizar a consulta.'))
    };

    function handleSearch() {
        fetchPizzas(search);
    };

    function handleSearchClear() {
        setSearch('');
        fetchPizzas('');
    };

    function handleOpen(id: string) {
        const route = user?.isAdmin ? 'product' : 'order';
        navigation.navigate(route, { id });
    };

    function handleAdd() {
        navigation.navigate('product', {});
    }

    useFocusEffect(
        useCallback(() => {
            fetchPizzas('');
        }, [])
    )

    return (
        <Container>
            <Header>
                <Greeting>
                    <GreetingEmoji source={happyEmoji} />
                    <GreetingText>Olá, Admin</GreetingText>
                </Greeting>
                <TouchableOpacity onPress={signOut}>
                    <MaterialIcons name='logout' color={COLORS.TITLE} size={24} />
                </TouchableOpacity>
            </Header>
            <Search
                onChangeText={setSearch}
                value={search}
                onSearch={handleSearch}
                onClear={handleSearchClear}
            />
            <MenuHeader>
                <Title>Cardápio</Title>
                <MenuItemNumber>{pizzas.length} pizzas</MenuItemNumber>
            </MenuHeader>

            <FlatList
                data={pizzas}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <ProductCard
                        data={item}
                        onPress={() => handleOpen(item.id)}
                    />
                )}


                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingTop: 20,
                    paddingBottom: 125,
                    marginHorizontal: 24
                }}
            />
            {
                user?.isAdmin &&
                <NewProductButton
                    title='Cadastrar Pizza'
                    type='primary'
                    onPress={handleAdd}
                />
            }



        </Container>
    );
}