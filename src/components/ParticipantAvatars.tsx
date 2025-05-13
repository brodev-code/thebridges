import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import { api } from "../services/api";
import { _thParticipantAvatars } from "../theme";

interface ParticipantAvatarsProps {
  eventId: number;
}

interface Participant {
  user_id: number | null;
  name: string;
  avatar: string | null;
}

const ParticipantAvatars: React.FC<ParticipantAvatarsProps> = ({ eventId }) => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!eventId) {
      setError("Event ID is required.");
      setLoading(false);
      return;
    }

    const fetchParticipants = async () => {
      try {
        const response = await api.get(`/tickets/${eventId}/paid-participants`);
        const data = response.data;

        if (response.status === 200) {
          setParticipants(data.data);
        } else {
          setError(data.errors || "An error occurred.");
        }
      } catch (err) {
        setError("Failed to fetch participants.");
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();
  }, [eventId]);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View style={_thParticipantAvatars.container}>
      <FlatList
        horizontal
        data={participants}
        keyExtractor={(item) => (item.user_id ? item.user_id.toString() : Math.random().toString())}
        renderItem={({ item }) => (
          <View style={_thParticipantAvatars.participant}>
            <Image source={require('../assets/avatar.png')} style={_thParticipantAvatars.avatar} />
            <Text style={_thParticipantAvatars.name}>{item.name}</Text>
          </View>
        )}
        ListFooterComponent={() =>
          participants.length > 5 && (
            <View style={_thParticipantAvatars.moreContainer}>
              <Text style={_thParticipantAvatars.moreText}>+{participants.length - 5}</Text>
            </View>
          )
        }
      />
    </View>
  );
};

export default ParticipantAvatars;
