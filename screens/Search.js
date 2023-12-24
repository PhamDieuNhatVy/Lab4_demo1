import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, FlatList } from 'react-native';
import { FONTS, COLORS, SIZES } from '../constants';
import { categoriesData, myBooksData } from '../data';

const Search = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const filteredBooks = myBooksData.filter((book) => {
        return book.bookName.toLowerCase().includes(searchTerm.toLowerCase());
      });
      setResults(filteredBooks);
    };
    fetchResults();
  }, [searchTerm]);

  const renderSearchResults = () => {
    return (
      <FlatList
        data={results}
        renderItem={({ item }) => (
          <View style={{ flex: 1, padding: SIZES.padding }}>
            <Text style={{ ...FONTS.h2, color: COLORS.primary }}>{item.bookName}</Text>
            <Text style={{ ...FONTS.body3, color: COLORS.primary }}>{item.author}</Text>
          </View>
        )}
      />
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.black }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TextInput
          style={{
            width: '80%',
            height: 40,
            borderRadius: SIZES.radius,
            borderColor: COLORS.lightGray2,
            borderWidth: 1,
          }}
          placeholder="Tìm kiếm"
          onChangeText={(text) => setSearchTerm(text)}
        />
      </View>
      <ScrollView style={{ flex: 1 }}>
        {results.length > 0 ? renderSearchResults() : (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ ...FONTS.h2, color: COLORS.primary }}>Không tìm thấy kết quả nào</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Search;
