import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'space-between',
    // alignItems: 'center',
    backgroundColor: '#343434',
    paddingHorizontal: 24,
  },
  logo: {
    fontSize: 20,
    fontWeight: '700',
    color: '#A9A9A9',
  },
  center:{
    flexDirection: 'column',
    gap: 20
  },
  header: {
    fontSize: 20,
    fontWeight: '400',
    color: "#A9A9A9"
  },
  text: {
    fontWeight: '400',
    color: "#A9A9A9"
  },
  line:{
    borderBottomColor: '#A9A9A9',
    borderBottomWidth: 0.5
  },
})

export default styles