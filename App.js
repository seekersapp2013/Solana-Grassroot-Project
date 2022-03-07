import React from "react";
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import BottomTabBarScreen from "./component/bottomTabBarScreen";
import LoadingScreen from "./component/loadingScreen";
import TotalBalanceScreen from "./screens/balance/totalBalanceScreen";
import CurrencyScreen from "./screens/currency/currencyScreen";
import DepositScreen from "./screens/deposit/depositScreen";
import SuccessScreen from "./screens/success/successScreen";
import WithdrawScreen from "./screens/withdraw/withdrawScreen";
import WrongScreen from "./screens/wrong/wrongScreen";
import EditProfileScreen from "./screens/editProfile/editProfileScreen";
import BankDetailScreen from "./screens/bankDetail/bankDetailScreen";
import SupportScreen from "./screens/support/supportScreen";
import PrivacyPolicyScreen from "./screens/privacyPolicy/privacyPolicyScreen";
import SigninScreen from "./screens/auth/signinScreen";
import RegisterScreen from "./screens/auth/registerScreen";
import OTPScreen from "./screens/auth/otpScreen";
import SecurePinScreen from "./screens/auth/securePinScreen";
import SplashScreen from "./screens/splashScreen";

const switchNavigator = createSwitchNavigator({
  Loading: LoadingScreen,
  mainFlow: createStackNavigator({
    Splash: SplashScreen,
    SignIn: SigninScreen,
    Register: RegisterScreen,
    OTP: OTPScreen,
    SecurePin: SecurePinScreen,
    BottomTabScreen: BottomTabBarScreen,
    Currency: CurrencyScreen,
    Success: SuccessScreen,
    Wrong: WrongScreen,
    Balance: TotalBalanceScreen,
    Deposit: DepositScreen,
    Withdraw: WithdrawScreen,
    EditProfile: EditProfileScreen,
    BankDetail: BankDetailScreen,
    Support: SupportScreen,
    PrivacyPolicy: PrivacyPolicyScreen,
  }),
},
  {
    initialRouteName: 'Loading',
  });

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <App />
  );
};
