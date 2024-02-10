import { Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        gap: 10,
        width: '100%',
        height: 150,
        borderRadius: 16,
        backgroundColor: '#2C2C2C',
        padding: 20,
        ...Platform.select({
            ios: {
              shadowColor: 'rgba(99, 99, 99, 0.2)',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 1,
              shadowRadius: 8,
            },
            android: {
              elevation: 4,
            },
    })
},
title: {
    fontSize: 20,
    fontWeight: '400',
    color: "#A9A9A9"
},
dateTime: {
    flexDirection: 'row',
    gap: 20,
},
location: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
},
aside: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center'
},
asideText: {
    fontSize: 16,
    fontWeight: '400',
    color: "#A9A9A9"

}
})

export default styles;