import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { FONTS, COLORS, SIZES } from '../constants';

const Setting = ({ navigation }) => {
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [pushNotificationsEnabled, setPushNotificationsEnabled] = useState(true);

  const toggleDarkMode = () => setDarkModeEnabled(!darkModeEnabled);
  const togglePushNotifications = () => setPushNotificationsEnabled(!pushNotificationsEnabled);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: COLORS.black }}>
      <View style={{ flex: 1, padding: SIZES.padding }}>
        <Text style={{ ...FONTS.h2, color: COLORS.primary }}>Cài đặt chung</Text>

        {/* Dark Mode Setting */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: SIZES.padding }}>
          <Text style={{ ...FONTS.body3, color: COLORS.primary }}>Chế độ tối</Text>
          <Switch
            trackColor={{ false: COLORS.lightGray2, true: COLORS.primary }}
            thumbColor={darkModeEnabled ? COLORS.white : COLORS.lightGray3}
            onValueChange={toggleDarkMode}
            value={darkModeEnabled}
          />
        </View>

        {/* Push Notification Setting */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: SIZES.padding }}>
          <Text style={{ ...FONTS.body3, color: COLORS.primary }}>Thông báo đẩy</Text>
          <Switch
            trackColor={{ false: COLORS.lightGray2, true: COLORS.primary }}
            thumbColor={pushNotificationsEnabled ? COLORS.white : COLORS.lightGray3}
            onValueChange={togglePushNotifications}
            value={pushNotificationsEnabled}
          />
        </View>

        {/* Add more settings based on your needs here ... */}

        {/* Logout Button */}
        <TouchableOpacity
          style={{
            marginTop: SIZES.padding,
            padding: SIZES.padding,
            backgroundColor: COLORS.primary,
            borderRadius: SIZES.radius,
          }}
          onPress={() => {
            // Implement logout functionality
            navigation.navigate('Login');
          }}
        >
          <Text style={{ ...FONTS.h3, color: COLORS.white }}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Setting;
