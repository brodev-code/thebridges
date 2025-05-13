import { StyleSheet } from "react-native";

export const _thParticipantReviewList = StyleSheet.create({
container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
 },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  backButton: {
    padding: 10,
  },
  header: {
    fontSize: 16,
    color: '#003333',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  headerDescription: {
    fontSize: 16,
    color: '#B1B1B1',
  },
  reviewCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#EBEBEB',
  },
  facilitatorName: {
    fontSize: 14,
    color: '#003333',
    fontWeight: '500',
    marginBottom: 5,
  },
  reviewText: {
    fontSize: 12,
    color: '#B1B1B1',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingContainerText: {
    fontSize: 14,
    color: '#4B0082',
    fontWeight: '500',
  },
  noReviews: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
  },
  addReviewButton: {
    backgroundColor: '#4A148C',
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  addReviewButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  ratingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  ratingLabel: {
    fontSize: 14,
    color: '#333333',
    marginRight: 8,
  },
  ratingText: {
    fontSize: 14,
    color: '#333333',
    marginLeft: 8,
  },
  facilitatorRating: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
});