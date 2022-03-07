import React, { Component, useState } from "react";
import {
    Text,
    SafeAreaView,
    View,
    StatusBar,
    Image,
    TouchableOpacity,
    StyleSheet,
    BackHandler
} from "react-native";
import { withNavigation } from "react-navigation";
import { Fonts, Colors, Sizes } from "../../constants/styles";
import IntlPhoneInput from 'react-native-intl-phone-input';

class SignInScreen extends Component {

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    handleBackButton = () => {
        BackHandler.exitApp();
        return true;
    };

    render() {
        return (
            <Signin navigation={this.props.navigation} />
        )
    }
}

const Signin = ({ navigation }) => {

    const [phoneNumber, setPhoneNumber] = useState('');

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, justifyContent: 'center', }}>
                {logo()}
                {signInText()}
                {phoneNumberTextField()}
                {continueButton()}
                {sendOTPInfo()}
                {loginWithFacebookButton()}
                {loginWithGoogleButton()}
            </View>
        </SafeAreaView>
    )

    function phoneNumberTextField() {
        return (
            <IntlPhoneInput
                onChangeText={({ phoneNumber }) => setPhoneNumber(phoneNumber)}
                defaultCountry="US"
                placeholder="Phone Number"
                containerStyle={styles.phoneNumberContainerStyle}
                dialCodeTextStyle={{ ...Fonts.black16Medium }}
                phoneInputStyle={{ flex: 1, marginLeft: Sizes.fixPadding + 5.0, ...Fonts.black16Medium }}
            />
        )
    }

    function continueButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.navigate('Register')}
                style={styles.continueButtonStyle}>
                <Text style={{ ...Fonts.white16SemiBold }}>Continue</Text>
            </TouchableOpacity>
        )
    }

    function loginWithFacebookButton() {
        return (
            <View>
                <View style={styles.loginWithFacebookButtonStyle}>
                    <Image source={require('../../assets/images/facebook.png')}
                        style={{ height: 30.0, width: 30.0 }}
                        resizeMode="contain"
                    />
                    <Text style={{ ...Fonts.white15Medium, marginLeft: Sizes.fixPadding + 5.0 }}>
                        Login with Facebook
                    </Text>
                </View>
            </View>
        )
    }

    function loginWithGoogleButton() {
        return (
            <View>
                <View style={styles.loginWithGoogleButtonStyle}>
                    <Image source={require('../../assets/images/google.png')}
                        style={{ height: 30.0, width: 30.0 }}
                        resizeMode="contain"
                    />
                    <Text style={{ ...Fonts.black15Medium, marginLeft: Sizes.fixPadding + 5.0 }}>
                        Login with Google
                    </Text>
                </View>
            </View>
        )
    }

    function sendOTPInfo() {
        return (
            <Text style={{ ...Fonts.black15Medium, alignSelf: 'center', marginTop: Sizes.fixPadding }}>
                We'll send otp for verification
            </Text>
        )
    }

    function logo() {
        return (
            <Image source={require('../../assets/images/auth-icon.png')}
                style={{ alignSelf: 'center', width: 150.0, height: 150.0, marginBottom: Sizes.fixPadding }}
                resizeMode="contain"
            />
        )
    }

    function signInText() {
        return (
            <Text style={{ ...Fonts.gray16Bold, alignSelf: 'center', marginVertical: Sizes.fixPadding + 5.0 }}>
                Signin with phone number
            </Text>
        )
    }
}

const styles = StyleSheet.create({
    loginWithFacebookButtonStyle: {
        flexDirection: 'row',
        backgroundColor: '#3B5998',
        paddingVertical: Sizes.fixPadding + 3.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding,
        marginTop: Sizes.fixPadding * 3.5
    },
    loginWithGoogleButtonStyle: {
        flexDirection: 'row',
        backgroundColor: Colors.whiteColor,
        paddingVertical: Sizes.fixPadding + 3.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding,
        marginTop: Sizes.fixPadding * 2.5
    },
    continueButtonStyle: {
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding + 7.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding,
        marginTop: Sizes.fixPadding * 3.0
    },
    phoneNumberContainerStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        elevation: 1.0,
        height: 55.0,
    },
})

SignInScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}

export default withNavigation(SignInScreen);