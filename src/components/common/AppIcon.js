import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Foundation from 'react-native-vector-icons/Foundation';

export const Icons = {
  MaterialCommunityIcons: 'MaterialCommunityIcons',
  MaterialIcons: 'MaterialIcons',
  Ionicons: 'Ionicons',
  Feather: 'Feather',
  FontAwesome5: 'FontAwesome5',
  FontAwesome: 'FontAwesome',
  AntDesign: 'AntDesign',
  Entypo: 'Entypo',
  SimpleLineIcons: 'SimpleLineIcons',
  Octicons: 'Octicons',
  Foundation: 'Foundation',
};

const AppIcon = ({type, name, size, color, style, onPress}) => {
  const fontSize = 25;
  return (
    <>
      {type === Icons.MaterialCommunityIcons && (
        <MaterialCommunityIcons
          name={name}
          size={size || fontSize}
          color={color}
          style={style}
          onPress={onPress}
        />
      )}
      {type === Icons.Ionicons && (
        <Ionicons
          name={name}
          size={size || fontSize}
          color={color}
          style={style}
          onPress={onPress}
        />
      )}
      {type === Icons.Feather && (
        <Feather
          name={name}
          size={size || fontSize}
          color={color}
          style={style}
          onPress={onPress}
        />
      )}
      {type === Icons.FontAwesome5 && (
        <FontAwesome5
          name={name}
          size={size || fontSize}
          color={color}
          style={style}
          onPress={onPress}
        />
      )}
      {type === Icons.FontAwesome && (
        <FontAwesome
          name={name}
          size={size || fontSize}
          color={color}
          style={style}
          onPress={onPress}
        />
      )}
      {type === Icons.AntDesign && (
        <AntDesign
          name={name}
          size={size || fontSize}
          color={color}
          style={style}
          onPress={onPress}
        />
      )}
      {type === Icons.Entypo && (
        <Entypo
          name={name}
          size={size || fontSize}
          color={color}
          style={style}
          onPress={onPress}
        />
      )}
      {type === Icons.MaterialIcons && (
        <MaterialIcons
          name={name}
          size={size || fontSize}
          color={color}
          style={style}
          onPress={onPress}
        />
      )}
      {type === Icons.SimpleLineIcons && (
        <SimpleLineIcons
          name={name}
          size={size || fontSize}
          color={color}
          style={style}
          onPress={onPress}
        />
      )}
      {type === Icons.Octicons && (
        <Octicons
          name={name}
          size={size || fontSize}
          color={color}
          style={style}
          onPress={onPress}
        />
      )}
      {type === Icons.Foundation && (
        <Foundation
          name={name}
          size={size || fontSize}
          color={color}
          style={style}
          onPress={onPress}
        />
      )}
    </>
  );
};

export default AppIcon;
