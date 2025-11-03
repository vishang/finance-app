import Colors from "@/constants/Colors";
import { STRING_CONSTANTS } from "@/constants/strings";
import { defaultStyles } from "@/constants/Styles";
import { isClerkAPIResponseError, useSignIn, useSignUp } from "@clerk/clerk-expo";
import { Link, useLocalSearchParams } from "expo-router";
import { Fragment, useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from "react-native-confirmation-code-field";

const CELL_COUNT = 6;

const Page = () => {
  const { phone, signin } = useLocalSearchParams();
  const [code, setCode] = useState("");
  const { signIn } = useSignIn();
  const { signUp, setActive } = useSignUp();

  const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  useEffect(() => {
    if (code.length === 6) {
      if (signin === "true") {
        verifySignIn();
      } else {
        verifyCode();
      }
    }
  }, [code]);

  const verifySignIn = async () => {
     try {
        await signIn!.attemptFirstFactor({
            strategy: 'phone_code',
            code
        });
        await setActive!({ session: signIn!.createdSessionId });
        

    } catch(err) {
        console.log('error', JSON.stringify(err, null, 2));
        if (isClerkAPIResponseError(err)) {
            Alert.alert('Error', err.errors[0].message)
        }
    }
  };

  const verifyCode = async () => {
    try {
        await signUp!.attemptPhoneNumberVerification({
            code,
        });
        await setActive!({ session: signUp!.createdSessionId });


    } catch(err) {
        console.log('error', JSON.stringify(err, null, 2));
        if (isClerkAPIResponseError(err)) {
            Alert.alert('Error', err.errors[0].message)
        }
    }
  };

  return (
    <View style={defaultStyles.container}>
      <Text style={defaultStyles.header}>
        {STRING_CONSTANTS.six_digit_code}
      </Text>
      <Text style={defaultStyles.descriptionText}>
        {STRING_CONSTANTS.code_sent(phone ?? "")}
      </Text>

      <CodeField
        ref={ref}
        {...props}
        value={code}
        onChangeText={setCode}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <Fragment key={index}>
            <View
              // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
              onLayout={getCellOnLayoutHandler(index)}
              key={index}
              style={[styles.cellRoot, isFocused && styles.focusCell]}>
              <Text style={styles.cellText}>{symbol || (isFocused ? <Cursor /> : null)}</Text>
            </View>
            {index === 2 ? <View key={`separator-${index}`} style={styles.separator} /> : null}
          </Fragment>
        )}
      />


      <Link href={"/login"} replace asChild>
        <Pressable>
          <Text style={[defaultStyles.textLink]}>
            {STRING_CONSTANTS.account_exists}
          </Text>
        </Pressable>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, padding: 20 },
  title: { textAlign: "center", fontSize: 30 },
  codeFieldRoot: { 
    marginVertical: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    gap: 12
   },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: "#00000030",
    textAlign: "center",
    color: "#000", // text color
  },
  focusCell: {
    borderColor: "#000",
  },
  separator: {
    height: 2,
    width: 10,
    backgroundColor: Colors.gray,
    alignSelf: 'center',
  },
  cellText: {
    color: '#000',
    fontSize: 36,
    textAlign: 'center',
  },
   cellRoot: {
    width: 45,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
  },
});

export default Page;
