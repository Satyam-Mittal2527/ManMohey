"use client";

import { useEffect, useState } from "react";

import {
    getAddresses,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
} from "@/lib/addresses";

export default function AddressesPage() {

    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [saving, setSaving] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);
    const [formData, setFormData] = useState({
        full_name: "",
        phone_number: "",
        address_line_1: "",
        address_line_2: "",
        city: "",
        state: "",
        postal_code: "",
        country: "Nepal",
        address_type: "Home",
        is_default: false,
    });

    function handleInputChange(e) {
        const { name, value, type, checked } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: type === "checkbox"
                ? checked
                : value,
        }));
    }
    async function handleAddressSubmit(e) {
        e.preventDefault();

        try {
            setSaving(true);

            if (editingAddress) {

                await updateAddress(
                    editingAddress.id,
                    formData
                );

            } else {

                await addAddress(formData);

            }

            setFormData({
                full_name: "",
                phone_number: "",
                address_line_1: "",
                address_line_2: "",
                city: "",
                state: "",
                postal_code: "",
                country: "Nepal",
                address_type: "Home",
                is_default: false,
            });

            setEditingAddress(null);
            setIsFormOpen(false);

            await loadAddresses();

        } catch (error) {

            console.error(
                "Failed to save address:",
                error
            );

            alert(
                editingAddress
                    ? "Failed to update address."
                    : "Failed to add address."
            );

        } finally {
            setSaving(false);
        }
    }
    async function loadAddresses() {

        try {

            setLoading(true);
            setError("");

            const result =
                await getAddresses();

            setAddresses(
                result.data || result || []
            );

        } catch (error) {

            console.error(
                "Failed to load addresses:",
                error
            );

            setError(
                "Unable to load your addresses."
            );

        } finally {

            setLoading(false);

        }
    }


    useEffect(() => {
        loadAddresses();
    }, []);


    async function handleDelete(
        addressId
    ) {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this address?"
            );

        if (!confirmed) {
            return;
        }

        try {

            await deleteAddress(
                addressId
            );

            await loadAddresses();

        } catch (error) {

            console.error(
                "Delete address error:",
                error
            );

            alert(
                "Failed to delete address."
            );
        }
    }


    async function handleSetDefault(
        addressId
    ) {

        try {

            await setDefaultAddress(
                addressId
            );

            await loadAddresses();

        } catch (error) {

            console.error(
                "Default address error:",
                error
            );

            alert(
                "Failed to set default address."
            );
        }
    }


    if (loading) {

        return (
            <div className="mx-auto max-w-6xl px-6 py-12">
                <p className="text-gray-500">
                    Loading addresses...
                </p>
            </div>
        );
    }


    return (
        <div className="mx-auto max-w-6xl px-6 py-10">

            <div className="mb-8 flex items-center justify-between">

                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Saved Addresses
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Manage your delivery addresses
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => {
                        setEditingAddress(null);

                        setFormData({
                            full_name: "",
                            phone_number: "",
                            address_line_1: "",
                            address_line_2: "",
                            city: "",
                            state: "",
                            postal_code: "",
                            country: "Nepal",
                            address_type: "Home",
                            is_default: false,
                        });

                        setIsFormOpen(true);
                    }}
                    className="rounded-md bg-violet-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-violet-700"
                >
                    + Add Address
                </button>

            </div>


            {error && (
                <div className="mb-6 rounded-md bg-red-50 px-4 py-3 text-sm text-red-600">
                    {error}
                </div>
            )}


            {addresses.length === 0 ? (

                <div className="rounded-lg border border-dashed border-gray-300 px-6 py-16 text-center">

                    <h2 className="text-lg font-medium text-gray-900">
                        No saved addresses
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                        Add an address to make checkout faster.
                    </p>

                    <button
                        type="button"
                        className="mt-5 rounded-md bg-violet-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-violet-700"
                    >
                        Add Your First Address
                    </button>

                </div>

            ) : (

                <div className="grid gap-5 md:grid-cols-2">

                    {addresses.map((address) => (

                        <div
                            key={address.id}
                            className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
                        >

                            <div className="mb-4 flex items-start justify-between">

                                <div>

                                    <div className="flex items-center gap-2">

                                        <h2 className="font-semibold text-gray-900">
                                            {address.full_name}
                                        </h2>

                                        {address.is_default && (
                                            <span className="rounded-full bg-violet-50 px-2.5 py-1 text-xs font-medium text-violet-600">
                                                Default
                                            </span>
                                        )}

                                    </div>

                                    <p className="mt-1 text-xs text-gray-500">
                                        {address.address_type}
                                    </p>

                                </div>

                            </div>


                            <div className="space-y-1 text-sm text-gray-600">

                                <p>
                                    {address.address_line_1}
                                </p>

                                {address.address_line_2 && (
                                    <p>
                                        {address.address_line_2}
                                    </p>
                                )}

                                <p>
                                    {address.city},{" "}
                                    {address.state}{" "}
                                    {address.postal_code}
                                </p>

                                <p>
                                    {address.country}
                                </p>

                                <p className="pt-2 font-medium text-gray-700">
                                    Phone: {address.phone_number}
                                </p>

                            </div>


                            <div className="mt-5 flex items-center gap-4 border-t border-gray-100 pt-4">

                                {!address.is_default && (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleSetDefault(
                                                address.id
                                            )
                                        }
                                        className="text-sm font-medium text-violet-600 hover:text-violet-700"
                                    >
                                        Set Default
                                    </button>
                                )}

                                <button
                                    type="button"
                                    onClick={() => {
                                        setEditingAddress(address);

                                        setFormData({
                                            full_name: address.full_name || "",
                                            phone_number: address.phone_number || "",
                                            address_line_1: address.address_line_1 || "",
                                            address_line_2: address.address_line_2 || "",
                                            city: address.city || "",
                                            state: address.state || "",
                                            postal_code: address.postal_code || "",
                                            country: address.country || "Nepal",
                                            address_type: address.address_type || "Home",
                                            is_default: address.is_default || false,
                                        });

                                        setIsFormOpen(true);
                                    }}
                                    className="text-sm font-medium text-gray-600 hover:text-gray-900"
                                >
                                    Edit
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        handleDelete(
                                            address.id
                                        )
                                    }
                                    className="text-sm font-medium text-red-500 hover:text-red-600"
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            )}
            {isFormOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">

                    <div className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-xl">

                        <div className="mb-6 flex items-center justify-between">

                            <div>
                                <h2 className="text-xl font-semibold text-gray-900">
                                    {editingAddress
                                        ? "Edit Address"
                                        : "Add New Address"}
                                </h2>
                                <p className="mt-1 text-sm text-gray-500">
                                    {editingAddress
                                        ? "Update your delivery address"
                                        : "Add an address for your deliveries"}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setIsFormOpen(false)}
                                className="text-xl text-gray-400 hover:text-gray-700"
                            >
                                ×
                            </button>

                        </div>


                        <form
                            onSubmit={handleAddressSubmit}
                            className="space-y-4"
                        >

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Full Name
                                    </label>

                                    <input
                                        required
                                        name="full_name"
                                        value={formData.full_name}
                                        onChange={handleInputChange}
                                        className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-violet-500"
                                    />
                                </div>


                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Phone Number
                                    </label>

                                    <input
                                        required
                                        name="phone_number"
                                        value={formData.phone_number}
                                        onChange={handleInputChange}
                                        className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-violet-500"
                                    />
                                </div>

                            </div>


                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Address Line 1
                                </label>

                                <input
                                    required
                                    name="address_line_1"
                                    value={formData.address_line_1}
                                    onChange={handleInputChange}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-violet-500"
                                />
                            </div>


                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Address Line 2
                                </label>

                                <input
                                    name="address_line_2"
                                    value={formData.address_line_2}
                                    onChange={handleInputChange}
                                    placeholder="Apartment, floor, landmark..."
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-violet-500"
                                />
                            </div>


                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        City
                                    </label>

                                    <input
                                        required
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-violet-500"
                                    />
                                </div>


                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        State
                                    </label>

                                    <input
                                        required
                                        name="state"
                                        value={formData.state}
                                        onChange={handleInputChange}
                                        className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-violet-500"
                                    />
                                </div>

                            </div>


                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Postal Code
                                    </label>

                                    <input
                                        required
                                        name="postal_code"
                                        value={formData.postal_code}
                                        onChange={handleInputChange}
                                        className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-violet-500"
                                    />
                                </div>


                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Country
                                    </label>

                                    <input
                                        required
                                        name="country"
                                        value={formData.country}
                                        onChange={handleInputChange}
                                        className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-violet-500"
                                    />
                                </div>

                            </div>


                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Address Type
                                </label>

                                <select
                                    name="address_type"
                                    value={formData.address_type}
                                    onChange={handleInputChange}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-violet-500"
                                >
                                    <option value="Home">
                                        Home
                                    </option>

                                    <option value="Work">
                                        Work
                                    </option>

                                    <option value="Other">
                                        Other
                                    </option>
                                </select>
                            </div>


                            <label className="flex items-center gap-2 text-sm text-gray-700">

                                <input
                                    type="checkbox"
                                    name="is_default"
                                    checked={formData.is_default}
                                    onChange={handleInputChange}
                                />

                                Make this my default address

                            </label>


                            <div className="flex justify-end gap-3 border-t pt-5">

                                <button
                                    type="button"
                                    onClick={() => setIsFormOpen(false)}
                                    className="rounded-md border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="rounded-md bg-violet-600 px-5 py-2 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-50"
                                >
                                    {saving
                                        ? "Saving..."
                                        : editingAddress
                                            ? "Update Address"
                                            : "Save Address"}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>
            )}
        </div>
    );
}