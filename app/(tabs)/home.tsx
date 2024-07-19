import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { HabitList } from '@/components/HabitList';
import { Habit } from '@/app/types';

export default function Tab() {
  return (
    <HabitList />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
