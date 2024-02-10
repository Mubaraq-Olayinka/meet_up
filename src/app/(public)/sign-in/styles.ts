import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        backgroundColor: '#343434',
    },
    logo: {
        fontSize: 20,
        fontWeight: '700',
        color: '#A9A9A9',
    },
    form: {
        flexDirection: 'column',
        gap: 10
    },
    input: {
        width: '100%',
        height: 56,
        borderColor: '#A9A9A9',
        borderWidth: 1,
        borderRadius: 6,
        color: '#A9A9A9',
        fontWeight: '400',
        paddingHorizontal: 10
    },
    loginButton: {
        width: '100%',
        height: 56,
        backgroundColor: '#A9A9A9',
        justifyContent: 'center',
        borderRadius: 6,
    },
    googleLoginButton: {
        flexDirection: 'row',
        gap: 5,
        width: '100%',
        height: 56,
        backgroundColor: '#A9A9A9',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
    },
    bottom: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
    },
    bottomButton: {
        color: '#A9A9A9'
    }
});

export default styles;
