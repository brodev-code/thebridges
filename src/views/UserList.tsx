import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { UserController } from '../controllers/UserController';
import { User } from '../models/User';
import { _thUserList } from '../styles/UserListStyles';

const UserList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await UserController.getUsers();
                setUsers(data);
            } catch (error) {
                console.error('Failed to fetch users', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <View style={_thUserList.container}>
            <Text style={_thUserList.header}>User List</Text>
            <FlatList
                data={users}
                keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
                renderItem={({ item }) => (
                    <View style={_thUserList.userItem}>
                        <Text>{item.name}</Text>
                        <Text>{item.email}</Text>
                    </View>
                )}
            />
        </View>
    );
};

export default UserList;