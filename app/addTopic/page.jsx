export default function AddTopic() {
    return (
        <form className="flex flex-col gap-3">
            <input className="border border-slate-500 px-8 py-2" type="text" placeholder="Topic Title" />
            <input className="border border-slate-500 px-8 py-2" type="text" placeholder="Topic Description" />
            <button className="bg-green-500 text-white px-8 py-2 w-fit" type="submit">Add Topic</button>
        </form>
    );
}