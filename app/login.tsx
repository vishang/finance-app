import Colors from "@/constants/Colors";
import { STRING_CONSTANTS } from "@/constants/strings";
import { defaultStyles } from "@/constants/Styles";
import { Link } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
//dummy push
const LoginPage = () => {
  const [form, setForm] = useState({
    countryCode: "+91",
    phoneNumber: "",
  });
  const keyboardVeritalOffset = Platform.OS == 'ios' ? 90 : 0;

  const onSignUp = async () => {

  }

  return (

    <KeyboardAvoidingView style = {{flex : 1}} behavior="padding" keyboardVerticalOffset={keyboardVeritalOffset}>
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
          onChangeText={(e) => setForm((prev) => ({ ...prev, phoneNumber: e }))}
        />
      </View>
      <Link href={"/login"} replace asChild>
        <Pressable>
          <Text style={defaultStyles.textLink}>
            {STRING_CONSTANTS.account_exists}
          </Text>
        </Pressable>
      </Link>

    <View style = {{flex: 1}} />
      <Pressable
        style={[
          defaultStyles.pillButton,
          form.phoneNumber !== "" ? styles.enabled : styles.disabled,
          {
            marginBottom: 20,
          },
        ]}
        onPress={onSignUp}
      >
        <Text style={defaultStyles.buttonText}>{STRING_CONSTANTS.sign_up}</Text>
      </Pressable>
    </View>
    </KeyboardAvoidingView>
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
  enabled: {
    backgroundColor: Colors.primary,
  },
  disabled: {
    backgroundColor: Colors.primaryMuted,
  },
});

export default LoginPage;
