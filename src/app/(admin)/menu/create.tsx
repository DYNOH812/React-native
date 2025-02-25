import Button from '@/src/components/Button';
import { defaultPizzaImage } from '@/src/components/ProductListItem';
import { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { View, Text, StyleSheet, TextInput, Image, Alert } from 'react-native';
import colors from '@/src/constants/Colors';
import { Stack, useLocalSearchParams } from 'expo-router';

const CreateProductScreen = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const { id } = useLocalSearchParams();
    const isUpdating = !!id;
    const [errors, setErrors] = useState<{ error?: string }>({});

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Denied', 'Allow access to the gallery to upload images.');
            }
        })();
    }, []);

    const resetFields = () => {
        setName('');
        setPrice('');
        setImage(null);
    };

    const validateInput = () => {
        setErrors({});
        const trimmedName = name.trim();
        const trimmedPrice = price.trim();

        if (!trimmedName || !trimmedPrice) {
            setErrors({ error: 'Please fill in all fields' });
            return false;
        }

        const priceValue = Number(trimmedPrice);
        if (isNaN(priceValue) || priceValue <= 0) {
            setErrors({ error: 'Please enter a valid positive price' });
            return false;
        }

        return true;
    };

    const onSubmit = () => {
        if (isUpdating) {
            onUpdate();
        } else {
            onCreate();
        }
    };

    const onUpdate = () => {
        if (!validateInput()) return;
        console.log("Updating product...");
        // Save to database
        resetFields();
    };

    const onCreate = () => {
        if (!validateInput()) return;
        console.log("Creating product...");
        // Save to database
        resetFields();
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const onDelete = () => {
        console.log("Deleting product...");
        // Delete logic goes here
    };

    const confirmDelete = () => {
        Alert.alert("confirm", "Are you sure you want to delete this product?");
          
    };

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: isUpdating ? 'Update Product' : 'Create Product' }} />

            <Image source={{ uri: image || defaultPizzaImage }} style={styles.image} />
            <Text onPress={pickImage} style={styles.textButton}>Select Image</Text>

            <Text style={styles.label}>Name</Text>
            <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Enter product name"
                style={styles.input}
            />

            <Text style={styles.label}>Price (Ksh)</Text>
            <TextInput
                value={price}
                onChangeText={setPrice}
                placeholder="10.99"
                style={styles.input}
                keyboardType="numeric"
            />

            {errors.error && <Text style={styles.errorText}>{errors.error}</Text>}

            <Button onPress={onSubmit} text={isUpdating ? 'Update' : 'Create'} />
            {isUpdating && <Text onPress={confirmDelete} style={styles.textButton}>Delete
            </Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        padding: 10,
    },
    image: {
        width: '50%',
        aspectRatio: 1,
        alignSelf: 'center',
        borderRadius: 10,
    },
    input: {
        backgroundColor: '#f9f9f9',
        padding: 12,
        borderRadius: 5,
        marginBottom: 15,
        marginTop: 5,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    textButton: {
        color: colors.light.tint,
        fontSize: 16,
        alignSelf: 'center',
        fontWeight: 'bold',
        marginVertical: 10,
    },
    label: {
        color: 'grey',
        fontSize: 16,
        fontWeight: '600',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
        textAlign: 'center',
    },
});

export default CreateProductScreen;
