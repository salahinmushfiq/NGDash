import 'package:font_awesome_flutter/font_awesome_flutter.dart';

import '../models/Employee.dart';
import '/models/category.dart';
import 'package:flutter/material.dart';
class EmployeesItem extends StatefulWidget {
  static String route = "EmployeesItem";


  final Employee employee;
  const EmployeesItem({Key? key,required this.employee}): super(key: key);

  @override
  State<EmployeesItem> createState() => _EmployeesItemState();
}

class _EmployeesItemState extends State<EmployeesItem> {

  @override
  Widget build(BuildContext context) {
    return Container(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(10),
          border: Border.all(color: const Color(0xff32373d),width: 2,),
          color: const Color(0xff32373d),
        ),
        height: 80,

        margin: const EdgeInsets.only(left: 18.0,right:18.0,top: 10,bottom:10),
        padding: const EdgeInsets.only(left: 18.0,right:18.0,top: 10,bottom:10),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Container(
                alignment: Alignment.center,
                width: 50,

                decoration:
                BoxDecoration(
                  image: DecorationImage(
                    image: NetworkImage(
                      widget.employee.image.toString(),
                    ),
                    fit: BoxFit.cover,
                  ),
                  border: Border.all(
                    color: const Color(0xff32373d),
                    width: 0,
                  ),
                  borderRadius: const BorderRadius.all(
                      Radius.circular(5)),

                ),
              ),
        Column(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [
            SizedBox(width: 140,child: Text(widget.employee.firstName.toString(),style: const TextStyle(color: Colors.white))),
            SizedBox(width: 140,child: Text(widget.employee.email.toString(),style: const TextStyle(color: Colors.white),softWrap: false,)),
          ],
        ),
        Column(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          crossAxisAlignment: CrossAxisAlignment.end,
          children: [
            SizedBox(
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const SizedBox(width: 40,child: Icon(FontAwesomeIcons.locationDot,color: Colors.white12,size: 20)),
                  SizedBox(width: 80,child: Text(widget.employee.address.city.toString(),style: const TextStyle(color: Colors.white))),
                ],
              ),
            ),

            SizedBox(width: 80,child: Text("${widget.employee.address.address} , ${widget.employee.address.state}",style: const TextStyle(color: Colors.white,fontSize: 10))),
                  // SizedBox(width: 75,child: Text(widget.employee.address.state.toString(),style: const TextStyle(color: Colors.white,fontSize: 10))),

          ],
        ),
        ]),
      );
  }

}