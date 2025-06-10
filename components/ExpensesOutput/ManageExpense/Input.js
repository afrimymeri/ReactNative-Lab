import { Text, TextInput, View, StyleSheet } from 'react-native';
import {GlobalStyles} from "../../../constants/styles";

function Input({label,style,textInputConfig}) {
    const inputStyles = [styles.input]; // munet me kan const masi masi qe osht reference value

    if (textInputConfig && textInputConfig.multiline) {
        inputStyles.push(styles.multiline); // Add multiline styles if applicable
    }

    return (
        <View style={[styles.inputContainer, style]}>
            <Text style={styles.label}>{label}</Text>
            <TextInput style={inputStyles} {...textInputConfig} />
        </View>
    );
}

export default Input;

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4,
        marginVertical: 8,
        flex: 1,
    },
    label: {
        fontSize: 12,
        color: GlobalStyles.colors.primary100,
        marginBottom: 4,
    },
    input: {
        backgroundColor: GlobalStyles.colors.primary100,
        color: GlobalStyles.colors.primary700,
        padding : 6,
        borderRadius: 6,
        fontSize: 18,
    },
    inputMultiLine: {
        minHeight :100,
        textAlignVertical: 'top',

    }
});