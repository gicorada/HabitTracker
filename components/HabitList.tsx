import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import { supabase } from '@/utils/supabase';
import { Habit } from '@/app/types';
import { Texts } from '@/constants/Texts';

export const HabitList = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [streaks, setStreaks] = useState<{ [key: string]: number }>({});
  
  const renderItem = ({ item }: { item: Habit }) => {
    const streak = streaks[item.id] || 0;
    return (
      <View style={styles.item}>
        <Text style={Texts.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={Texts.text}>Streak: {streak}</Text>
      </View>
    );
  };

  const fetchHabits = async () => {
    const { data, error } = await supabase.from('habits').select('*');
    if (error) {
      console.error('Error fetching habits:', error);
    } else {
      setHabits(data);
    }
  };

  const fetchCurrentStreaks = async () => {
    const { data, error } = await supabase.rpc('get_streaks');
    if (error) {
      console.error('Error fetching streaks:', error);
    } else {
      console.log('Streaks:', data);
      const streakMap: { [key: string]: number } = {};
      data.forEach((streakItem: { habit_id: string; current_streak: number }) => {
        streakMap[streakItem.habit_id] = streakItem.current_streak;
      });
      setStreaks(streakMap);
    }
  };

  useEffect(() => {
    fetchHabits();
    fetchCurrentStreaks();
  }, []);

  return (
    <FlatList
      data={habits}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
    />
  );
};

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
	description: {
	  fontSize: 16,
	  color: '#555',
	},
  });
  