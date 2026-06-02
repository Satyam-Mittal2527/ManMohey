interface Header {
    name: string;
}

interface CollectionHeaderProps {
    HeaderList: Header[];
}

export default function CollectionHeader({
    HeaderList,
}: CollectionHeaderProps) {
    return (
        
        <button className="flex flex-row gap-6 h-10 w-full items-center text-body-2 ">
            {HeaderList.map((header) => (
                <div
                    key={header.name}
                    className="
                            flex-1
                            h-10
                            rounded-xl
                            border border-gray-300
                            bg-white
                            flex items-center justify-center
                            cursor-pointer
                            font-medium
                            shadow-sm
                            transition-all duration-300
                            hover:-translate-y-1
                            hover:shadow-lg
                            hover:border-gray-600
                            hover:bg-black
                            hover:text-white
                        "
                    >
                    {header.name}
                </div>
            ))}
        </button>
        
    );
}