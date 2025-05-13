import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './routes';
import React, { Suspense, useEffect, useState } from 'react';
import { ActivityIndicator, Platform, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Lazy load wrapper (iOS ve Android optimizasyonlu)
const createLazyScreen = (importer: () => Promise<{ default: React.ComponentType<any> }>) => {
    const LazyComponent = React.lazy(importer);
    return (props: any) => (
        <Suspense fallback={<View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator size="large" color="#4B0082" />
        </View>}>
            <LazyComponent {...props} />
        </Suspense>
    );
};

// Tüm ekranların lazy load tanımları
const Login = createLazyScreen(() => import('./views/Login'));
const Home = createLazyScreen(() => import('./views/Home'));
const Profile = createLazyScreen(() => import('./views/Profile'));
const Settings = createLazyScreen(() => import('./views/Settings'));
const EventDetail = createLazyScreen(() => import('./views/EventDetail'));
const EventParticipants = createLazyScreen(() => import('./views/EventParticipants'));
const FavoriteEvents = createLazyScreen(() => import('./views/Favorites'));
const UserProfile = createLazyScreen(() => import('./views/UserProfile'));
const Chat = createLazyScreen(() => import('./views/Chat'));
const ChatList = createLazyScreen(() => import('./views/ChatList'));
const SearchFilter = createLazyScreen(() => import('./views/SearchFilter'));
const Tickets = createLazyScreen(() => import('./views/Tickets'));
const SearchDetail = createLazyScreen(() => import('./views/SearchDetail'));
const Search = createLazyScreen(() => import('./views/Search'));
const SearchMap = createLazyScreen(() => import('./views/SearchMap'));
const MyEvents = createLazyScreen(() => import('./views/MyEvents'));
const EventEdit = createLazyScreen(() => import('./views/EventEdit'));
const TicketDetail = createLazyScreen(() => import('./views/TicketDetail'));
const LocationSelect = createLazyScreen(() => import('./views/LocationSelect'));
const ParticipantsInfo = createLazyScreen(() => import('./views/ParticipantsInfo'));
const PaymentComplete = createLazyScreen(() => import('./views/PaymentComplete'));
const Payment = createLazyScreen(() => import('./views/Payment'));
const TicketEdit = createLazyScreen(() => import('./views/TicketEdit'));
const EventGalleryEdit = createLazyScreen(() => import('./views/EventGalleryEdit'));
const EventEditComplete = createLazyScreen(() => import('./views/EventEditComplete'));
const Register = createLazyScreen(() => import('./views/Register'));
const NotificationScreen = createLazyScreen(() => import('./views/Notification'));
const EmailLogin = createLazyScreen(() => import('./views/EmailLogin'));
const ParticipantReviewList = createLazyScreen(() => import('./views/ParticipantReviewList'));
const ParticipantReviewEdit = createLazyScreen(() => import('./views/ParticipantReviewEdit'));
const ThreeDSWebView = createLazyScreen(() => import('./views/ThreeDSWebView'));
const PaymentFailure = createLazyScreen(() => import('./views/PaymentFailure'));
const ForgotPassword = createLazyScreen(() => import('./views/ForgotPassword'));
const Otp = createLazyScreen(() => import('./views/Otp'));

// Componentler
const EventList = createLazyScreen(() => import('./components/EventListCards'));
const EventSimilarList = createLazyScreen(() => import('./components/EventSimilarList'));
const EventLocationList = createLazyScreen(() => import('./components/EventLocationListCards'));
const BottomMenu = createLazyScreen(() => import('./components/BottomMenu'));

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainStack = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const checkAuthToken = async () => {
        try {
            const token = await AsyncStorage.getItem('auth_token');
            setIsAuthenticated(!!token);
        } catch (error) {
            console.error('Auth check error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkAuthToken();
    }, []);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#4B0082" />
            </View>
        );
    }
    return (
        <Stack.Navigator
            initialRouteName={isAuthenticated ? 'Home' : 'Login'}
            screenOptions={{
                headerShown: false,
                animation: Platform.OS === 'ios' ? 'default' : 'fade',
                gestureEnabled: true,
                ...(Platform.OS === 'ios' && {
                    fullScreenGestureEnabled: true,
                    gestureDirection: 'horizontal',
                }),
            }}
        >
            {/* Auth Screens */}
            <Stack.Screen name="Login" component={Login as any} />
            <Stack.Screen name="Register" component={Register as any} />
            <Stack.Screen name="EmailLogin" component={EmailLogin as any} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword as any} />
            <Stack.Screen name="Otp" component={Otp as any} />

            {/* Main Screens */}
            <Stack.Screen name="Home" component={Home as any} />
            <Stack.Screen name="Profile" component={Profile as any} />
            <Stack.Screen name="Settings" component={Settings as any} />
            <Stack.Screen name="UserProfile" component={UserProfile as any} />

            {/* Event Screens */}
            <Stack.Screen name="EventDetail" component={EventDetail as any} />
            <Stack.Screen name="EventParticipants" component={EventParticipants as any} />
            <Stack.Screen name="EventEdit" component={EventEdit as any} />
            <Stack.Screen name="MyEvents" component={MyEvents as any} />
            <Stack.Screen name="Favorites" component={FavoriteEvents as any} />
            <Stack.Screen name="EventList" component={EventList as any} />
            <Stack.Screen name="EventSimilarList" component={EventSimilarList as any} />
            <Stack.Screen name="EventLocationList" component={EventLocationList as any} />
            <Stack.Screen name="EventGalleryEdit" component={EventGalleryEdit as any} />
            <Stack.Screen name="EventEditComplete" component={EventEditComplete as any} />

            {/* Payment Screens */}
            <Stack.Screen name="Payment" component={Payment as any} />
            <Stack.Screen name="PaymentComplete" component={PaymentComplete as any} />
            <Stack.Screen name="PaymentFailure" component={PaymentFailure as any} />
            <Stack.Screen name="ThreeDSWebView" component={ThreeDSWebView as any} />

            {/* Ticket Screens */}
            <Stack.Screen name="Tickets" component={Tickets as any} />
            <Stack.Screen name="TicketDetail" component={TicketDetail as any} />
            <Stack.Screen name="TicketEdit" component={TicketEdit as any} />

            {/* Chat Screens */}
            <Stack.Screen name="Chat" component={Chat as any} />
            <Stack.Screen name="ChatList" component={ChatList as any} />

            {/* Search Screens */}
            <Stack.Screen name="Search" component={Search as any} />
            <Stack.Screen name="SearchFilter" component={SearchFilter as any} />
            <Stack.Screen name="SearchDetail" component={SearchDetail as any} />
            <Stack.Screen name="SearchMap" component={SearchMap as any} />

            {/* Other Screens */}
            <Stack.Screen name="LocationSelect" component={LocationSelect as any} />
            <Stack.Screen name="ParticipantsInfo" component={ParticipantsInfo as any} />
            <Stack.Screen name="Notification" component={NotificationScreen as any} />
            <Stack.Screen name="ParticipantReviewList" component={ParticipantReviewList as any} />
            <Stack.Screen name="ParticipantReviewEdit" component={ParticipantReviewEdit as any} />
            <Stack.Screen name="BottomMenu" component={BottomMenu as any} />
        </Stack.Navigator>
    );
};

export default MainStack;
