

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBills, deleteBill } from '../features/bills/billSlice';
import { useNavigate } from 'react-router-dom';
import { createBudget, getBudget } from '../features/budget/budgetSlice';

const Home = () => {
    const navigate = useNavigate();
    const { bills, isLoading, isError, message } = useSelector((state) => state.bills);
    const { budget, isLoading1, isError1, message1} = useSelector((state) => state.budget)
    const dispatch = useDispatch();
    const [selectedCategory, setSelectedCategory] = useState('All Categories');
    const [selectedBills, setSelectedBills] = useState([]);
    const [billsToPayCount, setBillsToPayCount] = useState(0);
    // const monthlyBudget = 5000;
    

    useEffect(() => {
        if (isError) {
            console.log(message);
        }
        dispatch(getBills());
        dispatch(getBudget());
    }, [isError, message, dispatch]);

    useEffect(() => {
        calculateBillsToPay();
    }, [bills, budget]);

    const categories = [
        'All Categories',
        'FoodNDining',
        'Utility',
        'Shopping',
        'Education',
        'Personal Care',
        'Travel',
        'Misc'
    ];

    const filteredBills = bills.filter(bill =>
        selectedCategory === 'All Categories' ? true : bill.category === selectedCategory
    );

    const totalAmount = filteredBills.reduce((acc, bill) => acc + Number(bill.amount), 0);
    const totalBills = filteredBills.length;

    const calculateBillsToPay = () => {
        let remainingBudget = budget;
        const sortedBills = [...bills].sort((a, b) => a.amount - b.amount);
        const selected = [];

        for (const bill of sortedBills) {
            if (remainingBudget >= bill.amount) {
                remainingBudget -= bill.amount;
                selected.push(bill.id);
            } else {
                break;
            }
        }

        setSelectedBills(selected);
        setBillsToPayCount(selected.length);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this bill?")) {
            dispatch(deleteBill(id));
            dispatch(getBills());
        }
    };

    const handleEdit = (bill) => {
        navigate('/form', { state: { bill } });
    };

    const handleMonthlyBudgetChange = (event) => {
        // setMonthlyBudget(parseFloat(event.target.value)); // Update state with parsed float value
        event.preventDefault();
        const budgetData = parseFloat(event.target.value);
        dispatch(createBudget(budgetData));
      };
    

    return (
        <div className="p-4 sm:ml-64 relative overflow-x-auto sm:rounded-lg">
            <div className="grid grid-cols-3 gap-2">
                <div className="p-6 bg-red-100 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-red-500 dark:text-white">
                        Total Amount
                    </h5>
                    <p className="font-normal text-xl text-red-800 dark:text-gray-400">
                        ${totalAmount.toFixed(2)}
                    </p>
                </div>

                <div className="p-6 bg-yellow-100 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <label htmlFor="monthlyBudget" className="mb-2 text-2xl font-bold tracking-tight text-yellow-500 dark:text-white">
                        Monthly Budget
                    </label>
                    <input
                        type="number"
                        id="monthlyBudget"
                        className="block w-full px-3 py-2 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-800 dark:text-gray-500"
                        value={budget} 
                        onChange={handleMonthlyBudgetChange}
                    />
                </div>

                <div className="p-6 bg-green-100 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-green-500 dark:text-white">
                        Bills to Pay
                    </h5>
                    <p className="font-normal text-xl text-green-800 dark:text-gray-400">
                        {billsToPayCount}
                    </p>
                </div>
            </div>

            <table className="w-full my-6 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Description</th>
                        <th scope="col" className="px-6 py-3">
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                {categories.map(category => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </th>
                        <th scope="col" className="px-6 py-3">Amount</th>
                        <th scope="col" className="px-6 py-3">Date</th>
                        <th scope="col" className="px-6 py-3">
                            <span className="sr-only">Edit</span>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <span className="sr-only">Delete</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? (
                        <tr>
                            <td colSpan="6" className="text-center py-4">Loading...</td>
                        </tr>
                    ) : filteredBills.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="text-center py-4">No bills found</td>
                        </tr>
                    ) : (
                        filteredBills.map((bill) => (
                            <tr
                                key={bill._id}
                                className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 ${
                                    selectedBills.includes(bill.id) ? 'bg-red-200' : ''
                                }`}
                            >
                                <td className="px-6 py-4">{bill.description}</td>
                                <td className="px-6 py-4">{bill.category}</td>
                                <td className="px-6 py-4">${Number(bill.amount).toFixed(2)}</td>
                                <td className="px-6 py-4">{new Date(bill.date).toLocaleDateString()}</td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                        onClick={() => handleEdit(bill)}
                                    >
                                        Edit
                                    </button>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                                        onClick={() => handleDelete(bill.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Home;
