


import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBill, updateBill, getBills } from '../features/bills/billSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const Forms = () => {
    const currDate = new Date();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { bills, isError, message } = useSelector((state) => state.bills);

    const [id, setId] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState(0);
    const [date, setDate] = useState(currDate.toISOString().split('T')[0]);

    // Extract bill data if editing
    const billToEdit = location.state?.bill;

    useEffect(() => {
        if (isError) {
            console.log(message);
        }
        dispatch(getBills());

        if (billToEdit) {
            setId(billToEdit.id);
            setCategory(billToEdit.category);
            setDescription(billToEdit.description);
            setAmount(billToEdit.amount);
            setDate(new Date(billToEdit.date).toISOString().split('T')[0]);
        }
    }, [billToEdit, isError, message, dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const billData = { id, category, description, amount, date };
        if (billToEdit) {
            dispatch(updateBill(billData));
        } else {
            const uniqueId = uuidv4();
            dispatch(createBill({ ...billData, id: uniqueId }));
        }

        // Reset form and redirect
        setCategory('');
        setDescription('');
        setAmount(0);
        setDate(currDate.toISOString().split('T')[0]);
        navigate('/');
    };

    return (
        <form onSubmit={handleSubmit} className="p-20 sm:ml-64 relative overflow-x-auto sm:rounded-lg">
            <div className="relative z-0 w-full mb-5 group">
                <label htmlFor="categories" className="block mb-2 text-sm font-medium text-gray-500 dark:text-white">Category</label>
                <select
                    id="categories"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                >
                    <option value="" disabled>
                        Select a category
                    </option>
                    <option>FoodNDining</option>
                    <option>Utility</option>
                    <option>Shopping</option>
                    <option>Education</option>
                    <option>Personal Care</option>
                    <option>Travel</option>
                    <option>Misc</option>
                </select>
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input
                    type="text"
                    id="floating_description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                />
                <label htmlFor="floating_description" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Description
                </label>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="number"
                        id="floating_amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        min="0"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                    />
                    <label htmlFor="floating_amount" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Amount
                    </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="date"
                        id="floating_date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                    />
                    <label htmlFor="floating_date" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Date
                    </label>
                </div>
            </div>
            <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                {billToEdit ? 'Update Bill' : 'Submit'}
            </button>
        </form>
    );
};

export default Forms;
