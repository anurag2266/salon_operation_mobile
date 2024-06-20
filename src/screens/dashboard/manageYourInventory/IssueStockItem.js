import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Image,
    ScrollView,
  } from 'react-native';
  import React, {useState, useRef} from 'react';
  import Container from '../../../components/common/Container';
  import {normalize, vh, vw} from '../../../utils/dimensions';
  import theme from '../../../theme/theme';
  import LocalImages from '../../../utils/LocalImages';
  import {TextInput} from 'react-native-element-textinput';
  import AppIcon from '../../../components/common/AppIcon';
  import RBSheet from 'react-native-raw-bottom-sheet';
  import ReplacementBottomSheet from '../../../components/inventory/ReplacementBottomSheet';
  import Replacement from './Replacement';
  import Exchange from './Exchange';
  import ExchangeBottomSheet from '../../../components/inventory/ExchangeBottomSheet';
  import Repair from './Repair';
  import RepairBottomSheet from '../../../components/inventory/RepairBottomSheet';
  import Others from './Others';
  import OthersBottomSheet from '../../../components/inventory/OthersBottomSheet';
import App from '../../../../App';
import SelectIssueItems from './SelectIssueItems';


const IssueStockItem = ({navigation,onPressRbSheet}) => {
  const refRBSheet = useRef();
    

  

    const[from,setfrom]=useState('')
    const[to,setTo]=useState('')
    const [date,setDate]=useState('')
    const [time,setTime]=useState('')
    const [selectedItems,setSelectedItems]=useState('')
    const  [itemTouch,setItemTouch]=useState(false)
  return (
  <Container
  title={"Issue Stock Items"}
  onPressLeftIcon={()=>navigation.goBack()}
  >
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TextInput
            value={from}
            style={[styles.input, {width: '40%'}]}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            label={'From'}
            placeholder={'From'}
            placeholderTextColor={theme.color.TextGrey}
            focusColor={theme.color.borderGrey}
            onChangeText={text => {
              setfrom({text});
            }}
            renderRightIcon={()=>
                <AppIcon
                name={'down'}
                type={"AntDesign"}
                size={15}
                />
                }
          />
        
        <AppIcon
          name={'arrow-circle-right'}
          type={'FontAwesome'}
          size={22}
          color={theme.color.searchColor}
          style={{marginTop: vh(40)}}
        />
        
      
          <TextInput
            value={to}
            style={[styles.input, {width: '40%'}]}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            label={'To'}
            placeholder={'To'}
            placeholderTextColor={theme.color.TextGrey}
            focusColor={theme.color.borderGrey}
            onChangeText={text => {
              setTo({text});
            }}
            renderRightIcon={()=>
            <AppIcon
            name={'down'}
            type={"AntDesign"}
            size={15}
            />
            }
          />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TextInput
            value={date}
            style={[styles.input, {width: '40%'}]}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            label={'Date'}
            placeholder={'Date'}
            placeholderTextColor={theme.color.TextGrey}
            focusColor={theme.color.borderGrey}
            onChangeText={text => {
              setDate({text});
            }}
            
          />
        
          <TextInput
            value={time}
            style={[styles.input, {width: '40%'}]}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            label={'Time'}
            placeholder={'Time'}
            placeholderTextColor={theme.color.TextGrey}
            focusColor={theme.color.borderGrey}
            onChangeText={text => {
              setTime({text});
            }}
            
          />
        </View>
<RBSheet
ref={refRBSheet}
closeOnDragDown={true}
closeOnPressMask={false}
customStyles={{
  // wrapper: {
  //   backgroundColor: 'transparent',
  // },
  container: {
    borderTopLeftRadius: vw(20),
    borderTopRightRadius: vw(20),
    height: '80%',
  },
  draggableIcon: {
    backgroundColor: theme.color.white,
  },
}}
>
<SelectIssueItems
onPressApply={()=> refRBSheet.current.close()}
/>
</RBSheet>
          
        <TextInput
            value={selectedItems}
            style={[styles.input]}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            label={'Select Items'}
            placeholder={'Select Items'}
            placeholderTextColor={theme.color.TextGrey}
          //  focusColor={theme.color.borderGrey}
            onChangeText={text => {
              setSelectedItems({text});
            }}
            renderRightIcon={()=>
            <AppIcon
            name={"right"}
          type={'AntDesign'}
          size={18}
          onPress={()=>
            refRBSheet.current.open()
          }
        
            />
            }
            
          />
             <TextInput
            value={selectedItems}
            style={[styles.input]}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            label={'Reason'}
            placeholder={'Reason'}
            placeholderTextColor={theme.color.TextGrey}
            focusColor={theme.color.borderGrey}
            onChangeText={text => {
              setSelectedItems({text});
            }}
            
          />
           <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: vw(14),
          marginTop: vh(70),
        }}>
        <TouchableOpacity style={styles.cancelBtnTouch}>
          <Text style={styles.cancelBtnText}>CANCEL</Text>
        </TouchableOpacity>
        <TouchableOpacity
         // onPress={onPressRbSheet}
          style={[
            styles.cancelBtnTouch,
            {backgroundColor: theme.color.primary},
          ]}>
          <Text style={[styles.cancelBtnText, {color: theme.color.white}]}>
            ISSUE ITEMS
          </Text>
        </TouchableOpacity>
      </View>


  </Container>
  )
}

export default IssueStockItem

const styles = StyleSheet.create({
txt:{
marginHorizontal:vw(15),
marginTop: vh(25),
fontFamily:theme.font.bold,
fontSize:normalize(16)
},
    input: {
  
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: theme.color.borderGrey,
        paddingHorizontal: vw(20),
        marginTop: vh(25),
        marginHorizontal: vw(15),
        height: vh(55),
      },
      inputStyle: {fontSize: 13},
      labelStyle: {
        fontSize: normalize(13),
        position: 'absolute',
        top: -10,
        backgroundColor: 'white',
        paddingHorizontal: 4,
        marginLeft: -4,
        fontFamily: theme.font.bold,
        color: theme.color.inputGrey,
      },
      placeholderStyle: {
        fontSize: normalize(13),
        fontFamily: theme.font.regular,
        color: theme.color.black,
      },
      textErrorStyle: {
        fontSize: normalize(13),
        fontFamily: theme.font.regular,
        color: theme.color.black,
      },
      buttonTouchView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: vw(20),
        marginTop: vh(40),
      },
      buttonTouch: {
        borderWidth: 1,
        borderRadius: vw(10),
        borderColor: theme.color.white,
        backgroundColor: theme.color.white,
        paddingHorizontal: vw(60),
        paddingVertical: vh(18),
      },
      boxWithShadow: {
        shadowColor: '#D2D2D2',
        shadowOffset: {
          width: 0,
          //height: 2,
        },
        shadowOpacity: 1.23,
        shadowRadius: 2.62,
        elevation: 4,
      },
      buttonText: {
        fontSize: normalize(15),
        fontFamily: theme.font.medium,
      },
      labelTouch: {
        flexDirection: 'row',
        marginHorizontal: vw(15),
        marginTop: vh(40),
      },
      checkimg: {
        width: vw(18),
        height: vw(18),
        color: theme.color.bottomWidth,
        marginRight: vw(10),
      },
      labelText: {
        color: theme.color.black,
        fontSize: normalize(16),
        fontFamily: theme.font.regular,
      },
      filter: {
        marginLeft: vw(7),
        color: theme.color.Black_shadow,
        fontFamily: theme.font.regular,
        fontSize: normalize(14),
      },
      stockName: {
        textAlign: 'center',
        color: theme.color.primary,
        fontSize: normalize(18),
        fontFamily: theme.font.bold,
      },

      labelTouch: {
        flexDirection: 'row',
        marginHorizontal: vw(21),
      },
      checkimg: {
        width: vw(20),
        height: vw(20),
        color: theme.color.bottomWidth,
        marginRight: vw(10),
      },
      cancelBtnTouch: {
        paddingHorizontal: vw(50),
        borderWidth: 1,
        borderRadius: vw(5),
        paddingVertical: vh(15),
        borderColor: theme.color.primary,
      },
      cancelBtnText: {
        color: theme.color.primary,
        fontFamily: theme.font.bold,
        fontSize: normalize(16),
      },
     
      itemTouch: {
        borderRadius: vw(5),
        paddingHorizontal: vw(25),
        paddingVertical: vw(11),
        marginHorizontal: vw(15),
        marginTop: vh(40),
      },
      itemText: {
        fontFamily: theme.font.bold,
        fontSize: normalize(16),
        color: theme.color.primary,
      },
      boxView: {
        backgroundColor: theme.color.white,
        borderWidth: 1,
        marginTop: vh(30),
       marginHorizontal:vw(60),
        padding: vw(14),
        paddingVertical: vh(20),
        borderColor: theme.color.white,
        shadowColor: '#045087',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.6,
        shadowRadius: 2,
        elevation: 0,
      },
      completed: {
        fontFamily: theme.font.regular,
        color: theme.color.black,
        fontSize: normalize(9),
      },

     
    
  
      AddTouchView: {
        borderWidth: 1,
        borderColor: theme.color.primary,
        borderRadius: 3,
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginTop: vh(10),
        paddingHorizontal: vw(25),
        paddingVertical: vh(8),
      },
      AddTouchText: {
        fontFamily: theme.font.medium,
        color: theme.color.primary,
        fontSize: normalize(10),
      },
})