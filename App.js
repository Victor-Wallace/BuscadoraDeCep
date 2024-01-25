
import { SafeAreaView, StatusBar, StyleSheet, Dimensions } from 'react-native';
import Home from './src/Telas/Home/Home'

export default function App() {

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  return (
    <SafeAreaView style={{ flex: 1,width:windowWidth,height:windowHeight }}>
      <StatusBar />
      <Home />
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({


});
