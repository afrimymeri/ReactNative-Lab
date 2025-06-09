import { useContext } from "react";

import { getDateMinusDays } from "../../utils/date";
import ExpensesOutput from "../ExpensesOutput/ExpensesOutput";

function RecentExpenses() {
    const expensesCtx= useContext(ExpensesContext);

    const recentExpenses = expensesCtx.expenses.filter((expense) => {
        const today = new Date();
        const date7daysago = getDateMinusDays(today, 7);
        return expense.date >= date7daysago && expense.date <= today;
    });

    return(
        <ExpensesOutput 
            expenses={recentExpenses} 
            expensesPeriod="Last 7 Days" 
            fallbackText="No expenses registered for the last 7 days!" 
        />
    );
}

export default RecentExpenses;