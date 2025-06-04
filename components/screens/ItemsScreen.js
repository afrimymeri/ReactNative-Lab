import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Alert, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from 'react';
import { getItems, addItem, deleteItem, updateItem } from '../../utils/http';

export default function ItemsScreen({ navigation }) {
  const [items, setItems] = useState([]);
  const [newItemTitle, setNewItemTitle] = useState('');
  const [newItemDescription, setNewItemDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    setIsLoading(true);
    try {
      const itemsList = await getItems();
      setItems(itemsList);
    } catch (error) {
      console.error('Error loading items:', error);
      Alert.alert(
        'Error',
        'Failed to load items. Please check your internet connection and try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddItem = async () => {
    if (!newItemTitle.trim()) {
      Alert.alert('Error', 'Title is required');
      return;
    }
    if (!newItemDescription.trim()) {
      Alert.alert('Error', 'Description is required');
      return;
    }

    setIsLoading(true);
    try {
      const newItem = {
        title: newItemTitle,
        description: newItemDescription,
        createdData: new Date().toISOString(),
      };
      
      const addedItem = await addItem(newItem);
      setItems(prevItems => [addedItem, ...prevItems]);
      
      setNewItemTitle('');
      setNewItemDescription('');
    } catch (error) {
      console.error('Error adding item:', error);
      Alert.alert(
        'Error',
        'Failed to add item. Please check your internet connection and try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditItem = async (id) => {
    const item = items.find(item => item.id === id);
    setEditingItem(id);
    setEditTitle(item.title);
    setEditDescription(item.description || '');
  };

  const handleSaveEdit = async () => {
    if (!editTitle.trim()) {
      Alert.alert('Error', 'Title is required');
      return;
    }

    setIsLoading(true);
    try {
      const updatedItem = {
        title: editTitle,
        description: editDescription,
        createdAt: items.find(item => item.id === editingItem).createdAt
      };

      await updateItem(editingItem, updatedItem);
      setItems(prevItems => 
        prevItems.map(item => 
          item.id === editingItem 
            ? { ...item, ...updatedItem }
            : item
        )
      );
      
      setEditingItem(null);
      setEditTitle('');
      setEditDescription('');
    } catch (error) {
      console.error('Error updating item:', error);
      Alert.alert(
        'Error',
        'Failed to update item. Please check your internet connection and try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    setEditTitle('');
    setEditDescription('');
  };

  const handleDeleteItem = async (id) => {
    setIsLoading(true);
    try {
      await deleteItem(id);
      setItems(prevItems => prevItems.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
      Alert.alert(
        'Error',
        'Failed to delete item. Please check your internet connection and try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#212f3d" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Items</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.container}>
        {/* Add Item Form */}
        <View style={styles.addItemForm}>
          <TextInput
            style={styles.input}
            placeholder="Item Title"
            value={newItemTitle}
            onChangeText={setNewItemTitle}
            editable={!isLoading}
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Item Description"
            value={newItemDescription}
            onChangeText={setNewItemDescription}
            multiline
            editable={!isLoading}
          />
          <TouchableOpacity 
            style={[styles.addButton, isLoading && styles.disabledButton]} 
            onPress={handleAddItem}
            disabled={isLoading}
          >
            <Text style={styles.addButtonText}>
              {isLoading ? 'Adding...' : 'Add Item'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Items List */}
        {isLoading && items.length === 0 ? (
          <Text style={styles.loadingText}>Loading items...</Text>
        ) : (
          items.map((item) => (
            <View key={item.id} style={styles.itemCard}>
              {editingItem === item.id ? (
                // Edit Form
                <View>
                  <TextInput
                    style={styles.input}
                    value={editTitle}
                    onChangeText={setEditTitle}
                    placeholder="Item Title"
                    editable={!isLoading}
                  />
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    value={editDescription}
                    onChangeText={setEditDescription}
                    placeholder="Item Description"
                    multiline
                    editable={!isLoading}
                  />
                  <View style={styles.editButtons}>
                    <TouchableOpacity 
                      style={[styles.editButton, styles.saveButton]} 
                      onPress={handleSaveEdit}
                      disabled={isLoading}
                    >
                      <Text style={styles.editButtonText}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={[styles.editButton, styles.cancelButton]} 
                      onPress={handleCancelEdit}
                      disabled={isLoading}
                    >
                      <Text style={styles.editButtonText}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                // Item Display
                <>
                  <View style={styles.itemHeader}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <View style={styles.itemActions}>
                      <TouchableOpacity 
                        onPress={() => handleEditItem(item.id)}
                        disabled={isLoading}
                        style={styles.actionButton}
                      >
                        <Ionicons 
                          name="pencil-outline" 
                          size={24} 
                          color={isLoading ? "#ccc" : "#212f3d"} 
                        />
                      </TouchableOpacity>
                      <TouchableOpacity 
                        onPress={() => handleDeleteItem(item.id)}
                        disabled={isLoading}
                        style={styles.actionButton}
                      >
                        <Ionicons 
                          name="trash-outline" 
                          size={24} 
                          color={isLoading ? "#ccc" : "#ff4444"} 
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Text style={styles.itemDescription}>{item.description}</Text>
                  <Text style={styles.itemDate}>{

                  new Date(item.createdAt).toLocaleDateString('en-GB', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    calendar: 'gregory'
                  })
                }
                  </Text>
                </>
              )}
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
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
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212f3d',
  },
  headerRight: {
    width: 40,
  },
  addItemForm: {
    backgroundColor: '#fff',
    padding: 15,
    margin: 15,
    borderRadius: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  addButton: {
    backgroundColor: '#212f3d',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212f3d',
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  itemDate: {
    fontSize: 12,
    color: '#999',
  },
  disabledButton: {
    opacity: 0.7,
  },
  loadingText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
  },
  itemActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    marginLeft: 10,
  },
  editButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#28a745',
  },
  cancelButton: {
    backgroundColor: '#6c757d',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 