import { getItems, ItemData } from '@/assets/reqests';
import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Spin } from 'antd';
import ToDoItem from '@/components/toDoItem';
import { AddItem } from '@/components/add';

export default function Add() {
  const [data, setData] = useState<AxiosResponse>();

  const render = () => {
    getItems('/').then((response) => {
      setData(response);
    });
  };

  useEffect(() => {
    render();

    return () => {};
  }, []);
  if (!data)
    return (
      <View style={styles.container}>
        <Spin tip='Loading' size='large' style={{ padding: '5px' }}></Spin>
      </View>
    );

  const itemsData = data!.data as Array<ItemData>;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{ height: '100%', justifyContent: 'center' }}
      >
        <View style={{ marginRight: 10 }}>
          <AddItem render={render} />
          {itemsData.map((item) => {
            return (
              <ToDoItem
                render={render}
                value={item.value}
                status={item.status}
                _id={item._id}
                key={item._id}
              />
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
});
