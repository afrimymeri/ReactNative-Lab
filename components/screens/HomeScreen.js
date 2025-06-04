import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome, Ionicons } from "@expo/vector-icons";

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <StatusBar style="auto" />
      
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Welcome back</Text>
          <Text style={styles.nameText}>Filan!</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color="#212f3d" />
        </TouchableOpacity>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <View style={styles.actionIcon}>
            <FontAwesome name="user" size={24} color="#fff" />
          </View>
          <Text style={styles.actionText}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate('Items')}
        >
          <View style={[styles.actionIcon, { backgroundColor: '#4CAF50' }]}>
            <FontAwesome name="list" size={24} color="#fff" />
          </View>
          <Text style={styles.actionText}>Items</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate('SignIn')}
        >
          <View style={[styles.actionIcon, { backgroundColor: '#E91E63' }]}>
            <FontAwesome name="sign-in" size={24} color="#fff" />
          </View>
          <Text style={styles.actionText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate('SignUp')}
        >
          <View style={[styles.actionIcon, { backgroundColor: '#9C27B0' }]}>
            <FontAwesome name="user-plus" size={24} color="#fff" />
          </View>
          <Text style={styles.actionText}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      {/* Recent Activity Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <View style={styles.activityCard}>
          <View style={styles.activityHeader}>
            <Image
              style={styles.activityAvatar}
              source={{ uri: "https://i.pravatar.cc/100" }}
            />
            <View style={styles.activityInfo}>
              <Text style={styles.activityName}>John Doe</Text>
              <Text style={styles.activityTime}>2 hours ago</Text>
            </View>
          </View>
          <Text style={styles.activityText}>
            Just completed the React Native tutorial! 🚀
          </Text>
        </View>

        <View style={styles.activityCard}>
          <View style={styles.activityHeader}>
            <Image
              style={styles.activityAvatar}
              source={{ uri: "https://i.pravatar.cc/101" }}
            />
            <View style={styles.activityInfo}>
              <Text style={styles.activityName}>Jane Smith</Text>
              <Text style={styles.activityTime}>5 hours ago</Text>
            </View>
          </View>
          <Text style={styles.activityText}>
            Started learning mobile development with React Native
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  welcomeSection: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212f3d',
    textAlign: 'center',
  },
  notificationButton: {
    padding: 8,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 15,
    backgroundColor: '#fff',
    marginTop: 10,
  },
  actionButton: {
    width: '25%',
    alignItems: 'center',
    marginBottom: 15,
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#212f3d',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 12,
    color: '#666',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212f3d',
    marginBottom: 15,
  },
  activityCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  activityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  activityAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  activityInfo: {
    flex: 1,
  },
  activityName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212f3d',
  },
  activityTime: {
    fontSize: 12,
    color: '#666',
  },
  activityText: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
}); 