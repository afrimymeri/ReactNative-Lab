import {StyleSheet, View} from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import {useContext, useLayoutEffect} from 'react';
import { ExpensesContext } from "../../store/expenses-context";
import Button from "../ui/Button";
import IconButton from "../ui/IconButton";
import { ExpenseForm } from "../ExpensesOutput/ManageExpense/ExpenseForm";

function ManageExpense({
    route, navigation
}) {
    const expenseCtx = useContext(ExpensesContext);
    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  function deleteExpenseHandler() {
    expenseCtx.deleteExpense(editedExpenseId);
    navigation.goBack();
  }
  function cancelHandler() {
    navigation.goBack();
  }
  function confirmHandler() {
    if (isEditing) {
      expenseCtx.updateExpense(editedExpenseId, {
        description : 'Test Expense',
        amount : 29.99,
        date : new Date('2025-01-01'),
      });
    }else{
      expnesesCtx.addExpense({
        description : 'Test Expense',
        amount : 19.99,
        date : new Date('2025-02-02'),
      });
    }
    navigation.goBack();
  }

  return (
      <View style={styles.container}>
        <ExpenseForm />
        <View style={styles.buttons}>
          <Button style={styles.button} onPress={cancelHandler} mode="flat">
            Cancel
          </Button>
            <Button style={styles.button} onPress={confirmHandler}>
              {isEditing ? 'Update' : 'Add'}
            </Button>
        </View>
        {isEditing && (
            <View>
              <IconButton
                icon="trash"
                color={GlobalStyles.colors.error500}
                size={36}
                onPress={deleteExpenseHandler}
              />
            </View>
        )}
      </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});