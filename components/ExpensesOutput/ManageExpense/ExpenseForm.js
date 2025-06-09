import Input from "./Input";
import {View} from "react-native";

function ExpenseForm() {
    function amountChangedHandler() {
    }

    return <View>
        <Input label = "Amount" textInputConfig={
            {keyboardType: 'decimal-pad',
            onChangeText: amountChangedHandler
        }} />
        <Input label = "Date" textInputConfig={{
            placeholder : 'YYYY-MM-DD',
            
        }} />
        <Input label = "Description"  />

    </View>
}

export default ExpenseForm;