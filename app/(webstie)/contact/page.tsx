export default function ContactPage() {
    return (
        <main className="max-w-6xl mx-auto px-6 py-12">

            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold">
                    Contact Us
                </h1>

                <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                    We'd love to hear from you. Whether you have a question
                    about an order, our products, or simply want to get in
                    touch, our team is here to help.
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">

                {/* Contact Information */}

                <div>

                    <h2 className="text-2xl font-semibold mb-6">
                        Get In Touch
                    </h2>

                    <div className="space-y-6">

                        <div>
                            <h3 className="font-semibold">
                                📧 Email
                            </h3>

                            <p className="text-gray-600">
                                support@manmohey.com
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold">
                                📞 Phone
                            </h3>

                            <p className="text-gray-600">
                                +91 XXXXX XXXXX
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold">
                                📍 Address
                            </h3>

                            <p className="text-gray-600">
                                ManMohey<br />
                                Your Business Address<br />
                                India
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold">
                                🕒 Customer Support Hours
                            </h3>

                            <p className="text-gray-600">
                                Monday – Saturday<br />
                                10:00 AM – 7:00 PM IST
                            </p>
                        </div>

                    </div>

                </div>

                {/* Contact Form */}

                <div className="bg-white border rounded-xl shadow-sm p-8">

                    <h2 className="text-2xl font-semibold mb-6">
                        Send Us a Message
                    </h2>

                    <form className="space-y-5">

                        <div>
                            <label className="block mb-2 font-medium">
                                Full Name
                            </label>

                            <input
                                type="text"
                                placeholder="Enter your name"
                                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-medium">
                                Email Address
                            </label>

                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-medium">
                                Subject
                            </label>

                            <input
                                type="text"
                                placeholder="How can we help?"
                                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-medium">
                                Message
                            </label>

                            <textarea
                                rows={6}
                                placeholder="Write your message here..."
                                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black resize-none"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
                        >
                            Send Message
                        </button>

                    </form>

                </div>

            </div>

            <div className="mt-16 border-t pt-10 text-center">

                <h2 className="text-2xl font-semibold mb-4">
                    We're Here to Help
                </h2>

                <p className="text-gray-600 max-w-3xl mx-auto">
                    At ManMohey, customer satisfaction is our priority. We aim
                    to respond to all enquiries as quickly as possible and
                    appreciate your patience during busy periods.
                </p>

            </div>

        </main>
    );
}