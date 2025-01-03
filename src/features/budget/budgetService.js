const createBudget = async(budgetData) => {
    
    localStorage.setItem('budget', JSON.stringify(budgetData));
    return budgetData;
}

const getBudget = async() => {
    

    const jsonData = localStorage.getItem('budget');
    var data = JSON.parse(jsonData);
    
    return data
}

const budgetService = {
    createBudget,
    getBudget, 
    
}

export default budgetService