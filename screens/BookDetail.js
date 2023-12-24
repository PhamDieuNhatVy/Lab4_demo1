import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Image, ScrollView, Animated } from 'react-native';
import { FONTS, COLORS, SIZES, icons } from '../constants';
import { categoriesData, myBooksData } from '../data';



const LineDivider = () => (
    <View style={{ width: 1, paddingVertical: 5 }}>
      <View style={{ flex: 1, borderLeftColor: COLORS.lightGray2, borderLeftWidth: 1 }}></View>
    </View>
  )

  const BookDetail = ({ route, navigation }) => {
    const [book, setBook] = useState(null);
    const [scrollViewWholeHeight, setScrollViewWholeHeight] = useState(1);
    const [scrollViewVisibleHeight, setScrollViewVisibleHeight] = useState(0);
    const indicator = new Animated.Value(0);
  
    useEffect(() => {
      const { book } = route.params;
      setBook(book)
    }, [route.params])

    const renderBookInfoSection = () => (
        <View style={{ flex: 1 }}>
          {/* Book Cover */}
          <View style={{ flex: 5, paddingTop: SIZES.padding2, alignItems: 'center' }}>
            <Image
              source={book.bookCover}
              resizeMode="contain"
              style={{
                flex: 1,
                width: 150,
                height: "auto",
              }}
            />
          </View>
      
          {/* Book Name and Author */}
          <View style={{ flex: 1.8, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ ...FONTS.h2, color: book.navTintColor }}>{book.bookName}</Text>
            <Text style={{ ...FONTS.body3, color: book.navTintColor }}>{book.author}</Text>
          </View>
      
          {/* Book Info */}
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: 20,
              margin: SIZES.padding,
              borderRadius: SIZES.radius,
              backgroundColor: "rgba(0,0,0,0.3)",
            }}
          >
            {/* Rating */}
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={{ ...FONTS.h3, color: COLORS.white }}>{book.rating}</Text>
              <Text style={{ ...FONTS.body4, color: COLORS.white }}>Rating</Text>
            </View>
      
            <LineDivider />
            
            {/* Pages */}
            <View style={{ flex: 1, paddingHorizontal: SIZES.radius, alignItems: 'center' }}>
              <Text style={{ ...FONTS.h3, color: COLORS.white }}>{book.pageNo}</Text>
              <Text style={{ ...FONTS.body4, color: COLORS.white }}>Number of Pages</Text>
            </View>
      
            <LineDivider />
      
            {/* Language */}
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={{ ...FONTS.h3, color: COLORS.white }}>{book.language}</Text>
              <Text style={{ ...FONTS.body4, color: COLORS.white }}>Language</Text>
            </View>
          </View>
        </View>
      )
      
      const renderBookDescription = () => {
        const indicatorSize =
          scrollViewWholeHeight > scrollViewVisibleHeight
            ? scrollViewVisibleHeight / scrollViewWholeHeight
            : scrollViewVisibleHeight;
      
        const difference =
          scrollViewVisibleHeight > indicatorSize ? scrollViewVisibleHeight - indicatorSize : 1;
      
        return (
          <View style={{ flex: 1, flexDirection: 'row', padding: SIZES.padding }}>
            {/* Custom Scrollbar */}
            <View style={{ width: 4, height: '100%', backgroundColor: COLORS.gray1 }} />
      
            <Animated.View
              style={{
                width: 4,
                height: indicatorSize,
                backgroundColor: COLORS.lightGray4,
                transform: [
                  {
                    translateY: Animated.multiply(
                      indicator,
                      scrollViewVisibleHeight / scrollViewWholeHeight
                    ).interpolate({
                      inputRange: [0, difference],
                      outputRange: [0, difference],
                      extrapolate: 'clamp',
                    }),
                  },
                ],
              }}
            />
          </View>
        )
      }
      

              const renderBottomButton = () => {
                return (
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    {/* Bookmark */}
                    <TouchableOpacity
                      style={{
                        width: 60,
                        backgroundColor: COLORS.secondary,
                        marginLeft: SIZES.padding,
                        marginVertical: SIZES.base,
                        borderRadius: SIZES.radius,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => console.log("Bookmark")}
                    >
                      <Image
                        source={icons.bookmark_icon}
                        resizeMode="contain"
                        style={{
                          width: 25,
                          height: 25,
                          tintColor: COLORS.lightGray2,
                        }}
                      />
                    </TouchableOpacity>
            
                    {/* Start Reading */}
                    <TouchableOpacity
                      style={{
                        flex: 1,
                        backgroundColor: COLORS.primary,
                        marginHorizontal: SIZES.base,
                        marginVertical: SIZES.base,
                        borderRadius: SIZES.radius,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => console.log("Start Reading")}
                    >
                      <Text style={{ ...FONTS.h3, color: COLORS.white }}>Start Reading</Text>
                    </TouchableOpacity>
                  </View>
                )
              }

              if (book) {
                return (
                  <View style={{ flex: 1, backgroundColor: COLORS.black }}>
                    {/* Book Cover Section */}
                    <View style={{ flex: 4 }}>
                      {renderBookInfoSection()}
                    </View>
            
                    {/* Description */}
                    <View style={{ flex: 2 }}>
                      {renderBookDescription()}
                    </View>
            
                    {/* Buttons */}
                    <View style={{ height: 70, marginBottom: 30 }}>
                      {renderBottomButton()}
                    </View>
                  </View>
                )
              } else {
                return <></>;
              }
            }

export default BookDetail;