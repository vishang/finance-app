import Colors from "@/constants/Colors";
import { STRING_CONSTANTS } from "@/constants/strings";
import { defaultStyles } from "@/constants/Styles";
import { useSignIn } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

enum SignInType {
    Phone,
    Email,
    Apple,
    Google
}
const LoginPage = () => {
  const [form, setForm] = useState({
    countryCode: "+17",
    phoneNumber: "",
  });
  const keyboardVeritalOffset = Platform.OS == 'ios' ? 90 : 0;
  const router = useRouter();
  const { signIn } = useSignIn();

  const onSignIn = async (type: SignInType) => {
    if(type === SignInType.Phone) {
      try {
        const fullPhoneNumber = `${form.countryCode}${form.phoneNumber}`
        const { supportedFirstFactors } = await signIn!.create({
          identifier: fullPhoneNumber
        })
        const firstPhoneFactor: any = supportedFirstFactors!.find((factor: any) => {
          return factor.strategy === 'phone_code';
        })
        const { phoneNumberId } = firstPhoneFactor;

        await signIn!.prepareFirstFactor({
          strategy: 'phone_code',
          phoneNumberId
        })

        router.push({pathname : '/verify/[phone]', params: {phone: fullPhoneNumber, signin: 'true'}});
      } catch(err) {

      }
    }
  }

  return (

    <KeyboardAvoidingView style = {{flex : 1}} behavior="padding" keyboardVerticalOffset={keyboardVeritalOffset}>
    <View style={defaultStyles.container}>
      <Text style={defaultStyles.header}>{STRING_CONSTANTS.signin_header}</Text>
      <Text style={defaultStyles.descriptionText}>
        {STRING_CONSTANTS.signin_header2}
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
     

    <View style = {{flex: 1}} />
      <Pressable
        style={[
          defaultStyles.pillButton,
          form.phoneNumber !== "" ? styles.enabled : styles.disabled,
          {
            marginBottom: 20,
          },
        ]}
        onPress={(e) => onSignIn(e)}
      >
        <Text style={defaultStyles.buttonText}>{STRING_CONSTANTS.continue_label}</Text>
      </Pressable>

      <View style = {styles.container}>
        <View style = {styles.divider}></View>
        <Text style = {styles.text}>or</Text>
        <View style = {styles.divider}></View>
      </View>
    

    <Pressable style = {[defaultStyles.pillButton, {flexDirection: 'row', gap: 16, marginTop: 20, backgroundColor: 'white'}]}>
        <Ionicons name="mail" size={24} color={'#000'} />
        <Text style={[defaultStyles.buttonText, { color: '#000'}]}>{STRING_CONSTANTS.continue_with_email('email')}</Text>
    </Pressable>

    <Pressable style = {[defaultStyles.pillButton, {flexDirection: 'row', gap: 16, marginTop: 20, backgroundColor: 'white'}]}>
        <Ionicons name="logo-google" size={24} color={'#000'} />
        <Text style={[defaultStyles.buttonText, { color: '#000'}]}>{STRING_CONSTANTS.continue_with_email('email')}</Text>
    </Pressable>

    <Pressable style = {[defaultStyles.pillButton, {flexDirection: 'row', gap: 16, marginTop: 20, backgroundColor: 'white'}]}>
        <Ionicons name="logo-apple" size={24} color={'#000'} />
        <Text style={[defaultStyles.buttonText, { color: '#000'}]}>{STRING_CONSTANTS.continue_with_email('email')}</Text>
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
  container: {
    flexDirection: 'row', 
    alignItems: 'center', 
    gap:16
  },
  enabled: {
    backgroundColor: Colors.primary,
  },
  disabled: {
    backgroundColor: Colors.primaryMuted,
  },
  divider: {
    flex : 1, 
    height: StyleSheet.hairlineWidth, 
    backgroundColor: 'grey'
  },
  text: {
    color: Colors.gray, 
    fontSize: 20 
  }
});

export default LoginPage;
