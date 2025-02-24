import Button from '@/src/components/Button';
import { defaultPizzaImage } from '@/src/components/ProductListItem';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { View, Text, StyleSheet, TextInput, Image } from 'react-native'
import colors from '@/src/constants/Colors';
import { Stack } from 'expo-router';


const CreateProductScreen = () => {
    const[name, setName] = useState('');
    const[price, setPrice] = useState('');
    const[image, setImage] = useState<string | null>(null);

    const [errors, setErrors] = useState<{ error?: string }>({});

    const resetFields = ()=> {
        setName('');
        setPrice('');
    }

    const validateInput = () => {
        setErrors({});
        if(!name || !price){
            setErrors({error: 'Please fill in all the fields'});
            return false;
        }
        if(isNaN(Number(price))){
            setErrors({error: 'Please enter a valid price'});
            return false;
        }
        return true;
    }

    const onCreate = () => {
        if(!validateInput()){
            return;
        }
        console.warn("creating products");

        // save in the database

        resetFields();
    };

    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images', 'videos'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    };

  return (
    <View style={styles.container}>

      <Stack.Screen options={{title:'Create Product'}}/>

      <Image source={{ uri: image || defaultPizzaImage }} style={styles.image} />
      <Text onPress={pickImage} style={styles.textButton}>Select Image</Text>

      <Text style={styles.label}>create</Text>
      <TextInput 
      value={name} 
      onChangeText={setName}
      placeholder='Name' 
      style={styles.input}/>

      <Text style={styles.label}>price(ksh)</Text>
      <TextInput 
      value={price}
      onChangeText={setPrice}
      placeholder='10.99' 
      style={styles.input}
      keyboardType='numeric'
      />
      
        <Text style={{color:'red'}}>{errors.error}</Text>
      <Button onPress={onCreate} text='Create Product'/>
      
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
    image:{
        width:'50%',
        aspectRatio:1,
        alignSelf:'center',
    },
    input:{
        backgroundColor:'white',
        padding:10,
        borderRadius:5, 
        marginBottom:20,
        marginTop:5
    },
    textButton:{
        color:colors.light.tint,
        fontSize:16,
        alignSelf:'center',
        fontWeight:'bold',
        marginVertical:10
    },
    label:{
        color:'grey',
        fontSize:16,
    }
  });


export default CreateProductScreen;