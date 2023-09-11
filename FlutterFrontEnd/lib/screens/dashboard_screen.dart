
import 'dart:convert';
import 'dart:developer';
import 'dart:io';
// import 'package:firebase_storage/firebase_storage.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter_front_end/widgets/employeesItem.dart';
import '../env.sample.dart';
import '../models/Employee.dart';
import '../globals.dart';
import '../models/Equipment.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import '../models/Student.dart';
import 'package:http/http.dart' as http;
import 'package:flutter/foundation.dart';


class DashboardScreen extends StatefulWidget {
  static String route = "DashboardScreen";
  const DashboardScreen({Key? key}) : super(key: key);

  @override
  State<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  late Future<List<dynamic>> users;
  late Student currentStudent;
  bool newestCheck=false;
  bool oldestCheck=false;
  bool availableCheck=false;
  bool soonToBeAvailableCheck=false;

  List cart=List.of(<Equipment>{});
  List equipmentList=List.of(<Equipment>{});
  List productId=List.of(<int>{});
  List categoryId=List.of(<int>{});
  List productImage=List.of(<AssetImage>{});
  List coverImage=List.of(<AssetImage>{});
  List productPrevPrice=List.of(<double>{});
  List productDiscPrice=List.of(<double>{});
  List productLabel=List.of(<String>{});
  List productRating=List.of(<double>{});

  int filter=-1; //no filter

  double heightOfModalBottomSheet=200;

  var equipmentData;
  void addToCart(Equipment product) {
    setState(() {
      cart.add(product);
    });
  }

  @override
  void initState() {
    super.initState();
    // getUser( uid: Globals.userCredential.user!.uid);
    // getUser();
  }

  Future getUser() async{

    var response = await http.get(

        defaultTargetPlatform==TargetPlatform.android ?  Uri.parse('${Env.URL_PREFIX}/api/users/'):Uri.parse("http://127.0.0.1:8000/api/users/")
      );
      // log("Response $response");
      var responseDecoded = jsonDecode(response.body) as Map<String, dynamic>;
      // log("Response $responseDecoded");
      var responseDecodedToUsers = responseDecoded["users"];
      // responseDecodedToUsers.forEach((element) {
      //   log("${element["userId"]} ${element["firstName"]}");
      //   var currentElement = jsonEncode(element);
      //   log("Current Element: ");
      //   log("${currentElement.toString()} \n");
      // });
      log("Platform android?: ${(defaultTargetPlatform==TargetPlatform.windows).toString()}");
      return responseDecodedToUsers;

    // var responseDecoded = jsonDecode(response.body) as Map<String, dynamic>;
    // var responseDecodedToUsers = responseDecoded["users"];
    // responseDecodedToUsers.forEach((element) {
    //   log("${element["userId"]} ${element["firstName"]}");
    //   var currentElement = jsonEncode(element);
    //   log("Current Element: ");
    //   log("${currentElement.toString()} \n");
    // });
    // return responseDecodedToUsers;


  }
  @override
  Widget build(BuildContext context) {

    return Scaffold(
      body: SafeArea(
        child:
        Container(
          color: const Color(0xff1d222b),
            child: Column(

              children: [
                Column(
                  mainAxisAlignment: MainAxisAlignment.start,
                  children:[
                  Container(
                    height: 40,
                    color: const Color(0xff1d222b),
                    padding: const EdgeInsets.only(left:8,right:8,bottom:0,top:5),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        IconButton(onPressed: (){
                          Scaffold.of(context).openDrawer();
                        }, icon:const Icon(Icons.menu, color: Colors.grey)
                        ),

                        Expanded(

                          child:Container(
                            padding: const EdgeInsets.only(right:40,top:5),
                            alignment: Alignment.center,
                            child:  const Text(
                              "Employees",
                              // style:Theme.of(context).textTheme.displayLarge,
                              style:TextStyle(color:Colors.white,fontWeight: FontWeight.w600, fontSize: 22.57),
                            ),
                          ),

                        ),


                      ],
                    ),
                  ),
                  Container(
                    height: 40,
                    margin: const EdgeInsets.only(bottom: 10),
                    child: const Divider(
                      color: Colors.grey,
                      height: 2,
                      thickness: 2,
                    ),
                  ),
                  Container(
                    height: 40,
                    padding: const EdgeInsets.only(left:10,right:10),
                    margin: const EdgeInsets.only(left:12,right:12,bottom:10),
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(10),
                      border: Border.all(color: const Color(0xff32373d),width: 2,),
                      color: Colors.white12,
                    ),
                    child: TextFormField(
                      decoration: InputDecoration(
                        labelStyle: const TextStyle(color:Colors.grey),
                        iconColor: Colors.grey,
                        labelText: "Filter",
                        prefixIcon:  InkWell(
                          onTap: ()async{
                            Scaffold.of(context).showBottomSheet((context){
                              return Builder(
                                  builder: (context) {
                                    return StatefulBuilder(
                                        builder: (context,setState) {
                                          return Container(
                                              color: const Color(0xff32373d),
                                              height:200,
                                              child:Column(
                                                children: [
                                                  Container(
                                                    alignment: Alignment.topCenter,
                                                    width: double.infinity,
                                                    margin: const EdgeInsets.only(left:20,right:20),
                                                    child: const Divider(
                                                      height: 5,
                                                      color: Color(0xff32373d),
                                                    ),
                                                  ),
                                                  Container(
                                                      margin: const EdgeInsets.all(20),
                                                      child: const Text("Filter",style: TextStyle(color: Colors.white12,fontWeight: FontWeight.w900,fontSize: 16),)
                                                  ),
                                                  SizedBox(
                                                    height:20,
                                                    child: Row(
                                                      children: [

                                                        Checkbox(
                                                            activeColor: const Color(0xffa17e66),
                                                            onChanged: (value){
                                                              setState(() {
                                                                newestCheck=value!;
                                                                filter=0;

                                                              });

                                                              if(newestCheck){
                                                                // newest_check=false;
                                                                oldestCheck=false;
                                                                availableCheck=false;
                                                                soonToBeAvailableCheck=false;
                                                              }

                                                            }, value: newestCheck),

                                                        const Text("Newest",style: TextStyle(color: Colors.white12,fontWeight: FontWeight.w700)),
                                                      ],
                                                    ),
                                                  ),
                                                  SizedBox(
                                                    height:20,

                                                    child: Row(
                                                      children: [

                                                        Checkbox(
                                                            activeColor: const Color(0xffa17e66),

                                                            onChanged: (value){
                                                              setState(() {
                                                                oldestCheck=value!;
                                                                filter=1;
                                                                getEquipmentData("equipment");
                                                              });
                                                              if(oldestCheck){
                                                                newestCheck=false;
                                                                availableCheck=false;
                                                                soonToBeAvailableCheck=false;
                                                              }
                                                            }, value: oldestCheck),

                                                        const Text("Oldest",style: TextStyle(color: Colors.white12,fontWeight: FontWeight.w700)),

                                                      ],
                                                    ),
                                                  ),
                                                  SizedBox(
                                                    height:20,
                                                    child: Row(
                                                      children: [

                                                        Checkbox( activeColor: const Color(0xffa17e66),

                                                            onChanged: (value){

                                                              setState(() {
                                                                filter=2;
                                                                availableCheck=value!;
                                                                getEquipmentData("equipment");

                                                              });
                                                              if(availableCheck){
                                                                newestCheck=false;
                                                                oldestCheck=false;
                                                                // price_high_to_low=false;
                                                                soonToBeAvailableCheck=false;

                                                              }
                                                            }, value: availableCheck),

                                                        const Text("Available",style: TextStyle(color: Colors.white12,fontWeight: FontWeight.w700)),
                                                      ],
                                                    ),
                                                  ),
                                                  SizedBox(
                                                    height:20,
                                                    child: Row(
                                                      children: [

                                                        Checkbox(
                                                            activeColor: const Color(0xffa17e66),
                                                            onChanged: (value){
                                                              setState(() {
                                                                filter=3;
                                                                soonToBeAvailableCheck=value!;
                                                                getEquipmentData("equipment");

                                                              });
                                                              if(soonToBeAvailableCheck){
                                                                newestCheck=false;
                                                                oldestCheck=false;
                                                                availableCheck=false;
                                                                // price_low_to_high=false;


                                                                log("price_low_to_high: $soonToBeAvailableCheck");
                                                              }
                                                              else{
                                                                log("price_low_to_high: $soonToBeAvailableCheck");
                                                              }
                                                            }, value: availableCheck),

                                                        const Text("Soon be Available",style: TextStyle(color: Colors.white12,fontWeight: FontWeight.w700)),
                                                      ],
                                                    ),
                                                  ),

                                                  Padding(
                                                    padding: const EdgeInsets.all(4.0),
                                                    child: Row(
                                                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                                      children: [
                                                        SizedBox(
                                                          height:25,
                                                          child: ElevatedButton(
                                                            style: ElevatedButton.styleFrom(
                                                                backgroundColor: Colors.white12,
                                                                elevation: 5.0,
                                                                side: const BorderSide(width: 2.0, color:Colors.white12)
                                                            ),
                                                            child: const Text(
                                                              'Cancel',
                                                              style: TextStyle(color:Colors.red,fontWeight: FontWeight.w700),
                                                            ),
                                                            onPressed: () {
                                                              Navigator.pop(context);
                                                            },
                                                          ),
                                                        ),
                                                        SizedBox(
                                                          height:25,
                                                          child: ElevatedButton(
                                                            style: ElevatedButton.styleFrom(
                                                                backgroundColor: Colors.white12,
                                                                elevation: 5.0,
                                                                side: const BorderSide(width: 2.0, color:Colors.white12)
                                                            ),
                                                            child: const Text(
                                                              'Apply',
                                                              style: TextStyle(color:Colors.green,fontWeight: FontWeight.w700),
                                                            ),
                                                            onPressed: () {
                                                              Navigator.pop(context);
                                                            },
                                                          ),
                                                        ),
                                                      ],
                                                    ),
                                                  ),
                                                ],
                                              )
                                          );
                                        }
                                    );
                                  }
                              );
                            });

                          },
                          child: Container(
                            width:15,
                            alignment: Alignment.centerLeft,
                            padding: const EdgeInsets.only(right:0.0),
                            child: const FaIcon(FontAwesomeIcons.sliders,size: 15,color:  Color(0xff32373d)),
                          ),
                        ),
                        border: InputBorder.none,
                      ),
                    ),
                  ),
                  ]
                ),
          FutureBuilder(
                      future:getUser(), builder: (BuildContext context, AsyncSnapshot<dynamic> snapshot) {
                    if (snapshot.hasData &&
                        snapshot.connectionState == ConnectionState.done) {
                        return

                          Expanded(
                          child: ListView.builder(

                          itemCount: snapshot.data!.length,
                          itemBuilder: (context, index) {
                            var currEmployee=Employee.fromJson(snapshot.data[index]);
                            log("Current Employee: ${currEmployee.firstName}");
                            return EmployeesItem(employee: currEmployee);

                            },
                          ),
                       );
                    }
                    child:
                    return const CircularProgressIndicator( color:Colors.grey);
                  }),

                  ],
            ),

        ),
      ),

    );
  }

  getEquipmentData(String collection) {

    // log("hit on data fetch");
    // setState(() {
    //   equipmentData=FirebaseDatabase.instance
    //       .ref()
    //       .child('equipments')
    //       .orderByChild('availableOn');
    //       // .limitToLast(10);
    //
    // });
    // return equipmentData;
  }








}


getEquipmentsImageDownloadUrl(String child1, child2) {
  // try {
  //   return FirebaseStorage.instance.ref().child(child1).child(child2).getDownloadURL();
  // } on Exception catch (e) {
  //   log("EquipmentsImageFetchException$e");
  // }
}