import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SalonSetup from '../screens/Auth/SalonSetup';
import SelectLocation from '../screens/Auth/SelectLocation';
import YourAddress from '../screens/Auth/YourAddress';
import AddSalonDetail from '../screens/salon/address/AddSalonDetail';
import BreakTiming from '../screens/salon/address/BreakTiming';
import TargetPayroll from '../screens/dashboard/manageyourSalonSetting/manageEmployee/TargetPayroll';
import BuisnessHours from '../screens/salon/address/BuisnessHours';
import ChooseBuisnessCategory from '../screens/salon/address/ChooseBuisnessCategory';
import SalonSetupSteps from '../screens/salon/address/SalonSetupSteps';
import SelectYourTiming from '../screens/salon/address/SelectYourTiming';
import ShowYourWorkplace from '../screens/salon/address/ShowYourWorkplace';
import AddSalonDetailForm from '../screens/salon/address/AddSalonDetailForm';
import AccordingGender from '../screens/salon/address/salonServices/AccordingGender';
import AddServices from '../screens/salon/address/salonServices/AddServices';
import ManageBrandPrice from '../screens/salon/address/salonServices/ManageBrandPrice';
import StartAddingStylist from '../screens/salon/address/salonStylist/StartAddingStylist';
import StylistJobProfile from '../screens/salon/address/salonStylist/StylistJobProfile';
import ListOfStylists from '../screens/salon/address/salonStylist/ListOfStylists';
import FiltersModal from '../screens/salon/address/salonStylist/FiltersModal';
import ProductDetail from '../screens/salon/address/salonProducts/ProductDetail';
import RequestNewProduct from '../screens/salon/address/salonProducts/RequestNewProduct';
import SetupPaymentMethod from '../screens/salon/address/salonPaymentMethod/SetupPaymentMethod';
import Profiledashboard from '../screens/dashboard/Profiledashboard';
import StylistAndStaffList from '../screens/StylistStaff/StylistAndStaffList';
import StylistProfile from '../screens/StylistStaff/StylistProfile';
import TabNavigation from './TabNavigation';
import RequestNewService from '../screens/salon/address/salonServices/RequestNewService';
import StylistCalendar from '../screens/dashboard/manageyourSalonSetting/manageEmployee/StylistCalendar';
import AddMembershipPlan from '../screens/manageOffers/memberShip/AddMembershipPlan';
import ManageSalonSetting from '../screens/dashboard/ManageSalonSetting';
import ManageOffers from '../screens/manageOffers/ManageOffers';
import ManagePromotions from '../screens/dashboard/promotions/ManagePromotions';
import AboutUs from '../screens/Auth/AboutUs';
import ManageMembershipPlan from '../screens/manageOffers/memberShip/ManageMembershipPlan';
import InventoryManagement from '../screens/dashboard/manageYourInventory/InventoryManagement';
import InventoryLocation from '../screens/dashboard/manageYourInventory/InventoryLocation';
import MembershipInvoice from '../screens/manageOffers/memberShip/MembershipInvoice';
import ManageYourSalonProfile from '../screens/dashboard/manageyourSalonSetting/ManageYourSalonProfile';
import ClientManagementDashboard from '../screens/clientManagement/ClientManagementDashboard';
import PersonalInformation from '../screens/clientManagement/PersonalInformation';
import Offers from '../screens/clientManagement/Offers';
import Membership from '../screens/clientManagement/Membership';
import BillingInformation from '../screens/billing/BillingInformation';
import UpdateAppointment from '../screens/billing/UpdateAppointment';
import BillingPaymentMethod from '../screens/billing/BillingPaymentMethod';
import EnterPin from '../screens/billing/EnterPin';
import CheckoutComplete from '../screens/billing/CheckoutComplete';
import BillingAddStylist from '../screens/billing/BillingAddStylist';
import SelectStepsForStylist from '../screens/billing/SelectStepsForStylist';
import RefundAmount from '../screens/billing/RefundAmount';
import MapViewScreen from '../screens/salon/address/MapViewScreen';
import SalonesisSetUp from '../screens/Auth/SalonesisSetUp';
import ProfileEdit from '../screens/dashboard/manageyourSalonSetting/profile/ProfileEdit';
import SendOtp from '../screens/dashboard/manageyourSalonSetting/profile/SendOtp';
import ServiceSetup from '../screens/dashboard/manageyourSalonSetting/manageServices/ServiceSetup';
import AddingPaymentDetail from '../screens/dashboard/manageyourSalonSetting/paymentMethod/AddingPaymentDetail';
import AddUPI from '../screens/dashboard/manageyourSalonSetting/paymentMethod/AddUPI';
import SelectedServicesDetails from '../screens/dashboard/manageyourSalonSetting/manageServices/SelectedServicesDetails';
import ServiceDetail from '../screens/dashboard/manageyourSalonSetting/manageServices/ServiceDetail';
import AdditionalSetting from '../screens/dashboard/manageyourSalonSetting/manageServices/AdditionalSetting';
import ServiceSteps from '../screens/dashboard/manageyourSalonSetting/manageServices/ServiceSteps';
import ProductUsed from '../screens/dashboard/manageyourSalonSetting/manageServices/ProductUsed';
import StaffManagement from '../screens/dashboard/manageyourSalonSetting/manageServices/StaffManagement';
import ClientManagement from '../screens/dashboard/manageyourSalonSetting/manageServices/ClientManagement';
import ManageProduct from '../screens/dashboard/manageyourSalonSetting/manageYourProducts/ManageProduct';
import SimilarProduct from '../screens/dashboard/manageyourSalonSetting/manageEmployee/SimilarProduct';
import ItemSold from '../screens/dashboard/manageyourSalonSetting/manageEmployee/ItemSold';
import Documents from '../screens/dashboard/manageyourSalonSetting/manageEmployee/Documents';
import EducationalDocuments from '../screens/dashboard/manageyourSalonSetting/manageEmployee/EducationalDocuments';
import ReviewRating from '../screens/dashboard/manageyourSalonSetting/manageEmployee/ReviewRating';
import OtherDetail from '../screens/dashboard/manageyourSalonSetting/manageEmployee/OtherDetail';
import JobProfile from '../screens/dashboard/manageyourSalonSetting/manageEmployee/JobProfile';
import ManageYourProduct from '../screens/dashboard/manageyourSalonSetting/manageYourProducts/ManageYourProduct';
import AddingQuestions from '../screens/dashboard/manageyourSalonSetting/manageServices/AddingQuestions';
import ManageEmployee from '../screens/dashboard/manageyourSalonSetting/manageEmployee/ManageEmployee';
import ManageEmployeeStylistProfile from '../screens/dashboard/manageyourSalonSetting/manageEmployee/ManageEmployeeStylistProfile';
import Pricing from '../screens/dashboard/manageyourSalonSetting/manageEmployee/Pricing';
import AddProduct from '../screens/salon/address/salonProducts/AddProduct';
import ReturnOrder from '../screens/billing/ReturnOrder';
import ViewLogHistory from '../screens/manageOffers/memberShip/ViewLogHistory';
import SaleHistory from '../screens/manageOffers/memberShip/SaleHistory';
import CardHistory from '../screens/manageOffers/memberShip/CardHistory';
import TransactionHistory from '../screens/manageOffers/memberShip/TransactionHistory';
import Distance from '../screens/distanceManagement/Distance';
import ServiceAvailedBy from '../screens/manageOffers/memberShip/ServiceAvailedBy';
import MembershipAvailedHistory from '../screens/manageOffers/memberShip/MembershipAvailedHistory';
import CreateCoupon from '../screens/dashboard/promotions/CreateCoupon';
import Coupons from '../screens/dashboard/promotions/Coupons';
import CreateLoyalityPoints from '../screens/dashboard/promotions/CreateLoyalityPoints';
import LogDetail from '../screens/manageOffers/memberShip/LogDetail';
import ForgotPassword from '../screens/Auth/ForgotPassword';
import ConfirmSelectedServices from '../screens/salon/address/salonServices/ConfirmSelectedServices';
import SelectedProduct from '../screens/salon/address/salonProducts/SelectedProduct';
import Training from '../screens/dashboard/training/Training';
import ViewContinueLearning from '../screens/dashboard/training/ViewContinueLearning';
import ActiveSubscription from '../screens/dashboard/subscriptionManagement/ActiveSubscription';
import SubscriptionTransactionHistory from '../screens/dashboard/subscriptionManagement/SubscriptionTransactionHistory';
import MyCarrierTraining from '../screens/dashboard/training/MyCarrierTraining';
import ExploreAll from '../screens/dashboard/training/ExploreAll';
import TrainingCalender from '../screens/dashboard/training/TrainingCalender';

import ManageSocialMedia from '../screens/dashboard/socialMedia/MangeSocialMedia';
import CreateLocation from '../screens/dashboard/manageYourInventory/CreateLocation';
import OpeningStockItems from '../screens/dashboard/manageYourInventory/OpeningStockItems';
import ManageToolsAndEquipment from '../screens/dashboard/manageYourInventory/ManageToolsAndEquipment';
import AddTool from '../screens/dashboard/manageYourInventory/AddTool';
import ViewTransactionHistory from '../screens/dashboard/manageYourInventory/ViewTransactionHistory';
import ViewLocationLogHistory from '../screens/dashboard/manageYourInventory/ViewLocationLogHistory';
import ManageInventory from '../screens/dashboard/manageYourInventory/ManageInventory';
import ReceiptStockItem from '../screens/dashboard/manageYourInventory/ReceiptStockItem';
import ReceiptSummary from '../screens/dashboard/manageYourInventory/ReceiptSummary';
import IssueStockItem from '../screens/dashboard/manageYourInventory/IssueStockItem';
import ClientInfoScreen from '../screens/clientManagement/ClientInfoScreen';

import {create} from 'react-test-renderer';

import Invoice from '../screens/clientManagement/Invoice';

import CreateComboOffers from '../screens/dashboard/promotions/CreateComboOffers';
import LoyalityPoints from '../screens/dashboard/promotions/LoyalityPoints';
import ComboOffers from '../screens/dashboard/promotions/ComboOffers';

import CreateSpecialDiscount from '../screens/dashboard/promotions/CreateSpecialDiscount';

import Discount from '../screens/dashboard/promotions/Discount';
import CreateHappyHours from '../screens/dashboard/promotions/CreateHappyHours';

import AddMembers from '../screens/clientManagement/AddMembers';
import ClientManagementMembership from '../screens/clientManagement/ClientManagementMembership.js';
import ClientAppointment from '../screens/clientManagement/ClientAppointment';
import ClientBilling from '../screens/clientManagement/ClientBilling';
import ConsentForm from '../screens/clientManagement/ConsentForm';
import ClientNotes from '../screens/clientManagement/ClientNotes';
import ClientCommunication from '../screens/clientManagement/ClientCommunication';
import ClientOverview from '../screens/clientManagement/ClientOverview';
import AvailedHistory from '../screens/clientManagement/AvailedHistory';
import CreateCashback from '../screens/dashboard/promotions/CreateCashback';
import CashbackOffers from '../screens/dashboard/promotions/CashbackOffers';
import ComboOfferViewLog from '../screens/dashboard/promotions/ComboOfferViewLog';
import ComboOfferAvailedHistory from '../screens/dashboard/promotions/ComboOfferAvailedHistory';
import DiscountViewLog from '../screens/dashboard/promotions/DiscountViewlog';
import DiscountAvailedHistory from '../screens/dashboard/promotions/DiscountAvailedHistory';
import ManageAccounting from '../screens/dashboard/manageAccounting/ManageAccounting';
import AddPackagePlan from '../screens/manageOffers/memberShip/AddPackagePlan';
import ManagePackagePlan from '../screens/manageOffers/memberShip/ManagePackagePlan';

import ManageDiscountCard from '../screens/manageOffers/memberShip/ManageDiscountCard';
import CreateDiscountCard from '../screens/manageOffers/memberShip/CreateDiscountCard';
import ManageGiftCard from '../screens/manageOffers/memberShip/ManageGiftCard';
import CreateGiftCard from '../screens/manageOffers/memberShip/CreateGiftCard';

import ManageAnalytics from '../screens/dashboard/manageAnalytics/ManageAnalytics';

import ContactSalonesis from '../screens/dashboard/contact/ContactSalonesis';
import AdditionalSettingsProduct from '../screens/dashboard/manageyourSalonSetting/manageYourProducts/AdditionalSettingsProduct';
import SetBusinessCategory from '../screens/dashboard/manageSalonProfile/SetBusinessCategory';
import SetSalonDetails from '../screens/dashboard/manageSalonProfile/SetSalonDetails';
import ManageSalonPhotos from '../screens/dashboard/manageSalonProfile/ManageSalonPhotos';
import ManageSalonOperation from '../screens/dashboard/manageSalonProfile/ManageSalonOperation';
import ClosedBillingAmount from '../screens/dashboard/manageAnalytics/ClosedBillingAmount';
import OpenBillingAmount from '../screens/dashboard/manageAnalytics/OpenBillingAmount';
import TotalEarning from '../screens/dashboard/manageAnalytics/TotalEarning';
import AnalyticsAppointments from '../screens/dashboard/manageAnalytics/AnalyticsAppointment';
import ViewPackageLog from '../components/package/ViewPackageLog';
import ViewPackagePlan from '../components/package/ViewPackagePlan';
import ViewPackageSaleHistory from '../components/package/ViewPackageSaleHistory';
import ViewPackageAvailedHistory from '../components/package/ViewPackageAvailedHistory';
import ViewDiscountLog from '../components/discount/ViewDiscountLog';
import ViewDiscountPlan from '../components/discount/ViewDiscountPlan';
import ViewDiscountSaleHistory from '../components/discount/ViewDiscountSaleHistory';
import ViewDiscountAvailedHistory from '../components/discount/ViewDiscountAvailedHistory';
import ViewGiftLog from '../components/giftcard/ViewGiftLog';
import ViewGiftPlan from '../components/giftcard/ViewGiftPlan';
import ViewGiftSaleHistory from '../components/giftcard/ViewGiftSaleHistory';
import ViewGiftAvailedHistory from '../components/giftcard/ViewGiftAvailedHistory';

import CreateNewAppointment from '../screens/dashboard/appointment/CreateNewAppointment';
import AddingClient from '../screens/dashboard/appointment/AddingClient';

import HappyHours from '../screens/dashboard/promotions/HappyHours';
import AddressScreen from '../screens/salon/address/AddressScreen';

const Stack = createNativeStackNavigator();

const SalonSetupNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="SalonSetup">
      <Stack.Screen name="Tabs" component={TabNavigation} />
      <Stack.Screen name="YourAddress" component={YourAddress} />
      <Stack.Screen name="SelectLocation" component={SelectLocation} />
      <Stack.Screen
        name="ChooseBuisnessCategory"
        component={ChooseBuisnessCategory}
      />
      <Stack.Screen
        options={{gestureEnabled: false}}
        name="SalonSetup"
        component={SalonSetup}
      />
      <Stack.Screen name="AboutUs" component={AboutUs} />
      <Stack.Screen name="AddSalonDetail" component={AddSalonDetail} />
      <Stack.Screen name="BuisnessHours" component={BuisnessHours} />
      <Stack.Screen name="SelectYourTiming" component={SelectYourTiming} />
      <Stack.Screen name="SalonesisSetUp" component={SalonesisSetUp} />
      <Stack.Screen name="MapViewScreen" component={MapViewScreen} />
      <Stack.Screen name="SelectedProduct" component={SelectedProduct} />
      <Stack.Screen
        name="ConfirmSelectedServices"
        component={ConfirmSelectedServices}
      />
      <Stack.Screen name="SalonSetupSteps" component={SalonSetupSteps} />
      <Stack.Screen name="AddSalonDetailForm" component={AddSalonDetailForm} />
      <Stack.Screen name="Distance" component={Distance} />
      <Stack.Screen name="AddServices" component={AddServices} />
      <Stack.Screen name="ShowYourWorkplace" component={ShowYourWorkplace} />
      <Stack.Screen name="AccordingGender" component={AccordingGender} />
      <Stack.Screen name="ManageBrandPrice" component={ManageBrandPrice} />
      <Stack.Screen name="StartAddingStylist" component={StartAddingStylist} />
      <Stack.Screen name="StylistJobProfile" component={StylistJobProfile} />
      <Stack.Screen name="ListOfStylists" component={ListOfStylists} />
      <Stack.Screen name="AddProduct" component={AddProduct} />
      <Stack.Screen name="FiltersModal" component={FiltersModal} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen name="RequestNewProduct" component={RequestNewProduct} />
      <Stack.Screen name="SetupPaymentMethod" component={SetupPaymentMethod} />
      <Stack.Screen name="Profiledashboard" component={Profiledashboard} />
      <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
      <Stack.Screen name="RequestNewService" component={RequestNewService} />
      <Stack.Screen name="SendOtp" component={SendOtp} />
      <Stack.Screen name="ServiceSetup" component={ServiceSetup} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen
        name="MembershipAvailedHistory"
        component={MembershipAvailedHistory}
      />
      <Stack.Screen
        name="SelectedServicesDetails"
        component={SelectedServicesDetails}
      />

      <Stack.Screen
        name="AddingPaymentDetail"
        component={AddingPaymentDetail}
      />
      <Stack.Screen name="AddUPI" component={AddUPI} />
      <Stack.Screen name="ServiceDetail" component={ServiceDetail} />
      <Stack.Screen name="AdditionalSetting" component={AdditionalSetting} />
      <Stack.Screen name="ServiceSteps" component={ServiceSteps} />
      <Stack.Screen name="ProductUsed" component={ProductUsed} />
      <Stack.Screen name="StaffManagement" component={StaffManagement} />
      <Stack.Screen name="ClientManagement" component={ClientManagement} />
      <Stack.Screen name="AddingQuestions" component={AddingQuestions} />
      <Stack.Screen
        name="StylistAndStaffList"
        component={StylistAndStaffList}
      />
      <Stack.Screen name="StylistProfile" component={StylistProfile} />
      {/* <Stack.Screen name="AddMembership" component={AddMembership} /> */}
      <Stack.Screen name="AddMembershipPlan" component={AddMembershipPlan} />
      <Stack.Screen name="ManageSalonSetting" component={ManageSalonSetting} />
      <Stack.Screen name="ManageOffers" component={ManageOffers} />
      <Stack.Screen name="ManagePromotions" component={ManagePromotions} />
      <Stack.Screen name="InventoryLocation" component={InventoryLocation} />
      <Stack.Screen name="ManageEmployee" component={ManageEmployee} />
      <Stack.Screen name="JobProfile" component={JobProfile} />
      <Stack.Screen name="ManageYourProduct" component={ManageYourProduct} />
      <Stack.Screen name="ManageProduct" component={ManageProduct} />
      <Stack.Screen name="Pricing" component={Pricing} />
      <Stack.Screen name="SimilarProduct" component={SimilarProduct} />
      <Stack.Screen name="StylistCalendar" component={StylistCalendar} />
      <Stack.Screen name="ReturnOrder" component={ReturnOrder} />
      <Stack.Screen
        name="ManageEmployeeStylistProfile"
        component={ManageEmployeeStylistProfile}
      />
      <Stack.Screen
        name="InventoryManagement"
        component={InventoryManagement}
      />
      <Stack.Screen
        name="ManageMembershipPlan"
        component={ManageMembershipPlan}
      />
      <Stack.Screen name="MembershipInvoice" component={MembershipInvoice} />
      <Stack.Screen name="TargetPayroll" component={TargetPayroll} />
      <Stack.Screen name="ItemSold" component={ItemSold} />
      <Stack.Screen name="Documents" component={Documents} />
      <Stack.Screen name="ReviewRating" component={ReviewRating} />
      <Stack.Screen name="OtherDetail" component={OtherDetail} />
      <Stack.Screen name="Offers" component={Offers} />
      <Stack.Screen name="Membership" component={Membership} />
      <Stack.Screen name="BillingInformation" component={BillingInformation} />
      <Stack.Screen name="UpdateAppointment" component={UpdateAppointment} />
      <Stack.Screen name="EnterPin" component={EnterPin} />
      <Stack.Screen name="CheckoutComplete" component={CheckoutComplete} />
      <Stack.Screen name="BillingAddStylist" component={BillingAddStylist} />
      <Stack.Screen name="RefundAmount" component={RefundAmount} />
      <Stack.Screen name="ViewLogHistory" component={ViewLogHistory} />
      <Stack.Screen name="SaleHistory" component={SaleHistory} />
      <Stack.Screen name="CardHistory" component={CardHistory} />
      <Stack.Screen name="TransactionHistory" component={TransactionHistory} />
      <Stack.Screen name="ServiceAvailedBy" component={ServiceAvailedBy} />
      <Stack.Screen name="CreateCoupon" component={CreateCoupon} />
      <Stack.Screen name="Coupons" component={Coupons} />
      <Stack.Screen name="LogDetail" component={LogDetail} />
      <Stack.Screen name="Training" component={Training} />
      <Stack.Screen name="MyCarrierTraining" component={MyCarrierTraining} />
      <Stack.Screen name="CreateLocation" component={CreateLocation} />
      <Stack.Screen name="OpeningStockItems" component={OpeningStockItems} />
      <Stack.Screen
        name="ViewContinueLearning"
        component={ViewContinueLearning}
      />
      <Stack.Screen name="TrainingCalender" component={TrainingCalender} />
      <Stack.Screen name="ExploreAll" component={ExploreAll} />
      <Stack.Screen
        name="SelectStepsForStylist"
        component={SelectStepsForStylist}
      />
      <Stack.Screen
        name="BillingPaymentMethod"
        component={BillingPaymentMethod}
      />
      <Stack.Screen
        name="PersonalInformation"
        component={PersonalInformation}
      />
      <Stack.Screen
        name="ClientManagementDashboard"
        component={ClientManagementDashboard}
      />
      <Stack.Screen
        name="EducationalDocuments"
        component={EducationalDocuments}
      />
      <Stack.Screen
        name="ManageYourSalonProfile"
        component={ManageYourSalonProfile}
      />
      <Stack.Screen name="ActiveSubscription" component={ActiveSubscription} />
      <Stack.Screen
        name="SubscriptionTransactionHistory"
        component={SubscriptionTransactionHistory}
      />

      <Stack.Screen name="ManageSocialMedia" component={ManageSocialMedia} />
      <Stack.Screen
        name="ManageToolsAndEquipment"
        component={ManageToolsAndEquipment}
      />
      <Stack.Screen name="AddTool" component={AddTool} />
      <Stack.Screen
        name="ViewTransactionHistory"
        component={ViewTransactionHistory}
      />
      <Stack.Screen
        name="ViewLocationLogHistory"
        component={ViewLocationLogHistory}
      />
      <Stack.Screen name="ManageInventory" component={ManageInventory} />
      <Stack.Screen name="ReceiptStockItem" component={ReceiptStockItem} />
      <Stack.Screen name="ReceiptSummary" component={ReceiptSummary} />
      <Stack.Screen name="contactSalonesis" component={ContactSalonesis} />
      <Stack.Screen name="ClientInfoScreen" component={ClientInfoScreen} />
      <Stack.Screen
        name="CreateLoyalityPoints"
        component={CreateLoyalityPoints}
      />
      <Stack.Screen name="CreateComboOffers" component={CreateComboOffers} />
      <Stack.Screen name="LoyalityPoints" component={LoyalityPoints} />
      <Stack.Screen name="ComboOffers" component={ComboOffers} />
      <Stack.Screen name="ComboOfferViewLog" component={ComboOfferViewLog} />

      <Stack.Screen
        name="ComboOfferAvailedHistory"
        component={ComboOfferAvailedHistory}
      />
      <Stack.Screen name="Discount" component={Discount} />
      <Stack.Screen
        name="CreateSpecialDiscount"
        component={CreateSpecialDiscount}
      />
      <Stack.Screen name="DiscountViewLog" component={DiscountViewLog} />
      <Stack.Screen
        name="DiscountAvailedHistory"
        component={DiscountAvailedHistory}
      />

      <Stack.Screen name="CreateHappyHours" component={CreateHappyHours} />
      <Stack.Screen name="HappyHours" component={HappyHours} />
      <Stack.Screen name="CreateCashback" component={CreateCashback} />

      <Stack.Screen name="CashbackOffers" component={CashbackOffers} />
      <Stack.Screen
        name="ClientManagementMembership"
        component={ClientManagementMembership}
      />
      <Stack.Screen name="Invoice" component={Invoice} />
      <Stack.Screen name="AddMembers" component={AddMembers} />
      <Stack.Screen name="ClientAppointment" component={ClientAppointment} />
      <Stack.Screen name="ClientBilling" component={ClientBilling} />
      <Stack.Screen name="ConsentForm" component={ConsentForm} />
      <Stack.Screen name="ClientNotes" component={ClientNotes} />
      <Stack.Screen name="ClientOverview" component={ClientOverview} />
      <Stack.Screen name="AvailedHistory" component={AvailedHistory} />
      <Stack.Screen
        name="ClientCommunication"
        component={ClientCommunication}
      />
      <Stack.Screen name="ManageAccounting" component={ManageAccounting} />
      <Stack.Screen name="AddPackagePlan" component={AddPackagePlan} />
      <Stack.Screen name="ManagePackagePlan" component={ManagePackagePlan} />

      <Stack.Screen name="ManageDiscountCard" component={ManageDiscountCard} />
      <Stack.Screen name="CreateDiscountCard" component={CreateDiscountCard} />
      <Stack.Screen name="ManageGiftCard" component={ManageGiftCard} />
      <Stack.Screen name="CreateGiftCard" component={CreateGiftCard} />

      <Stack.Screen name="ManageAnalytics" component={ManageAnalytics} />
      <Stack.Screen
        name="ClosedBillingAmount"
        component={ClosedBillingAmount}
      />
      <Stack.Screen name="OpenBillingAmount" component={OpenBillingAmount} />
      <Stack.Screen name="TotalEarning" component={TotalEarning} />
      <Stack.Screen
        name="AnalyticsAppointments"
        component={AnalyticsAppointments}
      />
      <Stack.Screen
        name="AdditionalSettingsProduct"
        component={AdditionalSettingsProduct}
      />
      <Stack.Screen
        name="SetBusinessCategory"
        component={SetBusinessCategory}
      />
      <Stack.Screen name="SetSalonDetails" component={SetSalonDetails} />
      <Stack.Screen name="ManageSalonPhotos" component={ManageSalonPhotos} />
      <Stack.Screen
        name="ManageSalonOperation"
        component={ManageSalonOperation}
      />
      <Stack.Screen name="IssueStockItem" component={IssueStockItem} />
      <Stack.Screen
        name="CreateNewAppointment"
        component={CreateNewAppointment}
      />

      <Stack.Screen name="AddingClient" component={AddingClient} />

      <Stack.Screen name="ViewPackageLog" component={ViewPackageLog} />
      <Stack.Screen name="ViewPackagePlan" component={ViewPackagePlan} />
      <Stack.Screen
        name="ViewPackageSaleHistory"
        component={ViewPackageSaleHistory}
      />
      <Stack.Screen
        name="ViewPackageAvailedHistory"
        component={ViewPackageAvailedHistory}
      />

      <Stack.Screen name="ViewDiscountLog" component={ViewDiscountLog} />
      <Stack.Screen name="ViewDiscountPlan" component={ViewDiscountPlan} />
      <Stack.Screen
        name="ViewDiscountSaleHistory"
        component={ViewDiscountSaleHistory}
      />
      <Stack.Screen
        name="ViewDiscountAvailedHistory"
        component={ViewDiscountAvailedHistory}
      />
      <Stack.Screen name="ViewGiftLog" component={ViewGiftLog} />
      <Stack.Screen name="ViewGiftPlan" component={ViewGiftPlan} />
      <Stack.Screen
        name="ViewGiftSaleHistory"
        component={ViewGiftSaleHistory}
      />
      <Stack.Screen
        name="ViewGiftAvailedHistory"
        component={ViewGiftAvailedHistory}
      />
      <Stack.Screen name="AddressScreen" component={AddressScreen} />
    </Stack.Navigator>
  );
};

export default SalonSetupNavigation;
