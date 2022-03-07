import React, { Component } from "react";
import { SafeAreaView, Text, View, StatusBar, TouchableOpacity, StyleSheet, BackHandler } from "react-native";
import { withNavigation } from "react-navigation";
import { Fonts, Colors, Sizes } from "../../constants/styles";
import { OutlinedTextField } from 'rn-material-ui-textfield';
import { TransitionPresets } from 'react-navigation-stack';

class DepositScreen extends Component {

    state = {
        amount: '10',
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    handleBackButton = () => {
        this.props.navigation.pop();
        return true;
    };

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    {currentBalanceInfo()}
                    {this.amountTextField()}
                    {this.amountSelection()}
                    {minMaxLimitInfo()}
                    {this.depositeButton()}
                    {processingTimeInfo()}
                </View>
            </SafeAreaView>
        )
    }

    amountTextField() {
        return (
            <View style={{ paddingHorizontal: Sizes.fixPadding * 2.0 }}>
                <OutlinedTextField
                    label='Amount'
                    keyboardType='phone-pad'
                    suffix='$'
                    labelTextStyle={{ ...Fonts.black15Medium }}
                    style={{ ...Fonts.black16Medium, }}
                    baseColor="gray"
                    value={this.state.amount}
                    onChangeText={(value) => this.setState({ amount: value })}
                />
            </View>
        )
    }

    amountSelection() {
        return (
            <View
                style={{
                    paddingHorizontal: Sizes.fixPadding * 4.0,
                    paddingTop: Sizes.fixPadding + 5.0,
                    paddingBottom: Sizes.fixPadding,
                }}
            >
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignItems: 'center'
                }}>
                    {this.currencySelection({ value: 10 })}
                    {this.currencySelection({ value: 50 })}
                    {this.currencySelection({ value: 100 })}
                    {this.currencySelection({ value: 500 })}
                </View>
            </View>
        )
    }

    currencySelection({ value }) {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    this.setState({ amount: value.toString() })
                }}
                style={styles.currencySelectionContainerStyle}
            >
                <Text style={{ ...Fonts.black15Medium }}>${value}</Text>
            </TouchableOpacity>
        )
    }

    depositeButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.navigation.goBack()}
                style={styles.depositButtonStyle}>
                <Text style={{ ...Fonts.white16Medium }}>DEPOSIT</Text>
            </TouchableOpacity>
        )
    }

}

function processingTimeInfo() {
    return (
        <Text style={{ ...Fonts.black16Medium, alignSelf: 'center' }}>
            Processing time upto 15 minutes
        </Text>
    )
}

function minMaxLimitInfo() {
    return (
        <Text style={{ ...Fonts.black15Medium, alignSelf: 'center', }}>
            Min $10, Max $3,000
        </Text>
    )
}

function currentBalanceInfo() {
    return (
        <View style={{ alignItems: 'center' }}>
            <Text style={{ ...Fonts.black19Bold }}>$152</Text>
            <Text style={{
                ...Fonts.black13Medium,
                marginBottom: Sizes.fixPadding * 3.0,
                marginTop: Sizes.fixPadding - 5.0
            }}>Current Balance</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    currencySelectionContainerStyle: {
        backgroundColor: "#E5E5E5",
        borderRadius: Sizes.fixPadding * 2.0,
        paddingHorizontal: 12.0,
        paddingVertical: Sizes.fixPadding + 1.0,
    },
    depositButtonStyle: {
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding - 2.0,
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding - 5.0,
    }
})

DepositScreen.navigationOptions = {
    headerTitleStyle: { ...Fonts.white17SemiBold, marginLeft: -Sizes.fixPadding * 2.0, },
    headerStyle: {
        elevation: 0.0,
        backgroundColor: Colors.primaryColor,
    },
    headerTintColor: 'white',
    ...TransitionPresets.RevealFromBottomAndroid,
}

export default withNavigation(DepositScreen);