export default function ShippingInformationPage() {
    return (
        <main className="max-w-5xl mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold mb-6">
                Shipping Information
            </h1>

            <p className="text-gray-600 mb-8">
                Last Updated: August 7, 2026
            </p>

            <div className="space-y-8 text-gray-700 leading-8">

                <section>
                    <h2 className="text-2xl font-semibold mb-3">
                        1. Order Processing
                    </h2>

                    <p>
                        Orders are typically processed within <strong>1–2 business days</strong>
                        after successful payment confirmation. Orders placed on
                        weekends or public holidays will be processed on the
                        next business day.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3">
                        2. Shipping Timeline
                    </h2>

                    <p className="mb-3">
                        Estimated delivery timelines are:
                    </p>

                    <ul className="list-disc ml-6 space-y-2">
                        <li>Metro Cities: <strong>2–5 business days</strong></li>
                        <li>Other Cities: <strong>3–7 business days</strong></li>
                        <li>Remote Locations: <strong>5–10 business days</strong></li>
                    </ul>

                    <p className="mt-3">
                        Delivery timelines are estimates and may vary due to
                        courier operations, weather conditions, public holidays,
                        or unforeseen circumstances.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3">
                        3. Shipping Charges
                    </h2>

                    <p>
                        Shipping charges, if applicable, will be displayed
                        during checkout before you complete your purchase.
                        Promotional offers such as free shipping may be
                        available on eligible orders from time to time.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3">
                        4. Order Tracking
                    </h2>

                    <p>
                        Once your order has been shipped, you will receive a
                        confirmation email or SMS containing the tracking
                        details. You can also view your order status by logging
                        into your ManMohey account.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3">
                        5. Delivery Attempts
                    </h2>

                    <p>
                        Our delivery partners may attempt delivery multiple
                        times before returning the package. Please ensure that
                        someone is available at the delivery address to receive
                        the order.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3">
                        6. Incorrect Shipping Address
                    </h2>

                    <p>
                        Customers are responsible for providing accurate
                        shipping information. Orders delayed or returned due to
                        incorrect or incomplete addresses may require additional
                        shipping charges for re-dispatch.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3">
                        7. Delayed Deliveries
                    </h2>

                    <p>
                        While we strive to deliver every order on time,
                        unexpected circumstances such as severe weather,
                        transportation disruptions, festivals, or courier delays
                        may occasionally affect delivery schedules.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3">
                        8. International Shipping
                    </h2>

                    <p>
                        International shipping availability depends on your
                        location. Additional customs duties, taxes, or import
                        charges, where applicable, are the responsibility of the
                        customer.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3">
                        9. Need Assistance?
                    </h2>

                    <p>
                        If you have any questions regarding shipping, delivery,
                        or order tracking, please contact our customer support
                        through the Contact Us page. We're always happy to help.
                    </p>
                </section>

            </div>
        </main>
    );
}