import 'dart:developer';

import 'package:flutter_front_end/screens/pattern_screen.dart';
import 'package:flutter_front_end/screens/products_screen.dart';

import '../globals.dart';
import '../models/Student.dart';
import '/screens/dashboard_screen.dart';
import '/screens/signin_screen.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import '/screens/cart_screen.dart';
import '/screens/category_screen.dart';
import '/screens/search_screen.dart';
import 'package:flutter/material.dart';
import 'account_screen.dart';
import 'package:fluid_bottom_nav_bar/fluid_bottom_nav_bar.dart';

class BottomBar extends StatefulWidget {
  static String route = 'BottomBar';
  const BottomBar({Key? key}) : super(key: key);

  @override
  TestBottomBarState createState() => TestBottomBarState();
}

class TestBottomBarState extends State<BottomBar> {

  int _currentIndex = 0;
  String studentName="Placeholder";
  String studentID="Placeholder";
  // final GlobalKey<ScaffoldState> _scaffoldKey = new GlobalKey<ScaffoldState>();
  final List<Widget> _children = [
    // HomeScreen(),
    const DashboardScreen(),
    const ProductsScreen(),
    const SearchScreen(),
    const PatternScreen(),
    const AccountScreen(),
  ];
  @override
  void initState() {
    super.initState();

    // log("price_low_to_high from Dashboard: ${Globals.soonToBeAvailableCheck}");
    // getCurrentStudent();
    // getProfileImageDownloadUrl();
  }
  void onBottomBarTap(int index) {
    setState(() {
      _currentIndex = index;
    });
  }
  logout() async{
    // await FirebaseAuth.instance.signOut();
  }
  getCurrentStudent(){

    // DatabaseReference studentsRef = FirebaseDatabase.instance.ref("students");
    // studentsRef.once().then((studentListNodeEvent) {
    //   log("Student fetching started in bottom bar");
    //   // fetched current logged in student from uid taken from sign in and get the whole student node under that uid
    //   // store it as an Student object
    //   DataSnapshot currentStudentQuery = studentListNodeEvent.snapshot.children
    //       .singleWhere((studentDataSnapshot) =>
    //   Student
    //       .fromJson(studentDataSnapshot.value as Map)
    //       .uid == Globals.userCredential.user!.uid
    //   );
    //   if (currentStudentQuery.exists){
    //
    //     log("Student Name ${Student
    //         .fromJson(currentStudentQuery.value as Map)
    //         .name}");
    //     setState(() {
    //       currStudent = Student.fromJson(currentStudentQuery.value as Map);
    //       studentName = currStudent.name;
    //       studentID = currStudent.studentID;
    //     });
    //   }
    // });

  }

  @override
  Widget build(BuildContext context) {

    final fluidNavBarIcons = <FluidNavBarIcon>[FluidNavBarIcon(svgPath: "assets/images/home.svg"),FluidNavBarIcon(svgPath: "assets/images/person.svg"),FluidNavBarIcon(svgPath: "assets/images/queue2.svg"),FluidNavBarIcon(svgPath: "assets/images/queue.svg"),FluidNavBarIcon(svgPath: "assets/images/person.svg")];
    return Scaffold(

      drawer:  Drawer(
        child: Container(
          color: const Color(0xff32373d),
          child: Column(
            children: [
              const SizedBox(height:50),
                const CircleAvatar(
                radius: 50,
                foregroundImage: AssetImage("assets/images/profile_pic.jpeg"),
              ),
              // SizedBox(
              //   height:400,
              //   child: Column(
              //     mainAxisAlignment: MainAxisAlignment.start,
              //     children: [
              //
              //       const Divider(color: Color(0xff343148),thickness: 1),
              //       Expanded(
              //         child: InkWell(
              //           onTap: (){},
              //           child: Container(
              //             color:const Color(0xffD7C49E),
              //               alignment: Alignment.center,
              //               width:double.infinity,
              //               child: Text(studentID,style: const TextStyle(color:Color(0xff343148),fontWeight: FontWeight.w800 ),),
              //           ),
              //
              //       ),
              //       ),
              //       const Divider(color: Color(0xff343148),thickness: 1),
              //       Expanded(
              //         child: InkWell(
              //           splashColor: const Color(0xffc9a697),
              //           onTap: (){},
              //           child: Container(
              //             color:const Color(0xffD7C49E),
              //             alignment: Alignment.center,
              //             width:double.infinity,
              //             child: const Text("Contacts",style: TextStyle(color:Color(0xff343148),fontWeight: FontWeight.w800 ),),
              //           ),
              //
              //         ),
              //       ),
              //       const Divider(color: Color(0xff343148),thickness: 1,height: 1,),
              //       const SizedBox(height:100),
              //
              //     ],
              //   ),
              // ),
              Expanded(
                child: Align(
                  alignment: FractionalOffset.bottomCenter,
                  child:
                      // Text("Sign Out",style: TextStyle(color:Color(0xffc9a697),fontWeight: FontWeight.w800 ),),
                      IconButton(
                        onPressed: () {
                          logout();
                          Navigator.pushNamed(context, SignInScreen.route);

                        }, icon: const FaIcon(FontAwesomeIcons.powerOff), color: Colors.white12,
                      ),

                ),
              ),
            ],
          ),
        ),
      ),
      body: _children[_currentIndex],
      bottomNavigationBar: Container(
        color: const Color(0xff1d222b),
        child: FluidNavBar(

                   style: const FluidNavBarStyle(
                       barBackgroundColor: Colors.white12,
                       iconBackgroundColor: Colors.white12,

                       // iconSelectedForegroundColor: Colors.deepOrangeAccent,
                       iconSelectedForegroundColor: Colors.white,
                       iconUnselectedForegroundColor:Colors.grey,
                   ),
                  onChange: onBottomBarTap,

                  icons: fluidNavBarIcons,



        ),
      ),
    );
  }
}

