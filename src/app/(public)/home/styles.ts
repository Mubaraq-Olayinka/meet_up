import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        backgroundColor: '#343434',
        paddingHorizontal: 24,
        gap: 20,
    },
    logo: {
        fontSize: 20,
        fontWeight: '700',
        color: '#A9A9A9',
    },
    top: { 
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    topRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    scroll: {
        flexDirection: 'column',
        gap: 20
    }

});

export default styles;