import React, { useEffect, useState } from 'react';
import { Platform, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { ProductNavigationProps } from '../../../src/@types/navigation';
import * as ImagePicker from 'expo-image-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { ButtonBack } from '../../components/ButtonBack';
import { Photo } from '../../components/Photo';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { InputPrice } from '../../components/InputPrice';
import { ProductProps } from '../../components/ProductCard';

type PizzaResponse = ProductProps & {
    photo_path: string;
    price_sizes: {
        p: string;
        m: string;
        g: string;
    }
}


import {
    Container, Header, Title, DeleteLabel, Upload, PickImageButton, Form, InputGroup, Label, InputGroupHeader, MaxCharacters,
} from './styles';

export function Product() {

    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [priceSizeP, setPriceSizeP] = useState('');
    const [priceSizeM, setPriceSizeM] = useState('');
    const [priceSizeG, setPriceSizeG] = useState('');
    const [photoPath, setPhotoPath] = useState('');

    const route = useRoute();
    const { id } = route.params as ProductNavigationProps;

    const [isLoading, setIsLoading] = useState(false);

    async function handlePickerImage() {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status === 'granted') {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                aspect: [4, 4],
            });
            if (!result.cancelled) {
                setImage(result.uri);
            }
        }
    };

    async function handleAdd() {
        if (!name.trim()) {
            return Alert.alert('Cadastro', 'Informe o nome da Pizza.')
        }
        if (!description.trim()) {
            return Alert.alert('Cadastro', 'Informe a descrição da Pizza.')
        }
        if (!image) {
            return Alert.alert('Cadastro', 'Selecione a imagem da Pizza.')
        }
        if (!priceSizeP || !priceSizeM || !priceSizeG) {
            return Alert.alert('Cadastro', 'Informe o preço de todos os tamanhos da Pizza.')
        }

        setIsLoading(true);

        const fileName = new Date().getTime();
        const reference = storage().ref(`/pizzas/${fileName}.png`);

        await reference.putFile(image);

        const photo_url = await reference.getDownloadURL();

        firestore()
            .collection('pizzas')
            .add({
                name,
                name_insensitive: name.toLowerCase().trim(),
                description,
                price_sizes: {
                    p: priceSizeP,
                    m: priceSizeM,
                    g: priceSizeG,
                }
                ,
                photo_url,
                photo_path: reference.fullPath,
            })
            .then(() => Alert.alert('Cadastro', 'Pizza cadastrada com sucesso.'))
            .catch(() => Alert.alert('Cadastro', 'Nçao foi possivel cadastrar a Pizza.'))

        setIsLoading(false);

    };

    useEffect(() => {
        if (id) {
            firestore()
                .collection('pizzas')
                .doc(id)
                .get()
                .then((response) => {
                    const product = response.data() as PizzaResponse;
                    setName(product.name);
                    setImage(product.photo_url);
                    setDescription(product.description);
                    setPriceSizeP(product.price_sizes.p);
                    setPriceSizeM(product.price_sizes.m);
                    setPriceSizeG(product.price_sizes.g);
                    setPhotoPath(product.photo_path);
                });
        }
    }, [id]);

    return (
        <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Header>
                    <ButtonBack />
                    <Title>Cadastrar</Title>
                    <TouchableOpacity>
                        <DeleteLabel>Deletar</DeleteLabel>
                    </TouchableOpacity>
                </Header>
                <Upload>
                    <Photo uri={image} />
                    <PickImageButton onPress={handlePickerImage} title='Carregar' type='primary' />
                </Upload>

                <Form>
                    <InputGroup>
                        <Label>Nome</Label>
                        <Input onChangeText={setName} value={name} />
                    </InputGroup>

                    <InputGroup>
                        <InputGroupHeader>
                            <Label>Descrição</Label>
                            <MaxCharacters>0 de 60 caracteres.</MaxCharacters>
                        </InputGroupHeader>
                        <Input
                            multiline
                            maxLength={60}
                            style={{ height: 80 }}
                            onChangeText={setDescription} value={description}
                        />
                    </InputGroup>

                    <InputGroup>
                        <Label>Tamanhos e Preços</Label>
                        <InputPrice size='P' onChangeText={setPriceSizeP} value={priceSizeP} />
                        <InputPrice size='M' onChangeText={setPriceSizeM} value={priceSizeM} />
                        <InputPrice size='G' onChangeText={setPriceSizeG} value={priceSizeG} />
                    </InputGroup>

                    <Button
                        type='secondary'
                        title='Cadastrar Pizza'
                        isLoading={isLoading}
                        onPress={handleAdd}
                    />


                </Form>
            </ScrollView>
        </Container>
    );
}