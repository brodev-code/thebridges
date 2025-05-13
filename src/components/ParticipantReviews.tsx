import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  ActivityIndicator, 
  StyleSheet, 
  TouchableOpacity, 
  Image,
  TouchableWithoutFeedback 
} from 'react-native';
import { api } from '../services/api';
import { BroIcons } from './Icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../routes';

interface User {
  id: number;
  name: string;
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
  user_id: any;
  id: number;
  review: string;
  event_rating: number;
  is_public: boolean;
  facilitator_ratings?: FacilitatorRating[];
  user?: User;
  created_at: string;
}

const ParticipantReviews = ({ eventId }: { eventId: number }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'ParticipantReviewList'>>();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await api.get(`/events/${eventId}/public/reviews`);
        if (response.data?.success) {
          // Fetch user details for each review
          const reviewsWithUsers = await Promise.all(
            response.data.data.map(async (review: Review) => {
              try {
                const userResponse = await api.get(`/user/${review.user_id}`);
                return {
                  ...review,
                  user: {
                    id: review.user_id,
                    name: userResponse.data?.profile?.name || `User ${review.user_id}`,
                    avatar: userResponse.data?.profile?.image 
                      ? `https://thebridges.duckdns.org${userResponse.data.profile.image}`
                      : null
                  },
                  facilitator_ratings: review.facilitator_ratings || []
                };
              } catch (error) {
                console.error(`Error fetching user ${review.user_id}:`, error);
                return {
                  ...review,
                  user: { id: review.user_id, name: `User ${review.user_id}`, avatar: null },
                  facilitator_ratings: review.facilitator_ratings || []
                };
              }
            })
          );
          setReviews(reviewsWithUsers);
        } else {
          setError('Failed to load reviews');
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setError('Error loading reviews. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [eventId]);

  const handleNavigateToAllReviews = () => {
    navigation.navigate('ParticipantReviewList', { eventId });
  };

  const truncateText = (text: string, maxLength: number = 100) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#4B0082" style={{ marginVertical: 20 }} />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  if (reviews.length === 0) {
    return <Text style={styles.noReviews}>No reviews available yet.</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.cardHeader}>
        <Text style={styles.header}>Participant Reviews</Text>
        <TouchableOpacity onPress={handleNavigateToAllReviews}>
          <Text style={styles.headerDescription}>See All ({reviews.length})</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={reviews.slice(0, 3)}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => {
          const userName = item.user?.name || 'Anonymous';
          const userAvatar = item.user?.avatar;
          const facilitatorRatings = item.facilitator_ratings || [];

          return (
            <TouchableWithoutFeedback 
              onPress={() => navigation.navigate('ParticipantReviewList', { eventId })}
            >
              <View style={styles.reviewCard}>
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
                      {new Date(item.created_at).toLocaleDateString()}
                    </Text>
                  </View>
                </View>
                
                <Text style={styles.reviewText} numberOfLines={3}>
                  {truncateText(item.review, 120)}
                </Text>
                
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
                    {facilitatorRatings.slice(0, 1).map((fr) => (
                      <View key={fr.id} style={styles.facilitatorRating}>
                        <Text style={styles.facilitatorName} numberOfLines={1}>
                          {fr.facilitator?.name || 'Unknown Facilitator'}
                        </Text>
                        <View style={styles.ratingContainer}>
                          {renderStars(fr.rating)}
                          <Text style={styles.ratingText}>{fr.rating.toFixed(1)}</Text>
                        </View>
                      </View>
                    ))}
                    {facilitatorRatings.length > 1 && (
                      <Text style={styles.moreFacilitators}>
                        +{facilitatorRatings.length - 1} more facilitators
                      </Text>
                    )}
                  </>
                )}
              </View>
            </TouchableWithoutFeedback>
          );
        }}
      />
    </View>
  );
};

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

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  header: {
    fontSize: 16,
    fontWeight: '500',
    color: '#003333',
  },
  headerDescription: {
    fontSize: 14,
    color: '#4B0082',
    fontWeight: '500',
  },
  listContent: {
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  reviewCard: {
    width: 280,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 8,
  },
  avatarPlaceholder: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E0D0FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  avatarInitial: {
    color: '#4B0082',
    fontSize: 16,
    fontWeight: 'bold',
  },
  userInfoText: {
    flex: 1,
  },
  userName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#003333',
  },
  reviewDate: {
    fontSize: 12,
    color: '#B1B1B1',
    marginTop: 2,
  },
  reviewText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  ratingSection: {
    marginBottom: 8,
  },
  ratingLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  facilitatorRating: {
    marginBottom: 6,
  },
  facilitatorName: {
    fontSize: 12,
    fontWeight: '500',
    color: '#003333',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4B0082',
    marginLeft: 6,
  },
  moreFacilitators: {
    fontSize: 12,
    color: '#B1B1B1',
    marginTop: 4,
  },
  noReviews: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  errorText: {
    textAlign: 'center',
    color: '#FF0000',
    fontSize: 14,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
});

export default ParticipantReviews;