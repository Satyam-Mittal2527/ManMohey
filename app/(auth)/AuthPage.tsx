import type { ChangeEvent, FormEvent } from "react";

interface AuthFormField {
    name: string;
    type: string;
    label: string;
}

interface AuthFormProps {
    fields: AuthFormField[];
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void | Promise<void>;
    formData: object;
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
    SubmitButtonText: string;
    errorMessage?: string | null;
    isSubmitting?: boolean;
}

export default function AuthForm({
    fields,
    handleSubmit,
    formData,
    handleChange,
    SubmitButtonText,
    errorMessage,
    isSubmitting = false,
}: AuthFormProps) {
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
            {errorMessage && (
                <div
                    role="alert"
                    aria-live="assertive"
                    className="mt-5 flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-left text-sm text-rose-800 shadow-sm"
                >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-100 font-bold text-rose-700" aria-hidden="true">
                        !
                    </span>
                    <div>
                        <p className="font-semibold">We couldn’t complete your registration</p>
                        <p className="mt-1 leading-relaxed">{errorMessage}</p>
                    </div>
                </div>
            )}
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
                                value={(formData as Record<string, string | number | undefined>)[field.name] ?? ""}
                                onChange={handleChange}
                                className="border border-black rounded-lg"
                                required
                            />
                        </div>
                    ))}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        aria-busy={isSubmitting}
                        className="bg-black text-white rounded-md p-2 hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isSubmitting ? "Please wait…" : SubmitButtonText}
                    </button>
                </div>

            </form>


        </div>
    )
}