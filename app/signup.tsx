import Colors from "@/constants/Colors";
import { STRING_CONSTANTS } from "@/constants/strings";
import { defaultStyles } from "@/constants/Styles";
import { isClerkAPIResponseError, useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
//dummy push
const SignUp = () => {
  const [form, setForm] = useState({
    countryCode: "+1",
    phoneNumber: "",
  });
  const keyboardVeritalOffset = Platform.OS == 'ios' ? 90 : 0;
  const router = useRouter();
  const { signUp } = useSignUp();

  const onSignUp = async () => {
    const fullPhoneNumber = `${form.countryCode}${form.phoneNumber}`
   
    console.log('fullPhoneNumber',fullPhoneNumber)
    try {
      await signUp!.create({
        phoneNumber: fullPhoneNumber
      });
      signUp!.preparePhoneNumberVerification();
      router.push({pathname : '/verify/[phone]', params: {phone: fullPhoneNumber}});
      console.log('reached here router push failed ?')
    } catch(err) {
      console.log('Error signing up', err, err.errors[0].message)
      if (isClerkAPIResponseError(err)) {
          if (err.errors[0].code === 'form_identifier_not_found') {
            Alert.alert('Error', err.errors[0].message);
          }
        }
    }
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

export default SignUp;
