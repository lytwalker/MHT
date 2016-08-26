
# Users
User.destroy_all
User.create! [
  { username: "Tich", password: "thetruth" }
]

# Types
Type.destroy_all
types = Type.create! [
  { banner: "landscape", name: "Wigs", description: "Choose your Perfect style", url: "" },
  { banner: "landscape", name: "Extensions", description: "Get the longer look you want", url: "" },
  { banner: "landscape", name: "Closures", description: "Keep your look seamless", url: "" },
  { banner: "landscape", name: "Aftercare", description: "Look after your new look", url: "" },
  { banner: "landscape", name: "Deals", description: "More than you would expect", url: "" }
]

# Categories
Category.destroy_all
hairstyles = ["Full Lace", "Lace Front", "Human Hair", "Brazilian", "Peruvian", "Malaysian", "Mongolian", "Indian", "Cambodian", "Ombre"]
types.each do |type|
	5.times do
		Category.create! [ 
			{ 
				thumb: "thumbnail", 
				name: hairstyles.sample, 
				description: "Nunc mattis dignissim ante, non rhoncus orci porttitor ac. Interdum et malesuada fames ac ante ipsum primis in faucibus.", 
				url: "http://davids-restaurant.herokuapp.com/categories/81.json", 
				type_id: type.id },
		]
end

# Products
Product.destroy_all
cut = ["Curly Bob", "Straight", "Bodywave", "Loose Wave", "Loose Wave (Bob)", "Body Wave (U Part)", "Straight (U Part)", "Deep Wave", "Kinky Curly", "Kinky Straight"]
Category.all.each do |category|
	10.times { |index| 
		Product.create! [ 
			{ 
				thumb: "thumbnail", 
				preview: "protrait", 
				name: cut.sample + " #{index}", 
				description: "<table border=\"0\" cellpadding=\"10\" cellspacing=\"2\" style=\"width: 100%\">\n\t<tbody>\n\t\t<tr>\n\t\t\t<td>\n\t\t\t\tItem Type</td>\n\t\t\t<td>\n\t\t\t\tWig</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td>\n\t\t\t\tMaterial</td>\n\t\t\t<td>\n\t\t\t\tHuman Hair</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td>\n\t\t\t\tDensity</td>\n\t\t\t<td>\n\t\t\t\t130%, 150%</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td>\n\t\t\t\tCap Size</td>\n\t\t\t<td>\n\t\t\t\tSmall, Large, Average Size</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td>\n\t\t\t\tNet Weight</td>\n\t\t\t<td>\n\t\t\t\t160g~225g</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td>\n\t\t\t\tBase Material</td>\n\t\t\t<td>\n\t\t\t\tSwiss Lace</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td>\n\t\t\t\tWigs Length</td>\n\t\t\t<td>\n\t\t\t\tShort Medium Long</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td>\n\t\t\t\tColor Type</td>\n\t\t\t<td>\n\t\t\t\tPure Color</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td>\n\t\t\t\tSuitable Dying Colors</td>\n\t\t\t<td>\n\t\t\t\tAll Colors</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td>\n\t\t\t\tColor of Lace</td>\n\t\t\t<td>\n\t\t\t\tMedium Brown</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td>\n\t\t\t\tTexture</td>\n\t\t\t<td>\n\t\t\t\tKinky Curly</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td>\n\t\t\t\tMade Method</td>\n\t\t\t<td>\n\t\t\t\tHand Tied</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td>\n\t\t\t\tCan Be Permed</td>\n\t\t\t<td>\n\t\t\t\tYes</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td>\n\t\t\t\tHuman Hair Type</td>\n\t\t\t<td>\n\t\t\t\tBrazilian Hair</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td>\n\t\t\t\tMaterial Grade</td>\n\t\t\t<td>\n\t\t\t\tVirgin Hair</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td>\n\t\t\t\tHair Grade</td>\n\t\t\t<td>\n\t\t\t\t7A</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td>\n\t\t\t\tHair texture</td>\n\t\t\t<td>\n\t\t\t\tExactly as seen in pictures</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td>\n\t\t\t\tHigh quality human hair lace wigs</td>\n\t\t\t<td>\n\t\t\t\tHuman Hair Lace Wigs No Tangle No Shedding</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td>\n\t\t\t\tHair Length</td>\n\t\t\t<td>\n\t\t\t\t10&quot;~24&quot; in stock</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td>\n\t\t\t\tFree shipping</td>\n\t\t\t<td>\n\t\t\t\tFast Delivery by DHL Free Shipping</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td>\n\t\t\t\tCap Size</td>\n\t\t\t<td>\n\t\t\t\tSmall (circumference 21-21.5inch), medium (22-22.5), large (23.5)</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td>\n\t\t\t\tBleached Knots</td>\n\t\t\t<td>\n\t\t\t\tYes, Very Natural Hairline</td>\n\t\t</tr>\n\t</tbody>\n</table>", 
				price: [*0..500].sample, 
				sku: "",
				category_id: category.id },
		]
	}
	end
end