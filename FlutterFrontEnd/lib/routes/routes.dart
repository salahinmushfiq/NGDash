import 'package:flutter_front_end/screens/pattern_screen.dart';

import '/screens/dashboard_screen.dart';
import '/screens/cart_screen.dart';
import '/screens/category_screen.dart';
import '/screens/signup_screen.dart';
import '/screens/bottom_bar.dart';
import '/screens/signin_screen.dart';
import '/screens/search_screen.dart';



routes() {
  return {
    SignUpScreen.route: (context) => const SignUpScreen(),
    SignInScreen.route: (context) => const SignInScreen(),

    // MyBottomBar.route: (context) => MyBottomBar(),
    BottomBar.route: (context) => const BottomBar(),
    // HomeScreen.route: (context) => const HomeScreen(),
    DashboardScreen.route: (context) => const DashboardScreen(),
    CategoryScreen.route: (context) => const CategoryScreen(),
    CartScreen.route: (context) => CartScreen(),
    PatternScreen.route: (ctx) => const PatternScreen(),
    SearchScreen.route: (ctx) => const SearchScreen(),
    // SettingScreen.route: (ctx) => SettingScreen(),
  };
}
