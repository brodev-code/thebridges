import { NavigatorScreenParams, ParamListBase } from '@react-navigation/native';
import { ParticipantData } from './models/ParticipantData';

export type RootStackParamList = {
    Login: undefined; // Login ekranı parametresiz
    Register: undefined; // Register ekranı parametresiz
    EmailLogin: undefined; // Register ekranı parametresiz
    ForgotPassword: undefined; // ForgotPassword ekranı parametresiz
    ResetPassword: { token: string }; // ResetPassword ekranı için token parametresi
    LocationSelect: undefined; // Login ekranı parametresiz
    Otp:  { phone: any }; // Otp ekranı parametresiz
    Home: undefined; // Home ekranı parametresiz
    Profile: { userId: string }; // Profile ekranı için örnek bir parametre
    UserProfile: { userId: number } // Profile ekranı için örnek bir parametre
    MyEvents: undefined;
    Settings: undefined; // Ayarlar ekranı için örnek parametre
    EventList: undefined;
    EventLocationList: { locationUpdated:number | null };
    EventDetail: { eventId: number };
    EventParticipants: { eventId: number };
    Favorites: { userId: number };
    EventSimilarList: { eventId: number };
    EventEdit: { eventId: number | null };
    EventGalleryEdit: { eventId: number | null };
    TicketEdit: { eventId: number | null };
    EventEditComplete: { eventId: number | null };
    Chat: { userId: number; userName: string };
    ChatList: undefined;
    BlockedUsers:undefined;
    Notification: undefined;
    Search: { searchQuery: string };
    SearchFilter: { searchQuery: string };
    SearchDetail: { results: any};
    SearchMap: { searchQuery: string };
    Tickets:undefined;
    TicketDetail: {referenceNumber:string};
    BottomMenu: undefined;
    ParticipantsInfo: {eventId: number;eventName?: string;eventDate?: any;eventLocation?: string;selectedTickets: { id: number; name: string; quantity: number; }[];totalAmount?: number;};
    Payment: {eventId: number;eventName?: string;eventDate?: any;eventLocation?: string;selectedTickets: { id: number; name: string; quantity: number; }[];totalAmount?: number;participants: ParticipantData[];};
    PaymentComplete: {
       eventId: number;
         eventName?: string;
         eventDate?: any;
         eventLocation?: string;
         selectedTickets: any;
         totalAmount?: number;
         participants: ParticipantData[];
      };
    PaymentFailure: {
        eventId: number;
          eventName?: string;
          eventDate?: any;
          eventLocation?: string;
          selectedTickets: any;
          totalAmount?: number;
          participants: ParticipantData[];
    };
    ParticipantReviewList:{ eventId: number | null };
    ParticipantReviewEdit:{ eventId: number | null;review?:any | null };
    ThreeDSWebView: {
      redirectUrl: string;
      threeDSServerTransId: string;
      transactionId: string;
      eventId?: number;
      eventName: any;
      eventDate: string;
      eventLocation?: string;
      selectedTickets: { name: string; quantity: number }[];
      totalAmount?: number;
      participants: ParticipantData[];
     };
};

// Diğer navigasyon yığınları varsa, onları da buraya ekleyebilirsiniz.
export type AppParamList = {
    RootStack: NavigatorScreenParams<RootStackParamList>; // Ana navigasyon
};
