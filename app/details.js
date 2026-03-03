import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function DetailsScreen() {
  const item = useLocalSearchParams();
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={{fontWeight: 'bold'}}>← Geri</Text>
      </TouchableOpacity>
      
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.organizerInfo}>Düzenleyen: {item.organizer}</Text>
        <Text style={styles.contactInfo}>📧 {item.email}</Text>
        
        <View style={styles.divider} />
        
        <Text style={styles.sectionTitle}>Etkinlik Detayı</Text>
        <Text style={styles.desc}>{item.desc}</Text>

        <View style={styles.infoBox}>
            <Text>📍 {item.location}</Text>
            <Text>📅 {item.date}</Text>
        </View>
        
        <TouchableOpacity style={styles.btn} onPress={() => alert('Katılım isteği ' + item.organizer + ' kişisine iletildi!')}>
          <Text style={styles.btnText}>ETKİNLİĞE KATIL</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  image: { width: '100%', height: 300 },
  backButton: { position: 'absolute', top: 40, left: 20, backgroundColor: '#fff', padding: 10, borderRadius: 12 },
  content: { padding: 25, marginTop: -20, backgroundColor: '#fff', borderTopLeftRadius: 25, borderTopRightRadius: 25 },
  title: { fontSize: 26, fontWeight: 'bold' },
  organizerInfo: { fontSize: 16, color: '#FF3B5C', fontWeight: '600', marginTop: 5 },
  contactInfo: { fontSize: 14, color: '#666', marginTop: 2 },
  divider: { height: 1, backgroundColor: '#eee', marginVertical: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  desc: { fontSize: 16, color: '#444', lineHeight: 24 },
  infoBox: { backgroundColor: '#F8F9FA', padding: 15, borderRadius: 15, marginTop: 20 },
  btn: { backgroundColor: '#FF3B5C', padding: 18, borderRadius: 15, alignItems: 'center', marginTop: 30 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});