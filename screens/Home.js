import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Flatlist, ScrollView } from 'react-native';

import firestore from '@react-native-firebase/firestore';

import storage from '@react-native-firebase/storage'; 
import { categoriesData, myBooksData } from '../data';

import { COLORS, FONTS, SIZES, icons} from '../constants';

import { useEffect, useState } from 'react';

import { Button, Icon} from 'react-native-paper';

    const initial =()=>
    {

        const admin={

        userName: "huutv@tdmu.edu.vn",

        password: "123",

        point: 200,

        address: "Binh Duong",

        role: "user",
        }
    

        Users.doc(admin.userName).set(admin)

        then (()=>console.log("Add new user!"))

        myBooksData.forEach(b=> {

        const path = "bookstore/"+b.bookCover;

        //console.log(path)

        storage().ref(path).getDownloadURL()

        .then(url =>

        {

        b.bookCover = url;

        Books.doc(b.id+'').set(b)

        .then(()=> console.log("Add new books!"))

        .catch((e) => console.log("wfw" +e))

        }

        )

        .catch(e => console.log("error: " + e))
    })

        categoriesData.map(c => {

            Categories.doc(c.id+"").set(c)

            .then(()=> console.log("Add new Categories!"))

    })

    }
    export default App =()=>{

            //initial()
            
            const [profileData, setProfileData]= useState({})
            
            const [booksData, setBooksData] = useState([])
            
            const [categoriesData, setCategoriesData]= useState([])
            
            useEffect (()=>{
            
            Users.doc("huutv@tdmu.edu.vn")
            
            .onSnapshot((u)=> setProfileData(u.data()))
            
            Books
            
            .onSnapshot (
            
            (lstBooks)=>
            {
                const result=[]
                
                lstBooks.forEach(b=>result.push(b.data()))
                
                setBooksData(result)
            }
            
            )
            
            Categories.get()
            
            .then(lstCategories =>
                {
            
                    const result=[]
                    
                    lstCategories.forEach(c => result.push(c.data()))
                    
                    setCategoriesData(result)
                }
                    
        )
    }, [])
    //console.log("Test2", booksData)
                
    //console.log(categoriesData)
const renderHeader =(profile)=>
{

    return (

    <View style={{flex: 1, flexDirection: row, paddingHorizontal: SIZES.padding, alignItems: 'center' }}>

        {/ Greetings */}

        <View style={{ flex: 1 }}>

        <View style={{ marginRight: SIZES.padding}}>

            <Text style={{... FONTS.h3, color: COLORS.white}}> Good Morning</Text>
<Text style={{...FONTS.h2, color: COLORS.white }}>{profile.userName}</Text>

        </View>

    </View>

    {/* Points */}

    <Button

    icon="plus-circle"

    mode="contained" onPress={() => console.log('Pressed')}

    style={{backgroundColor:COLORS.primary}}
    >

        {profile.point} point

    </Button>

    </View>
    )
}

const renderButtonSection =()=>
{
    return(

    <View style={{flex: 1, justifyContent: 'center', padding: SIZES.padding}}>

    <View style={{ flexDirection: row, height: 70, backgroundColor: COLORS.secondary, borderRadius: SIZES.cadius }}>

    <Button

        mode="text"

        icon={()=> <Icon source={icons.claim_icon} size ={25}/>}

        onPress={()=> console.log('Pressed')} 
        style={{justifyContent: "center"}}
        >

        <Text style={{fontSize:15, color: COLORS.white}}> Claim </Text>

    </Button>

    <LineDivider/>

    <Button

        mode="text"

        icon={()=> <Icon source={icons.point_icon}size={25}/> }

        onPress ={() =>console.log('Pressed')}

        style={{justifyContent: "center"}}

    >

        <Text style={{fontSize:15, color: COLORS.white}}> Get Point</Text>

    </Button>

    <LineDivider/>

    <Button

        mode="text"

        icon={()=> <Icon source={icons.card_icon} size={25}/>}

        onPress={() => console.log('Pressed')}

        style={{justifyContent: "center"}}
    >

        <Text style={{fontSize:15, color: COLORS.white}}>My Card </Text>

    </Button>

        </View>

    </View>
    )
}


const renderMyBookSection = (booksData) => {
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          style={{ flex: 1, marginLeft: SIZES.padding, marginRight: SIZES.radius }}
          onPress={() => navigation.navigate("BookDetail", { book: item })}
        >
          {/* Book Cover */}
          <Image source={{ uri: item.bookCover }} resizeMode="cover" style={{ width: 180, height: 250, borderRadius: 20 }} />

          {/* Book Info */}
          <View style={{ marginTop: SIZES.radius, flexDirection: "row", alignItems: "center" }}>
            <Button icon={() => <Icon source={icons.clock_icon} size={25} color={COLORS.lightGray} />} textColor={COLORS.lightGray}>
              {item.lastRead}
            </Button>
            <Button icon={() => <Icon source={icons.clock_icon} size={25} color={COLORS.lightGray} />} textColor={COLORS.lightGray}>
              {item.completion}
            </Button>
          </View>
        </TouchableOpacity>
      )
    }

    return (

        <View styles={{flex: 1}}>

            <View style= {{paddingpiorizontal: SIZES.padding, flexDirection: 'row', JustifyContent: 'space-between'}}>

                <Text styles={{...FONTS.h2, color: COLORS.white}}>My Book </Text> 
                <Button mode= "test" onPress={()=> console.log("See more")}

                labelStyle= {{color: COLORS.lightGray, textDecorationLine:"underline"}}
            >

            See more
</Button>
        </View>

    <View style= {{flex: 1, marginTop: SIZES.padding}}>
        <FlatList
          data={booksData}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
    )
  }

    const [selectedCategory, setSelectedCategory] =useState(1)
    const renderCategoryHeader = () => {
        const renderItem = ({ item }) => (
          <Button
            mode="text"
            labelStyle={{ ...FONTS.h2, color: selectedCategory === item.id ? COLORS.white : COLORS.lightGray }}
            onPress={() => setSelectedCategory(item.id)}
          >
            {item.categoryName}
          </Button>
        );

        return (
            <View style={{ flex: 1, paddingLeft: SIZES.padding }}>
              <FlatList
                data={categoriesData}
                renderItem={renderItem}
                keyExtractor={(item) => `${item.id}`}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>
          );
        };
        const renderCategoryData = (booksData) => 
        {
            var books=[]
            let selectedCategoryBooks =categoriesData.filter(a=> a.id ==selectedCategory)     ;
            if (selectedCategoryBooks.length > 0) {
                selectedCategoryBooks[0].books.forEach(id=> books.push(booksData.filter(a=>a.id==id)[0])
                )
            }

   
            const renderItem = ({ item }) => {
                return (
                    <View style={{marginVertical: SIZES.base}}>
                        <TouchableOpacity
                        style={{ flex: 1, marginLeft: SIZES.padding, marginRight: SIZES.radius }}
                        onPress={() => navigation.navigate('BookDetail', { book: item })}
                        >
                      {/*Book Cover*/}      
                  <Image source={{ uri: item.bookCover }} resizeMode="cover" style={{ width: 100, height: 150, borderRadius: 10 }} />
                  <View style={{flex:1,marginLeft: SIZES.radius}}>
                    {/*Book name and author*/}
                    <View>
                  <Text style={{ paddingRight: SIZES.padding, ...FONTS.h2, color: COLORS.white }}>{item.bookTitle}</Text>
                  <Text style={{ ...FONTS.body3, color: COLORS.lightGray }}>{item.author}</Text>
                  </View>
                {/* Book Info */}

                <View style={{ flexDirection:'row', marginTop: SIZES.radius }}>

                <Button

                icon={()=> <Icon source={icons.page_filled_icon} size={25}color={COLORS.lightGray}/>}

                textColor={COLORS.lightGray}

                >{item.pageNo}</Button>

                <Button

                icon={()=> <Icon source={icons.read_icon} size={25} color ={COLORS.lightGray}/>}

                textColor={COLORS.lightGray}
>{item.readed}</Button>

                </View>

                {/* Genre */}

                <View style={{ flexDirection: 'row', marginTop: SIZES.base }}>
                    {

                        item.genre.includes("Adventure") &&

                        <View style={{justifyContent: 'center', alignItems: 'center', padding: SIZES.base, marginRight: SIZES.base,

                        backgroundColor: COLORS.darkGreen, height: 40, borderRadius: SIZES.radius }}>

                        <Text style={{...FONTS.body3, color: COLORS.lightGreen }}>Adventure</Text>

                        </View>
                    }
                    {

                        item.genre.includes ("Romance") &&

                        <View style={{justifyContent: 'center', alignItems: 'center', padding: SIZES.base, marginRight: SIZES.base,

                        backgroundColor: COLORS.darkRed, height: 48, borderRadius: SIZES.radius}}>

                        <Text style={{...FONTS.body3, color: COLORS.lightRed }}> Romance</Text>

                        </View>
                    }
                    {

                        item.genre.includes ("Drama") &&

                        <View style={{justifyContent: 'center', alignItems: 'center', padding: SIZES.base, marginRight: SIZES.base, 
                        backgroundColor: COLORS.darkBlue, height: 40, borderRadius: SIZES.radius }}>

                        <Text style={{...FONTS.body3, color: COLORS.lightBlue }}>Drama</Text>

                        </View>
                    }

                </View>

            </View>

            </TouchableOpacity>

        </View>

    )

}      
              return (
                <View style={{ flex: 1, marginTop: SIZES.base }}>
                  <FlatList
                    data={selectedCategoryBooks}
                    renderItem={renderItem}
                    keyExtractor={(item) => `${item.id}`}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                  />
                </View>
              );
            }
          
  return (
    <SafeAreaView style={{ ...styles.container, backgroundColor: COLORS.black }}>
      {/* Header session */}
      <View style={{ height: 200 }}>
        {renderHeader(profileData) }
        {renderButtonSection() }
      </View>

      {/* Book section */}
      <ScrollView style={{ marginTop: SIZES.radius }}>
        {/* Books Section */}
        {renderMyBookSection(booksData) }
        

        {/* Categories Section */}
        <View style={{ marginTop: SIZES.padding }}>
          {renderCategoryHeader()}
          {renderCategoryData()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = {
  container: {
    flex: 1,
  },
  // Add other styles as needed
};