import { supabase } from '@/utils/supabase';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Habit } from '../types';

export default function Tab() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHabits = async () => {
      const { data, error } = await supabase
        .from('habits')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) console.error(error);
      else setHabits(data);
      setLoading(false);
    };
    fetchHabits();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }
  
  const renderItem = ({ item }: { item: Habit }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.category}>{item.description}</Text>
    </View>
  );

  return (
    <FlatList
      data={habits}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    backgroundColor: 'lightblue',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  category: {
    fontSize: 16,
    color: '#555',
  },
});
