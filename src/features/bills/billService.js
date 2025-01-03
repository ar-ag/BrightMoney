

const createBill = async(billData) => {
    console.log(billData);
    const jsonData = localStorage.getItem('billings');
    var data = []
    if (jsonData !== undefined && jsonData !== null) {
        data = JSON.parse(jsonData);
      }
    const newData = [...data, billData];
    localStorage.setItem('billings', JSON.stringify(newData));
    return billData;
}

const getBills = async(token) => {
    

    const jsonData = localStorage.getItem('billings');
    var data = []
    if (jsonData !== undefined && jsonData !== null) {
        data = JSON.parse(jsonData);
      }
    console.log('inside getBills', data);
    return data
}

const deleteBill = async(billId) => {
    const jsonData = localStorage.getItem('billings');
    let data = [];
    if (jsonData !== undefined && jsonData !== null) {
        data = JSON.parse(jsonData);
    }
    const newData = data.filter((bill) => bill.id !== billId);
    console.log('inside delete bill servive', newData);
    localStorage.setItem('billings', JSON.stringify(newData));
    return billId;

}

const updateBill = async(updatedBill) => {
    
    const jsonData = localStorage.getItem('billings');
    let data = [];

    
    if (jsonData !== undefined && jsonData !== null) {
        data = JSON.parse(jsonData);
    }

    
    const filteredData = data.filter(function (bill) {
        return bill.id !== updatedBill.id;
    });

    
    const newData = [...filteredData, updatedBill];

    
    localStorage.setItem('billings', JSON.stringify(newData));

    
    return newData;

}

const billService = {
    createBill,
    getBills, 
    deleteBill,
    updateBill
}

export default billService