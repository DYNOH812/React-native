import orders from '@/assets/data/orders';
import OrderItemListItem from '@/src/components/OrderItemListItem';
import OrderListItem from '@/src/components/OrderListItem';
import { Stack, useLocalSearchParams } from 'expo-router';
import {FlatList, Text,View} from 'react-native';

export default function orderDetailScreen() {
    const {id} = useLocalSearchParams();

    const order = orders.find((o) => o.id.toString() === id);

    if(!order) {
       return  <Text>Order not found</Text>}

    return(
        <View style={{padding:10, gap:10}}>
          <Stack.Screen options={{title:`order #${id}`}} />  
          <OrderListItem order={order}/>

          <FlatList 
          data={order.order_items}
          renderItem={({item}) => <OrderItemListItem item={item}/>}
          contentContainerStyle={{gap:10}}
          />
        </View>
    )   
}