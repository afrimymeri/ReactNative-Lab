import Input from "./Input";
import {StyleSheet, View} from "react-native";

function ExpenseForm() {
    function amountChangedHandler() {
    }

    return (
        <View>
            <View style={styles.inputRow}>
                <Input label = "Amount" textInputConfig={
                    {keyboardType: 'decimal-pad',
                        onChangeText: amountChangedHandler
                    }} />
                <Input label = "Date" textInputConfig={{
                    placeholder : 'YYYY-MM-DD',
                    maxLength: 10,
                    onChangeText: () => {}
                }} />
            </View>
                <Input label = "Description" textInputConfig={{
                    multiline: true,
                    autoCorrect: false,
                }}  />

    </View>
    )
}

export default ExpenseForm;

const styles = StyleSheet.create(
    {
        inputRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16,
        },
    }
);