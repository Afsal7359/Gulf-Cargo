import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList, View, Text, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import { Image } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Color from '../../Components/Color';
import Backicon from '../../../assets/imagesS/back.png';
import AddIcon from '../../../assets/imagesS/addicon.png';
import { fetchInvoices, resetInvoices } from '../../Components/Redux/invoiceSlice';


const Cargolist = ({ navigation }) => {
  const dispatch = useDispatch();
  const { data: datalist, page, loading, hasMore } = useSelector(state => state.invoices);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(datalist);

  useEffect(() => {
    dispatch(fetchInvoices(1)); // Fetch the first page of data on mount

    return () => {
      dispatch(resetInvoices()); // Reset the data when leaving the screen, if necessary
    };
  }, [dispatch]);

  useEffect(() => {
    // Filter the data based on the search query
    if (searchQuery) {
      const filtered = datalist.filter(item =>
        item.booking_number.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(datalist); // Show all data if the search query is cleared
    }
  }, [searchQuery, datalist]);

  const loadMoreData = () => {
    if (!loading && hasMore) {
      dispatch(fetchInvoices(page)); // Fetch the next page of data
    }
  };

  return (
    <View>
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={Backicon} style={{ height: 35, width: 35 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("createinvoice")}>
          <Image source={AddIcon} style={{ height: 40, width: 40 }} />
        </TouchableOpacity>
      </View>
      
      <SearchBar
        placeholder="Type Here..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        round
        containerStyle={{
          backgroundColor: 'transparent',
          borderBottomColor: 'transparent',
          borderTopColor: 'transparent',
          paddingHorizontal: 10,
        }}
        inputContainerStyle={{
          backgroundColor: Color.whitecolor,
          borderRadius: 10,
          height: 50,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.5,
          shadowRadius: 2,
          elevation: 5,
        }}
        inputStyle={{
          color: '#000',
        }}
        placeholderTextColor="#999"
      />
      
      <FlatList
        data={filteredData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.Mainview}
            onPress={() => navigation.navigate('cargoview', { data: item.id })}>
            <Text style={styles.invoiceBtnText}>{item.booking_number}</Text>
          </TouchableOpacity>
        )}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading && <ActivityIndicator size={65} color={Color.maincolor} />}
        style={styles.scrollview}
      />
    </View>
  );
};

const windowHeight = Dimensions.get('window').height;

const styles = {
  header: {
    height: 65,
    backgroundColor: Color.maincolor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  headerBackText: {
    color: '#fff',
    fontSize: 18,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  Mainview: {
    backgroundColor: Color.maincolor,
    marginHorizontal: 10,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    marginVertical: 1,
  },
  invoicebtn: {
    backgroundColor: Color.Green,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 25,
    marginHorizontal: 45,
    borderRadius: 15,
  },
  invoiceBtnText: {
    color: Color.whitecolor,
    fontWeight: "900"
  },
  scrollview: {
    marginVertical: 1,
    maxHeight: windowHeight / 1.21,
  },
};

export default Cargolist;
