

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBills, deleteBill } from '../features/bills/billSlice'
import { useNavigate } from 'react-router-dom'


const Home = () => {
    const navigate = useNavigate();
    const { bills, isLoading, isError, message } = useSelector((state) => state.bills)
    const dispatch = useDispatch()
    const [selectedCategory, setSelectedCategory] = useState('All Categories')

    useEffect(() => {
        if (isError) {
            console.log(message)
        }
        dispatch(getBills())
    }, [isError, message, dispatch])

    // Categories array
    const categories = [
        'All Categories',
        'FoodNDining',
        'Utility',
        'Shopping',
        'Education',
        'Personal Care',
        'Travel',
        'Misc'
    ]

    // Filter bills based on selected category
    const filteredBills = bills.filter(bill =>
        selectedCategory === 'All Categories' ? true : bill.category === selectedCategory
    )

    const totalAmount = filteredBills.reduce((acc, bill) => acc + Number(bill.amount), 0)
    const totalBills = filteredBills.length

    // Handle Delete Function
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this bill?")) {
            dispatch(deleteBill(id))
            dispatch(getBills())
        }
    }

    const handleEdit = (bill) => {
        navigate('/form', { state: { bill } });
    };

    return (
        <div className="p-4 sm:ml-64 relative overflow-x-auto sm:rounded-lg">
            <div className="grid grid-cols-2 gap-2">
                <div className="p-6 bg-red-100 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-red-500 dark:text-white">Total Amount</h5>
                    <p className="font-normal text-xl text-red-800 dark:text-gray-400">${totalAmount.toFixed(2)}</p>
                </div>

                <div className="p-6 bg-green-100 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-green-500 dark:text-white">Bills to Pay</h5>
                    <p className="font-normal text-xl text-green-800 dark:text-gray-400">{totalBills}</p>
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
                            <td colSpan="7" className="text-center py-4">Loading...</td>
                        </tr>
                    ) : filteredBills.length === 0 ? (
                        <tr>
                            <td colSpan="7" className="text-center py-4">No bills found</td>
                        </tr>
                    ) : (
                        filteredBills.map((bill) => (
                            <tr key={bill._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4">{bill.description}</td>
                                <td className="px-6 py-4">{bill.category}</td>
                                <td className="px-6 py-4">${Number(bill.amount).toFixed(2)}</td>
                                <td className="px-6 py-4">{new Date(bill.date).toLocaleDateString()}</td>
                                <td className="px-6 py-4 text-right">
                                    <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                            onClick={() => handleEdit(bill)}>Edit</button>
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
    )
}

export default Home
