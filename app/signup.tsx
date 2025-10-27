import Colors from "@/constants/Colors";
import { STRING_CONSTANTS } from "@/constants/strings";
import { defaultStyles } from "@/constants/Styles";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

const SignUp = () => {
  const [form, setForm] = useState({
    countryCode: '+91',
    phoneNumber: '',
  });

  console.log('form data is', form)

  return (
    <View style={defaultStyles.container}>
      <Text style={defaultStyles.header}>{STRING_CONSTANTS.signup_header}</Text>
      <Text style={defaultStyles.descriptionText}>
        {STRING_CONSTANTS.signup_header2}
      </Text>
      <View className="my-10 flex-row">
        <TextInput
          value={form.countryCode}
          style={styles.input}
          placeholder="Country code"
          placeholderTextColor={Colors.gray}
          keyboardType="ascii-capable"
        />
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholderTextColor={Colors.gray}
          placeholder="Mobile number"
          keyboardType="numeric"
          maxLength={10}
          onChangeText={(e) => setForm(prev => ({...prev,  phoneNumber: e }))}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.lightGray,
    padding: 20,
    borderRadius: 16,
    fontSize: 20,
    marginRight: 10,
  },
});

export default SignUp;
