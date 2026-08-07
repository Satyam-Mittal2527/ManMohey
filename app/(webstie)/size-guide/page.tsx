export default function SizeGuidePage() {
    return (
        <main className="max-w-5xl mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold mb-6">
                Size Guide
            </h1>

            <p className="text-gray-600 mb-8">
                Last Updated: August 7, 2026
            </p>

            <div className="space-y-8 text-gray-700 leading-8">

                <section>
                    <h2 className="text-2xl font-semibold mb-3">
                        Find Your Perfect Fit
                    </h2>

                    <p>
                        Choosing the right size helps ensure the best fit and
                        comfort. Please use the guide below as a general
                        reference. Individual products may have slightly
                        different measurements depending on their design and
                        fabric.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">
                        Women's Size Chart
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="w-full border border-gray-300 text-center">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border p-3">Size</th>
                                    <th className="border p-3">Bust (in)</th>
                                    <th className="border p-3">Waist (in)</th>
                                    <th className="border p-3">Hip (in)</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td className="border p-3">S</td>
                                    <td className="border p-3">34</td>
                                    <td className="border p-3">28</td>
                                    <td className="border p-3">36</td>
                                </tr>

                                <tr>
                                    <td className="border p-3">M</td>
                                    <td className="border p-3">36</td>
                                    <td className="border p-3">30</td>
                                    <td className="border p-3">38</td>
                                </tr>

                                <tr>
                                    <td className="border p-3">L</td>
                                    <td className="border p-3">38</td>
                                    <td className="border p-3">32</td>
                                    <td className="border p-3">40</td>
                                </tr>

                                <tr>
                                    <td className="border p-3">XL</td>
                                    <td className="border p-3">40</td>
                                    <td className="border p-3">34</td>
                                    <td className="border p-3">42</td>
                                </tr>

                                <tr>
                                    <td className="border p-3">XXL</td>
                                    <td className="border p-3">42</td>
                                    <td className="border p-3">36</td>
                                    <td className="border p-3">44</td>
                                </tr>

                                <tr>
                                    <td className="border p-3">3XL</td>
                                    <td className="border p-3">44</td>
                                    <td className="border p-3">38</td>
                                    <td className="border p-3">46</td>
                                </tr>

                                <tr>
                                    <td className="border p-3">4XL</td>
                                    <td className="border p-3">46</td>
                                    <td className="border p-3">40</td>
                                    <td className="border p-3">48</td>
                                </tr>

                                <tr>
                                    <td className="border p-3">5XL</td>
                                    <td className="border p-3">48</td>
                                    <td className="border p-3">42</td>
                                    <td className="border p-3">50</td>
                                </tr>

                                <tr>
                                    <td className="border p-3">6XL</td>
                                    <td className="border p-3">50</td>
                                    <td className="border p-3">44</td>
                                    <td className="border p-3">52</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3">
                        How to Measure
                    </h2>

                    <ul className="list-disc ml-6 space-y-2">
                        <li>
                            <strong>Bust:</strong> Measure around the fullest
                            part of your bust while keeping the measuring tape
                            level.
                        </li>

                        <li>
                            <strong>Waist:</strong> Measure around your natural
                            waistline, just above your belly button.
                        </li>

                        <li>
                            <strong>Hip:</strong> Measure around the fullest
                            part of your hips while standing naturally.
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3">
                        Need Help?
                    </h2>

                    <p>
                        If you're unsure about the right size, please contact
                        our customer support before placing your order. We'll be
                        happy to help you choose the best fit.
                    </p>
                </section>

            </div>
        </main>
    );
}