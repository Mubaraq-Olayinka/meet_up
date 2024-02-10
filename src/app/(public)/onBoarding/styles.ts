import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#343434',
    width: '100%',
    gap: 20,
    paddingHorizontal: 24
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff'
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    color: '#fff',
    textAlign: 'center'
  }
});

export default styles;
