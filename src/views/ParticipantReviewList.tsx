import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  ActivityIndicator, 
  StyleSheet, 
  TouchableOpacity, 
  Image,
  RefreshControl
} from 'react-native';
import { api,BASE_URL } from '../services/api';
import { BroIcons } from '../components/Icons';
import {PageHeader} from '../components/PageHeader';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../routes';
import AsyncStorage from '@react-native-async-storage/async-storage';


interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string | null;
}

interface Facilitator {
  id: number;
  name: string;
  avatar?: string | null;
}

interface FacilitatorRating {
  id: number;
  rating: number;
  facilitator?: Facilitator;
}

interface Review {
  id: number;
  review: string;
  event_rating: number;
  is_public: boolean;
  facilitator_ratings?: FacilitatorRating[];
  user: User;
  created_at: string;
}

const ParticipantReviewList = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'ParticipantReviewList'>>();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { eventId } = route.params;
  
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [myReview, setMyReview] = useState<Review | null>(null);

  const fetchUserDetails = async (userId: number): Promise<User> => {
    try {
      const response = await api.get(`/user/${userId}`);
      
      if (response.data?.profile) {
        return {
          id: userId,
          name: response.data.profile.name || `User ${userId}`,
          email: '',
          avatar: response.data.profile.image 
            ? `${BASE_URL}${response.data.profile.image}`
            : null
        };
      }
      return { id: userId, name: `User ${userId}`, email: '' };
    } catch (error) {
      console.error(`Error fetching user ${userId}:`, error);
      return { id: userId, name: `User ${userId}`, email: '' };
    }
  };

  const loadUserData = async (): Promise<User | null> => {
    try {
      const userData = await AsyncStorage.getItem('user_data');
      if (!userData) return null;
      
      const parsedData = JSON.parse(userData);
      return {
        id: parsedData.id,
        name: parsedData.name,
        email: parsedData.email,
        avatar: parsedData.avatar ? `${BASE_URL}${parsedData.avatar}` : null
      };
    } catch (error) {
      console.error('Error loading user data:', error);
      return null;
    }
  };

  const loadReviews = async (): Promise<Review[]> => {
    try {
      const response = await api.get(`/events/${eventId}/public/reviews`);
      
      if (response.data?.success) {
        const reviewsData = response.data.data || [];
        
        const reviewsWithUsers = await Promise.all(
          reviewsData.map(async (review: any) => ({
            ...review,
            user: await fetchUserDetails(review.user_id),
            facilitator_ratings: review.facilitator_ratings || []
          }))
        );
        
        return reviewsWithUsers;
      }
      throw new Error(response.data?.message || 'Failed to load reviews');
    } catch (error) {
      console.error('Error loading reviews:', error);
      throw error;
    }
  };

  const fetchData = async (isRefreshing = false) => {
    try {
      if (isRefreshing) setRefreshing(true);
      else setLoading(true);
      
      const [user, reviewsData] = await Promise.all([
        loadUserData(),
        loadReviews()
      ]);

      setCurrentUser(user);
      setReviews(reviewsData);
      
      if (user) {
        const userReview = reviewsData.find((r: Review) => r.user.id === user.id);
        setMyReview(userReview || null);
      }

      setError(null);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error loading data');
    } finally {
      if (isRefreshing) setRefreshing(false);
      else setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [eventId]);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
      stars.push(<BroIcons.StarFilled key={`full-${i}`} color="#4B0082" size={16} />);
    }
    if (hasHalfStar) {
      stars.push(<BroIcons.StarHalf key="half" color="#4B0082" size={16} />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<BroIcons.StarOutline key={`empty-${i}`} color="#4B0082" size={16} />);
    }
    return stars;
  };

  const renderReviewItem = ({ item }: { item: Review }) => {
    const isMyReview = currentUser && item.user.id === currentUser.id;
    const userName = item.user.name;
    const userAvatar = item.user.avatar;
    const facilitatorRatings = item.facilitator_ratings || [];
    
    return (
      <View style={[
        styles.reviewCard,
        isMyReview && styles.myReviewCard
      ]}>
        <View style={styles.userInfo}>
          {userAvatar ? (
            <Image 
              source={{ uri: userAvatar }} 
              style={styles.avatar} 
              resizeMode="cover"
            />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarInitial}>
                {userName.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
          <View style={styles.userInfoText}>
            <Text style={styles.userName} numberOfLines={1}>{userName}</Text>
            <Text style={styles.reviewDate}>
              {new Date(item.created_at).toLocaleDateString('tr-TR')}
            </Text>
          </View>
          {isMyReview && (
            <View style={styles.myReviewBadge}>
              <Text style={styles.myReviewBadgeText}>Your Review</Text>
            </View>
          )}
        </View>
        
        <Text style={styles.reviewText}>{item.review}</Text>
        
        <View style={styles.ratingSection}>
          <Text style={styles.ratingLabel}>Event Rating:</Text>
          <View style={styles.ratingContainer}>
            {renderStars(item.event_rating)}
            <Text style={styles.ratingText}>{item.event_rating.toFixed(1)}</Text>
          </View>
        </View>

        {facilitatorRatings.length > 0 && (
          <>
            <Text style={styles.ratingLabel}>Facilitators:</Text>
            {facilitatorRatings.slice(0, 2).map((fr) => (
              <View key={`${item.id}-${fr.id}`} style={styles.facilitatorRating}>
                <Text style={styles.facilitatorName}>
                  {fr.facilitator?.name || 'Unknown Facilitator'}
                </Text>
                <View style={styles.ratingContainer}>
                  {renderStars(fr.rating)}
                  <Text style={styles.ratingText}>{fr.rating.toFixed(1)}</Text>
                </View>
              </View>
            ))}
            {facilitatorRatings.length > 2 && (
              <Text style={styles.moreFacilitators}>
                +{facilitatorRatings.length - 2} more facilitators
              </Text>
            )}
          </>
        )}

        {isMyReview && (
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => navigation.navigate('ParticipantReviewEdit', { 
              eventId,
              review: {
                ...item,
                facilitator_ratings: item.facilitator_ratings?.reduce((acc, curr) => {
                  if (curr.facilitator) {
                    acc[curr.facilitator.id] = curr.rating;
                  }
                  return acc;
                }, {} as Record<number, number>)
              }
            })}
          >
            <BroIcons.Filter size={16} color="white" />
            <Text style={styles.editButtonText}>Edit Review</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  if (loading) {
    return (
      <>
        <PageHeader title="Participant Reviews" />
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#4B0082" />
        </View>
      </>
    );
  }

  if (error) {
    return (
      <>
        <PageHeader title="Participant Reviews" />
        <View style={styles.errorContainer}>
          <BroIcons.Bell size={24} color="#FF0000" />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={() => fetchData()}
          >
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }

  return (
    <>
      <PageHeader title="Participant Reviews" />
      <FlatList
        data={reviews}
        renderItem={renderReviewItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ListFooterComponent={
          !myReview && currentUser ? (
            <TouchableOpacity 
              style={styles.addReviewButton} 
              onPress={() => navigation.navigate('ParticipantReviewEdit', { eventId })}
            >
              <Text style={styles.addReviewButtonText}>Add Your Review</Text>
            </TouchableOpacity>
          ) : null
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <BroIcons.Chat size={40} color="#B1B1B1" />
            <Text style={styles.emptyText}>This Event Has Not Got Any Review</Text>
            {currentUser && (
              <TouchableOpacity 
                style={styles.addReviewButton} 
                onPress={() => navigation.navigate('ParticipantReviewEdit', { eventId })}
              >
                <Text style={styles.addReviewButtonText}>Please, Be our first reviewer?</Text>
              </TouchableOpacity>
            )}
          </View>
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => fetchData(true)}
            colors={['#4B0082']}
            tintColor="#4B0082"
          />
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#FF0000',
    fontSize: 16,
    marginVertical: 10,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#4B0082',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  listContent: {
    padding: 16,
    paddingBottom: 32,
  },
  reviewCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  myReviewCard: {
    borderColor: '#4B0082',
    borderWidth: 1.5,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  userInfoText: {
    flex: 1,
    marginLeft: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0D0FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitial: {
    color: '#4B0082',
    fontSize: 18,
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 15,
    color: '#003333',
    fontWeight: '600',
  },
  reviewDate: {
    fontSize: 12,
    color: '#B1B1B1',
    marginTop: 2,
  },
  myReviewBadge: {
    backgroundColor: '#4B0082',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginLeft: 8,
  },
  myReviewBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  reviewText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 16,
    lineHeight: 20,
  },
  ratingSection: {
    marginBottom: 12,
  },
  ratingLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
    marginBottom: 6,
  },
  facilitatorRating: {
    marginBottom: 8,
  },
  facilitatorName: {
    fontSize: 13,
    color: '#003333',
    fontWeight: '500',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingText: {
    fontSize: 14,
    color: '#4B0082',
    fontWeight: '600',
    marginLeft: 8,
  },
  moreFacilitators: {
    fontSize: 12,
    color: '#B1B1B1',
    marginTop: 4,
  },
  editButton: {
    backgroundColor: '#4B0082',
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    gap: 8,
  },
  editButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '500',
  },
  addReviewButton: {
    backgroundColor: '#4B0082',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  addReviewButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginVertical: 16,
    textAlign: 'center',
  },
});

export default ParticipantReviewList;