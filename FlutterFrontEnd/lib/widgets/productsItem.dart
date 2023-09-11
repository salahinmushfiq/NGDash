import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import '../models/Products.dart';
import '/models/category.dart';
import 'package:flutter/material.dart';
class ProductsItem extends StatefulWidget {
  static String route = "ProductsItem";


  final Product product;
  const ProductsItem({Key? key,required this.product}): super(key: key);

  @override
  State<ProductsItem> createState() => _ProductsItemState();
}

class _ProductsItemState extends State<ProductsItem> {

  @override
  Widget build(BuildContext context) {

    return
      Container(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(10),
          border: Border.all(color: const Color(0xff32373d),width: 2,),
          color: const Color(0xff32373d),
        ),
        height: 90,

        margin: const EdgeInsets.only(left: 10.0,right:10.0,top: 5,bottom:5),
        padding: const EdgeInsets.only(left: 10.0,right:10.0,top: 5,bottom:5),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Container(
                alignment: Alignment.center,
                width: 50,
                decoration:
                BoxDecoration(
                  image: DecorationImage(
                    image: NetworkImage(
                      widget.product.thumbnail.toString(),
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
            SizedBox(width: 120,child: Text(widget.product.title.toString(),style: const TextStyle(color: Colors.white))),
            SizedBox(width: 120,child: Text(widget.product.category.toString(),style: const TextStyle(color: Colors.white),softWrap: false,)),
          ],
        ),
        // Text(widget.product.rating.toString()),
        Row(
           children:
           widget.product.rating%1==0 ?
           List.generate(widget.product.rating.toInt(), (index) => const Icon(FontAwesomeIcons.solidStar,color: Colors.white12,size: 12)).toList():
           List.generate(widget.product.rating.floor(), (index) => const Icon(FontAwesomeIcons.star,color: Colors.white12,size: 12)).toList(),
         ),
        Column(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          crossAxisAlignment: CrossAxisAlignment.end,
          children: [
            SizedBox(
              width: 100,
              child: Row(
                mainAxisSize: MainAxisSize.max,
                children: [
                  const SizedBox(child: Icon(FontAwesomeIcons.dollarSign,color: Colors.white12,size: 14)),
                  const SizedBox(width: 5),
                  SizedBox(width: 60,child: Text(((widget.product.price*(100-widget.product.discountPercentage))/100).toStringAsFixed(2),style: const TextStyle(color: Colors.white))),
                ],
              ),
            ),
            SizedBox(
              width: 100,
              child: Row(
                mainAxisSize: MainAxisSize.max,
                children: [
                  const SizedBox(child: Icon(FontAwesomeIcons.dollarSign,color: Colors.white12,size: 14,)),
                  const SizedBox(width: 5),
                  SizedBox(width: 60,child: Text(widget.product.price.toString()  ,style: const TextStyle(color: Colors.white12,decoration: TextDecoration.lineThrough))),
                ],
              ),
            )


                  // SizedBox(width: 75,child: Text(widget.Product.address.state.toString(),style: const TextStyle(color: Colors.white,fontSize: 10))),

          ],
        ),
        ]),
      );
  }

}