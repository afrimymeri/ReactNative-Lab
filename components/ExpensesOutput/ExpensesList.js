import ExpenseItem from "./ExpenseItem";

function renderExponseItem(itemData) {
    return < ExpenseItem {...itemData.item} />
}

function ExpensesList({ expenses }) {
    return (
        <FlatList 
            data = { expenses }
            renderItem = {renderExponseItem}
            keyExtractor = {(item) => item.id}
        />
    );
}

export default ExpensesList;