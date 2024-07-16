import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { supabase } from "../../utils/supabase";

// import hook
import { useTranslation } from "react-i18next";

// Custom styling
import { Buttons } from "../../constants/Buttons";
import { Inputs } from "@/constants/Inputs";
import { Texts } from "@/constants/Texts";

export default function Tab() {
  const [data, setData] = useState<{ uuid: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text>History</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
