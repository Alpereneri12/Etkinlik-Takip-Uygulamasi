import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  
  const [modalVisible, setModalVisible] = useState(false);
  
  // Form State'leri
  const [organizer, setOrganizer] = useState('');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');

  const [events, setEvents] = useState([
    { 
        id: '1', 
        title: 'Belgrad Ormanı Koşusu', 
        location: 'Sarıyer, İstanbul', 
        date: '2026-05-10', 
        organizer: 'Alperen', 
        email: 'alperen@mail.com', 
        desc: 'Doğa içinde sabah koşusu.', 
        image: 'https://picsum.photos/seed/forest/400/300' 
    }
  ]);

  const handleAddEvent = () => {
    if (!title || !organizer || !date) {
      alert("İsim, Düzenleyen ve Tarih alanları zorunludur!");
      return;
    }

    const newEntry = {
      id: Math.random().toString(),
      title: title,
      organizer: organizer,
      email: email || 'İletişim yok',
      location: location || 'Belirtilmedi',
      date: date,
      image: imageUrl || `https://picsum.photos/seed/${Math.random()}/400/300`,
      desc: description || 'Açıklama girilmedi.'
    };

    setEvents([...events, newEntry].sort((a, b) => new Date(a.date) - new Date(b.date)));
    setModalVisible(false);
    // Temizle
    setOrganizer(''); setEmail(''); setTitle(''); setLocation(''); setDate(''); setImageUrl(''); setDescription('');
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Etkinlikler</Text>
        <TouchableOpacity style={styles.plusButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.plusText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList 
        data={events.filter(e => new Date(e.date) >= new Date())} 
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => router.push({ pathname: '/details', params: item })}>
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardSubtitle}>📍 {item.location} | 📅 {item.date}</Text>
              <Text style={styles.organizerTag}>👤 Düzenleyen: {item.organizer}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 20 }}
      />

      <Modal visible={modalVisible} animationType="slide">
        <SafeAreaView style={{flex: 1}}>
            <ScrollView style={styles.modalContent}>
                <Text style={styles.modalTitle}>Yeni Etkinlik Oluştur</Text>
                <TextInput style={styles.input} placeholder="Etkinlik Adı" value={title} onChangeText={setTitle} />
                <TextInput style={styles.input} placeholder="Düzenleyen Kişi" value={organizer} onChangeText={setOrganizer} />
                <TextInput style={styles.input} placeholder="İletişim Maili" value={email} onChangeText={setEmail} keyboardType="email-address" />
                <TextInput style={styles.input} placeholder="Lokasyon" value={location} onChangeText={setLocation} />
                <TextInput style={styles.input} placeholder="Tarih (YYYY-MM-DD)" value={date} onChangeText={setDate} />
                <TextInput style={styles.input} placeholder="Görsel URL (https://...)" value={imageUrl} onChangeText={setImageUrl} />
                <TextInput style={[styles.input, {height: 80}]} placeholder="Etkinlik Detayları..." value={description} onChangeText={setDescription} multiline />
                
                <TouchableOpacity style={styles.saveBtn} onPress={handleAddEvent}>
                    <Text style={styles.saveBtnText}>Yayınla</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setModalVisible(false)} style={{marginTop: 15, alignItems: 'center'}}>
                    <Text style={{color: 'red'}}>İptal Et</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: { flex: 1, backgroundColor: '#F8F9FA' },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, paddingTop: 50 },
  headerTitle: { fontSize: 28, fontWeight: 'bold' },
  plusButton: { backgroundColor: '#FF3B5C', width: 45, height: 45, borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
  plusText: { color: '#fff', fontSize: 28 },
  card: { backgroundColor: '#fff', borderRadius: 20, marginBottom: 20, elevation: 4, overflow: 'hidden' },
  cardImage: { width: '100%', height: 180 },
  cardContent: { padding: 15 },
  cardTitle: { fontSize: 18, fontWeight: 'bold' },
  cardSubtitle: { color: '#666', marginTop: 5 },
  organizerTag: { color: '#FF3B5C', marginTop: 10, fontWeight: '600' },
  modalContent: { padding: 25 },
  modalTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  input: { borderBottomWidth: 1, borderBottomColor: '#ddd', marginBottom: 20, padding: 10, fontSize: 16 },
  saveBtn: { backgroundColor: '#FF3B5C', padding: 18, borderRadius: 15, alignItems: 'center' },
  saveBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 18 }
});