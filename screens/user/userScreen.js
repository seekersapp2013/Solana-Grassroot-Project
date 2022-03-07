import React, { Component } from "react";
import { Text, View, SafeAreaView, StatusBar, Image, StyleSheet } from "react-native";
import { Fonts, Colors, Sizes } from "../../constants/styles";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Dimensions } from "react-native";
import { ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import Dialog from "react-native-dialog";

class UserScreen extends Component {
    state = {
        showLogoutDialog: false,
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#F2F4F6' }}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1, paddingBottom: Sizes.fixPadding * 6.0 }}>
                    <ScrollView>
                        {userInfo()}
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => this.props.navigation.navigate('EditProfile')}
                        >
                            {informations(
                                {
                                    icon: <Ionicons name="person-sharp" size={26} color="black" />,
                                    title: 'Edit Profile',
                                    description: 'Edit your profile'
                                }
                            )}
                        </TouchableOpacity>
                        {divider()}
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => this.props.navigation.navigate('BankDetail')}
                        >
                            {informations(
                                {
                                    icon: <MaterialCommunityIcons name="bank" size={29} color="black" />,
                                    title: 'Bank Details',
                                    description: 'This account is used to facilitate all your deposits and withdrawals'
                                }
                            )}
                        </TouchableOpacity>

                        <View style={{ marginVertical: Sizes.fixPadding }}>
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => this.props.navigation.navigate('Support')}
                            >
                                {informations(
                                    {
                                        icon: <MaterialIcons name="headset-mic" size={29} color="black" />,
                                        title: 'Help & Support',
                                        description: 'Create a ticket and we will contact you'
                                    }
                                )}
                            </TouchableOpacity>
                            {divider()}
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => this.props.navigation.navigate('PrivacyPolicy')}
                            >
                                {informations(
                                    {
                                        icon: <MaterialIcons name="privacy-tip" size={29} color="black" />,
                                        title: 'Privacy Policy',
                                        description: 'How we work & use your data'
                                    }
                                )}
                            </TouchableOpacity>

                            {divider()}
                            {informations(
                                {
                                    icon: <Ionicons name="star-outline" size={27} color="black" />,
                                    title: 'Rate Us',
                                    description: 'Tell us what you think'
                                }
                            )}
                        </View>
                        {informations(
                            {
                                icon: <MaterialCommunityIcons name="android" size={29} color="black" />,
                                title: 'About CryptoX',
                                description: 'v1.0.0'
                            }
                        )}
                        {this.logout()}
                    </ScrollView>
                    {this.logOutDialog()}
                </View>
            </SafeAreaView>
        )
    }

    logOutDialog() {
        return (
            <Dialog.Container visible={this.state.showLogoutDialog}
                contentStyle={styles.logoutDialogContainerStyle}
            >
                <View style={{ backgroundColor: 'white', alignItems: 'center', }}>
                    <Text style={{ ...Fonts.black19Bold, paddingBottom: Sizes.fixPadding - 5.0, }}>
                        You sure want to logout?
                    </Text>
                    <View style={styles.cancelAndLogoutButtonContainerStyle}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => this.setState({ showLogoutDialog: false })}
                            style={styles.cancelButtonStyle}
                        >
                            <Text style={{ ...Fonts.black16Medium }}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.9}
                            onPress={() => {
                                this.setState({ showLogoutDialog: false })
                                this.props.navigation.push('SignIn')
                            }}
                            style={styles.logOutButtonStyle}
                        >
                            <Text style={{ ...Fonts.white16Medium }}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Dialog.Container>
        )
    }

    logout() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.setState({ showLogoutDialog: true })}
                style={{
                    backgroundColor: Colors.whiteColor,
                    marginTop: Sizes.fixPadding,
                    marginBottom: Sizes.fixPadding * 3.0
                }}>
                <View style={styles.informationContainerStyle}>
                    <View style={styles.iconContainerStyle}>
                        <MaterialCommunityIcons name="login-variant" size={29} color="black" />
                    </View>
                    <Text style={{ ...Fonts.red17SemiBold, marginLeft: Sizes.fixPadding + 5.0, }}>
                        Logout
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

}

function userInfo() {
    return (
        <View style={{ alignItems: 'center', marginVertical: Sizes.fixPadding * 2.0 }}>
            <View>
                <Image
                    source={require('../../assets/images/user/user_14.jpg')}
                    style={{ height: 110.0, width: 110.0, borderRadius: 55.0 }}
                    resizeMode="contain"
                />
                <View style={styles.imageVerifySignContainerStyle}>
                    {<MaterialCommunityIcons name="check" size={24} color={Colors.whiteColor} />}
                </View>
            </View>
            <Text style={{ ...Fonts.gray15Medium, marginTop: Sizes.fixPadding }}>
            </Text>
            <Text style={{ ...Fonts.black19Bold, marginVertical: Sizes.fixPadding - 5.0 }}>
                Prter Jones
            </Text>
            <Text style={{ ...Fonts.gray16Medium }}>
                +1 123456987
            </Text>
        </View>
    )
}

function divider() {
    return <View style={{ height: 1.0, backgroundColor: "#EEEFF0" }}></View>
}

const { width } = Dimensions.get('screen');

function informations({ icon, title, description }) {
    return (
        <View style={{ backgroundColor: Colors.whiteColor }}>
            <View style={styles.informationContainerStyle}>
                <View style={styles.iconContainerStyle}>
                    {icon}
                </View>
                <View style={{ marginLeft: Sizes.fixPadding + 5.0 }}>
                    <Text style={{ ...Fonts.black16SemiBold }}>
                        {title}
                    </Text>
                    <Text style={{ ...Fonts.gray15Medium, }}>
                        {description}
                    </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create(
    {
        imageVerifySignContainerStyle: {
            position: 'absolute',
            bottom: 5.0,
            right: 0.0,
            backgroundColor: Colors.greenColor,
            borderWidth: 2.0,
            borderColor: Colors.whiteColor,
            width: 30.0,
            height: 30.0,
            borderRadius: 15.0,
            alignItems: 'center'
        },
        informationContainerStyle: {
            flexDirection: "row",
            backgroundColor: Colors.whiteColor,
            alignItems: 'center',
            paddingVertical: Sizes.fixPadding + 5.0,
            width: width - 40.0,
            alignSelf: 'center',
        },
        iconContainerStyle: {
            width: 30.0,
            height: 30.0,
            alignItems: 'center',
            justifyContent: 'center',
        },
        logoutDialogContainerStyle: {
            borderRadius: Sizes.fixPadding,
            width: width - 90,
            paddingHorizontal: Sizes.fixPadding * 3.0,
            paddingTop: -Sizes.fixPadding,
            paddingBottom: Sizes.fixPadding * 2.0
        },
        cancelButtonStyle: {
            flex: 0.50,
            backgroundColor: Colors.whiteColor,
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: Sizes.fixPadding,
            marginRight: Sizes.fixPadding,
            borderColor: Colors.primaryColor,
            borderWidth: 1.0,
            borderRadius: Sizes.fixPadding
        },
        logOutButtonStyle: {
            flex: 0.50,
            backgroundColor: Colors.primaryColor,
            borderRadius: Sizes.fixPadding,
            paddingVertical: Sizes.fixPadding,
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: Sizes.fixPadding
        },
        cancelAndLogoutButtonContainerStyle: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: Sizes.fixPadding * 2.0
        }
    }
)

export default withNavigation(UserScreen);