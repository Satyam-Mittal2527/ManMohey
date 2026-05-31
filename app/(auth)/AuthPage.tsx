interface AuthFormProps {
    fields: {
        name: string;
        type: string;
        label: string;
    }[];

    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;

    formData: {
        [key: string]: string;
    };

    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;

    SubmitButtonText: string;
}
export default function AuthForm({
    fields,
    handleSubmit,
    formData,
    handleChange,
    SubmitButtonText
}:AuthFormProps) {
    return (
        <div className="
                w-full max-w-md
                bg-white/70
                backdrop-blur-sm
                border border-pink-200
                shadow-lg
                rounded-2xl
                p-8
                transition-all
                duration-300
                ease-in-out
                hover:-translate-y-1
                hover:shadow-2xl
            ">
            <span className="text-lg font-bold">WELCOME TO MANMOHEY</span>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-10" >
                    {fields.map((field) => (
                        <div key={field.name} className="flex flex-col md:gap-5">
                            <label htmlFor={field.name} className="text-body-3">
                                {field.label}
                            </label>
                            <input
                                id={field.name}
                                type={field.type}
                                placeholder={field.label}
                                name={field.name}
                                value={formData[field.name]}
                                onChange={handleChange}
                                className="border border-black rounded-lg"
                                required
                            />
                        </div>
                    ))}
                    <button
                        type="submit"
                        className="bg-black text-white rounded-md p-2 hover:bg-black/80"
                    >
                        {SubmitButtonText}
                    </button>
                </div>

            </form>


        </div>
    )
}