import React, { useState } from 'react';
import { Modal, FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { countryCodes } from '../models/CountryCodes';
import { _thPayment } from '../styles/PaymentStyles';
import { theme } from '../theme';
import { BroIcons } from './Icons';

type Props = {
  selected: string;
  onSelect: (code: string) => void;
};

const CountrySelector = ({ selected, onSelect }: Props) => {
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState('');

  const filteredCountries = countryCodes.filter(
    item =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <TouchableOpacity
        style={[_thPayment.input, _thPayment.partSide, { justifyContent: 'center' }]}
        onPress={() => setVisible(true)}
      >
        <Text style={{ color: selected ? '#000' : theme.placeholderColor.color }}>
          {selected || 'Select Country'}
        </Text>
      </TouchableOpacity>

      <Modal visible={visible} animationType="slide">
        <View style={{ flex: 1, padding: 20, backgroundColor: '#fff' }}>
          <TextInput
            placeholder="Search country"
            placeholderTextColor={theme.placeholderColor.color}
            value={search}
            onChangeText={setSearch}
            style={[
              _thPayment.input,
              { marginBottom: 15, backgroundColor: '#f0f0f0' }
            ]}
          />
          <FlatList
            data={filteredCountries}
            keyExtractor={item => item.code}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{ paddingVertical: 12, borderBottomWidth: 1, borderColor: '#eee' }}
                onPress={() => {
                  onSelect(item.code);
                  setVisible(false);
                }}
              >
                <Text>{item.name} ({item.code})</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity onPress={() => setVisible(false)} style={{ marginTop: 20 }}>
            <Text style={{ color: theme.primary.color }}><BroIcons.ArrowDown size={16} color={theme.primary.color} /> Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

export default CountrySelector;
