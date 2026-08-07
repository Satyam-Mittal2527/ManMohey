const faqs = [
    {
        question: "How do I place an order?",
        answer:
            "Browse our collections, choose your preferred product, select the required options, add it to your cart, and proceed to checkout by providing your shipping and payment details.",
    },
    {
        question: "What payment methods do you accept?",
        answer:
            "We accept major credit and debit cards, UPI, net banking, and other secure payment methods available during checkout.",
    },
    {
        question: "Can I cancel my order?",
        answer:
            "Orders can be cancelled before they are shipped. Once an order has been dispatched, cancellation may not be possible.",
    },
    {
        question: "How can I track my order?",
        answer:
            "After your order is shipped, you'll receive tracking details via email or SMS. You can also check your order status from your account.",
    },
    {
        question: "Do you offer Cash on Delivery (COD)?",
        answer:
            "Cash on Delivery may be available for selected locations and eligible orders. Availability will be shown during checkout.",
    },
    {
        question: "What is your return policy?",
        answer:
            "Eligible products can be returned or exchanged within the specified return window. Please refer to our Return & Refund Policy for complete details.",
    },
    {
        question: "How long does delivery take?",
        answer:
            "Delivery timelines depend on your location. Most orders are delivered within 3–7 business days after dispatch.",
    },
    {
        question: "How do I choose the correct size?",
        answer:
            "Each product page includes size information where applicable. Please refer to the size guide before placing your order.",
    },
    {
        question: "Are the product images accurate?",
        answer:
            "We make every effort to display product colors and designs accurately. However, slight variations may occur due to lighting or screen settings.",
    },
    {
        question: "How can I contact customer support?",
        answer:
            "You can reach us through the Contact Us page or by using the contact details provided on our website.",
    },
];

export default function FAQPage() {
    return (
        <main className="max-w-5xl mx-auto px-6 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold">
                    Frequently Asked Questions
                </h1>

                <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                    Find answers to the most commonly asked questions about
                    shopping, orders, payments, shipping, and returns at
                    ManMohey.
                </p>
            </div>

            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <details
                        key={index}
                        className="border rounded-xl p-5 bg-white shadow-sm group"
                    >
                        <summary className="cursor-pointer list-none flex justify-between items-center font-semibold text-lg">
                            {faq.question}

                            <span className="text-2xl transition-transform group-open:rotate-45">
                                +
                            </span>
                        </summary>

                        <p className="mt-4 text-gray-600 leading-7">
                            {faq.answer}
                        </p>
                    </details>
                ))}
            </div>

            <div className="mt-12 text-center border-t pt-8">
                <h2 className="text-2xl font-semibold mb-3">
                    Still have questions?
                </h2>

                <p className="text-gray-600 mb-6">
                    We're happy to help. Reach out to our customer support team,
                    and we'll assist you as soon as possible.
                </p>

                <a
                    href="/contact"
                    className="inline-block px-6 py-3 rounded-lg bg-black text-white hover:bg-gray-800 transition"
                >
                    Contact Us
                </a>
            </div>
        </main>
    );
}