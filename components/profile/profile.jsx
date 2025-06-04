import { View, Text, Image, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { s } from './profilecard.style';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome, Ionicons } from "@expo/vector-icons";

function Profile({ navigation }) {
    return (
        <SafeAreaView style={s.container}>
            <ScrollView>
                <View style={s.header}>
                    <TouchableOpacity 
                        style={s.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="arrow-back" size={24} color="#212f3d" />
                    </TouchableOpacity>
                    
                    <View style={s.profileHeader}>
                        <Image
                            style={s.avatar}
                            source={{ uri: "https://i.pravatar.cc/300" }}
                        />
                        <View style={s.texts}>
                            <Text style={s.name}>Filan Fisteku</Text>
                            <Text style={s.username}>@filanfisteku</Text>
                            <Text style={s.bio}>
                                Software Developer
                            </Text>
                        </View>
                    </View>

                    <View style={s.statsContainer}>
                        <View style={s.statItem}>
                            <Text style={s.statNumber}>1.2k</Text>
                            <Text style={s.statLabel}>Followers</Text>
                        </View>
                        <View style={s.statItem}>
                            <Text style={s.statNumber}>450</Text>
                            <Text style={s.statLabel}>Following</Text>
                        </View>
                        <View style={s.statItem}>
                            <Text style={s.statNumber}>89</Text>
                            <Text style={s.statLabel}>Posts</Text>
                        </View>
                    </View>

                    <View style={s.social}>
                        <TouchableOpacity style={s.socialButton}>
                            <FontAwesome name="twitter" size={24} color="#1DA1F2" />
                        </TouchableOpacity>
                        <TouchableOpacity style={s.socialButton}>
                            <FontAwesome name="linkedin-square" size={24} color="#0077B5" />
                        </TouchableOpacity>
                        <TouchableOpacity 
                        style={s.socialButton}
                        onPress={() => Linking.openURL('https://github.com/afrimymeri')}
                        >
                            <FontAwesome name="github" size={24} color="#333" />
                        </TouchableOpacity>
                        <TouchableOpacity 
                          style={s.socialButton}
                          onPress={() => Linking.openURL('https://www.instagram.com/afrimymerii')}
                        >
                          <FontAwesome name="instagram" size={24} color="#E1306C" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={s.content}>
                    <Text style={s.sectionTitle}>About Me</Text>
                    <Text style={s.aboutText}>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat, dignissimos asperiores blanditiis nisi inventore eum, enim distinctio ipsa tenetur incidunt quis molestias aut quisquam magni repellendus accusamus cumque. Nesciunt, excepturi?
                    </Text>

                    <Text style={s.sectionTitle}>Skills</Text>
                    <View style={s.skillsContainer}>
                        <View style={s.skillTag}>
                            <Text style={s.skillText}>React Native</Text>
                        </View>
                        <View style={s.skillTag}>
                            <Text style={s.skillText}>Laravel</Text>
                        </View>
                        <View style={s.skillTag}>
                            <Text style={s.skillText}>Vue.js</Text>
                        </View>
                        <View style={s.skillTag}>
                            <Text style={s.skillText}>MySQL</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default Profile;
