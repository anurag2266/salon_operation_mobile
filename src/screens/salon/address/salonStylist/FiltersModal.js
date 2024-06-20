import {View, Text, TouchableOpacity, StyleSheet, Modal} from 'react-native';
import React, {useState} from 'react';
import ScrollContainer from '../../../../components/common/ScrollContainer';
import AppIcon from '../../../../components/common/AppIcon';
import {normalize, vh, vw} from '../../../../utils/dimensions';
import theme from '../../../../theme/theme';
import {MultiSelect} from 'react-native-element-dropdown';

const FiltersModal = ({visible = false, setVisible}) => {
  const [category, setcategory] = useState([]);

  const data = [
    {
      id: 1,
      label: 'Hair',
    },
    {
      id: 2,
      label: 'Skin',
    },
    {
      id: 3,
      label: 'Makeup',
    },
  ];

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={setVisible}>
      <View style={{width: '90%', height: '100%'}}>
        <ScrollContainer>
          <View style={styles.headerView}>
            <Text style={styles.filterTxt}>Filters</Text>
            <TouchableOpacity>
              <Text style={styles.clearAllTxt}>Clear All</Text>
            </TouchableOpacity>
            <AppIcon
              onPress={setVisible}
              name={'close'}
              type={'AntDesign'}
              size={13}
              style={styles.close}
            />
          </View>
          <View style={styles.bottomWidth}></View>
          <MultiSelect
            style={[styles.input, {height: vh(55)}]}
            inputStyle={styles.inputStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            placeholderStyle={styles.placeholderStyle}
            data={data}
            search
            labelField="label"
            valueField="lablel"
            placeholder="Set Staff"
            searchPlaceholder="Search"
            value={category}
            onChange={item => {
              setcategory(item);
            }}
          />
        </ScrollContainer>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  headerView: {
    flexDirection: 'row',
    marginHorizontal: vw(34),
    marginTop: vh(30),
  },
  filterTxt: {
    fontFamily: theme.font.bold,
    fontSize: normalize(18),
    color: theme.color.black,
  },
  clearAllTxt: {
    fontFamily: theme.font.medium,
    fontSize: normalize(16),
    color: theme.color.black,
    marginHorizontal: vw(18),
    marginVertical: vh(2),
  },
  close: {
    marginLeft: vw(149),
    marginVertical: vh(8),
    color: theme.color.dropdownColor,
  },
  bottomWidth: {
    borderBottomWidth: 1,
    marginLeft: vw(28),
    marginVertical: vh(15),
    borderColor: theme.color.bottomWidth,
  },
});

export default FiltersModal;
