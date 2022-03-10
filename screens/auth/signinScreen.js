import React, { Component, useState, useEffect } from "react";
import {
  Text,
  SafeAreaView,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
} from "react-native";

import { Magic } from "magic-sdk";
import { SolanaExtension } from "@magic-ext/solana";
import * as web3 from "@solana/web3.js";

import { withNavigation } from "react-navigation";
import { Fonts, Colors, Sizes } from "../../constants/styles";
import IntlPhoneInput from "react-native-intl-phone-input";

const rpcUrl = "https://api.devnet.solana.com";

const magic = new Magic("pk_live_8350FF5E797D679F", {
  extensions: {
    solana: new SolanaExtension({
      rpcUrl,
    }),
  },
});

class SignInScreen extends Component {
  componentDidMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButton.bind(this)
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButton.bind(this)
    );
  }

  handleBackButton = () => {
    BackHandler.exitApp();
    return true;
  };

  render() {
    return <Signin navigation={this.props.navigation} />;
  }
}

const Signin = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const [email, setEmail] = useState("");
  const [publicAddress, setPublicAddress] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");
  const [sendAmount, setSendAmount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userMetadata, setUserMetadata] = useState({});
  const [txHash, setTxHash] = useState("");
  const [sendingTransaction, setSendingTransaction] = useState(false);

  useEffect(() => {
    magic.user.isLoggedIn().then(async (magicIsLoggedIn) => {
      setIsLoggedIn(magicIsLoggedIn);
      if (magicIsLoggedIn) {
        const metadata = await magic.user.getMetadata();
        setPublicAddress(metadata.publicAddress);
        setUserMetadata(metadata);
      }
    });
  }, [isLoggedIn]);

  const login = async () => {
    await magic.auth.loginWithMagicLink({ email });
    setIsLoggedIn(true);
  };

  const logout = async () => {
    await magic.user.logout();
    setIsLoggedIn(false);
  };

  const handlerSendTransaction = async () => {
    setSendingTransaction(true);
    const metadata = await magic.user.getMetadata();
    const transaction = web3.SystemProgram.transfer({
      fromPubkey: metadata.publicAddress,
      toPubkey: destinationAddress,
      lamports: sendAmount,
    });

    const tx = await magic.solana.sendAndConfirmTransaction(transaction);
    setSendingTransaction(false);

    setTxHash(tx);

    console.log("send transaction", tx);
  };

  const handleSignTransaction = async () => {
    setSendingTransaction(true);
    const metadata = await magic.user.getMetadata();
    const recipientPubKey = new web3.PublicKey(destinationAddress);
    const payer = new web3.PublicKey(metadata.publicAddress);
    const connection = new web3.Connection(rpcUrl);

    const hash = await connection.getRecentBlockhash();

    let transactionMagic = new web3.Transaction({
      feePayer: payer,
      recentBlockhash: hash.blockhash,
    });

    const transaction = web3.SystemProgram.transfer({
      fromPubkey: payer,
      toPubkey: recipientPubKey,
      lamports: sendAmount,
    });

    transactionMagic.add(...[transaction]);

    const serializeConfig = {
      requireAllSignatures: false,
      verifySignatures: true,
    };

    const signedTransaction = await magic.solana.signTransaction(
      transactionMagic,
      serializeConfig
    );
    setSendingTransaction(false);

    setTxHash("Check your Signed Transaction in console!");

    console.log("Signed transaction", signedTransaction);
  };

  return (
    <View className="App">
      {!isLoggedIn ? (
        <View className="container">
          <Text
            style={{
              ...Fonts.gray16Bold,
              alignSelf: "center",
              marginVertical: Sizes.fixPadding + 5.0,
            }}
          >
            Please sign up or login
          </Text>
          <View style={styles.textFieldContainerStyle}>
            <TextInput
              placeholder="Enter your email"
              placeholderTextColor={Colors.blackColor}
              style={{ ...Fonts.black16Medium }}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={login}
            style={styles.continueButtonStyle}
          >
            <Text style={{ ...Fonts.white16SemiBold }}>Send</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <View className="container">
            <Text
              style={{
                ...Fonts.gray16Bold,
                alignSelf: "center",
                marginVertical: Sizes.fixPadding + 5.0,
              }}
            >
              Current user: {userMetadata.email}
            </Text>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={logout}
              style={styles.continueButtonStyle}
            >
              <Text style={{ ...Fonts.white16SemiBold }}>Logout</Text>
            </TouchableOpacity>
          </View>
          <View className="container">
            <Text
              style={{
                ...Fonts.gray16Bold,
                alignSelf: "center",
                marginVertical: Sizes.fixPadding + 5.0,
              }}
            >
              Solana address
            </Text>
            <View className="info">{publicAddress}</View>
          </View>
          <View className="container">
            <Text
              style={{
                ...Fonts.gray16Bold,
                alignSelf: "center",
                marginVertical: Sizes.fixPadding + 5.0,
              }}
            >
              Send Transaction
            </Text>
            {txHash ? (
              <View>
                <View>Send transaction success</View>
                <View className="info">{txHash}</View>
              </View>
            ) : sendingTransaction ? (
              <View className="sending-status">Sending transaction</View>
            ) : (
              <View />
            )}
            <View style={styles.textFieldContainerStyle}>
              <TextInput
                placeholder="Destination address"
                placeholderTextColor={Colors.blackColor}
                style={{ ...Fonts.black16Medium }}
                onChange={(event) => {
                  setDestinationAddress(event.target.value);
                }}
              />
            </View>
            <View style={styles.textFieldContainerStyle}>
              <TextInput
                placeholder="Amount in LAMPORTS"
                placeholderTextColor={Colors.blackColor}
                style={{ ...Fonts.black16Medium }}
                onChange={(event) => {
                  setSendAmount(event.target.value);
                }}
              />
            </View>

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={handlerSendTransaction}
              style={styles.continueButtonStyle}
            >
              <Text style={{ ...Fonts.white16SemiBold }}>Send Transaction</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={handleSignTransaction}
              style={styles.continueButtonStyle}
            >
              <Text style={{ ...Fonts.white16SemiBold }}>Sign Transaction</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );

  // return (
  //   <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
  //     <StatusBar backgroundColor={Colors.primaryColor} />
  //     <View style={{ flex: 1, justifyContent: "center" }}>
  //       {logo()}
  //       {signInText()}
  //       {phoneNumberTextField()}
  //       {continueButton()}
  //       {sendOTPInfo()}
  //       {loginWithFacebookButton()}
  //       {loginWithGoogleButton()}
  //     </View>
  //   </SafeAreaView>
  // );

  function phoneNumberTextField() {
    return (
      <IntlPhoneInput
        onChangeText={({ phoneNumber }) => setPhoneNumber(phoneNumber)}
        defaultCountry="US"
        placeholder="Phone Number"
        containerStyle={styles.phoneNumberContainerStyle}
        dialCodeTextStyle={{ ...Fonts.black16Medium }}
        phoneInputStyle={{
          flex: 1,
          marginLeft: Sizes.fixPadding + 5.0,
          ...Fonts.black16Medium,
        }}
      />
    );
  }

  function continueButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.navigate("Register")}
        style={styles.continueButtonStyle}
      >
        <Text style={{ ...Fonts.white16SemiBold }}>Continue</Text>
      </TouchableOpacity>
    );
  }

  function loginWithFacebookButton() {
    return (
      <View>
        <View style={styles.loginWithFacebookButtonStyle}>
          <Image
            source={require("../../assets/images/facebook.png")}
            style={{ height: 30.0, width: 30.0 }}
            resizeMode="contain"
          />
          <Text
            style={{
              ...Fonts.white15Medium,
              marginLeft: Sizes.fixPadding + 5.0,
            }}
          >
            Login with Facebook
          </Text>
        </View>
      </View>
    );
  }

  function loginWithGoogleButton() {
    return (
      <View>
        <View style={styles.loginWithGoogleButtonStyle}>
          <Image
            source={require("../../assets/images/google.png")}
            style={{ height: 30.0, width: 30.0 }}
            resizeMode="contain"
          />
          <Text
            style={{
              ...Fonts.black15Medium,
              marginLeft: Sizes.fixPadding + 5.0,
            }}
          >
            Login with Google
          </Text>
        </View>
      </View>
    );
  }

  function sendOTPInfo() {
    return (
      <Text
        style={{
          ...Fonts.black15Medium,
          alignSelf: "center",
          marginTop: Sizes.fixPadding,
        }}
      >
        We'll send otp for verification
      </Text>
    );
  }

  function logo() {
    return (
      <Image
        source={require("../../assets/images/auth-icon.png")}
        style={{
          alignSelf: "center",
          width: 150.0,
          height: 150.0,
          marginBottom: Sizes.fixPadding,
        }}
        resizeMode="contain"
      />
    );
  }

  function signInText() {
    return (
      <Text
        style={{
          ...Fonts.gray16Bold,
          alignSelf: "center",
          marginVertical: Sizes.fixPadding + 5.0,
        }}
      >
        Signin with phone number
      </Text>
    );
  }
};

const styles = StyleSheet.create({
  loginWithFacebookButtonStyle: {
    flexDirection: "row",
    backgroundColor: "#3B5998",
    paddingVertical: Sizes.fixPadding + 3.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Sizes.fixPadding,
    marginTop: Sizes.fixPadding * 3.5,
  },
  loginWithGoogleButtonStyle: {
    flexDirection: "row",
    backgroundColor: Colors.whiteColor,
    paddingVertical: Sizes.fixPadding + 3.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Sizes.fixPadding,
    marginTop: Sizes.fixPadding * 2.5,
  },
  continueButtonStyle: {
    backgroundColor: Colors.primaryColor,
    paddingVertical: Sizes.fixPadding + 7.0,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: Sizes.fixPadding * 2.0,
    borderRadius: Sizes.fixPadding,
    marginTop: Sizes.fixPadding * 3.0,
  },
  phoneNumberContainerStyle: {
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding * 2.0,
    elevation: 1.0,
    height: 55.0,
  },
});

SignInScreen.navigationOptions = () => {
  return {
    header: () => null,
  };
};

export default withNavigation(SignInScreen);
