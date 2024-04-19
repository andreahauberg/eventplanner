import { redirect } from "next/navigation";

export default async function AddEventPage() {
  async function submit(formData) {
    "use server";

    let headersList = {
      Accept: "application/json",
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      Prefer: "return=representation",
      "Content-Type": "application/json",
    };
    console.log(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
    let bodyContent = JSON.stringify({
      name: formData.get("name"),
      when: formData.get("when"),
      description: formData.get("description"),
    });

    let response = await fetch(
      "https://svmitemswsfqelejovkc.supabase.co/rest/v1/events",
      {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      }
    );

    let data = await response.json();
    console.log(data);
    const id = data[0].id;
    redirect("/events/" + id);
  }
  return (
    <div className="w-full max-w-xs">
      <form
        action={submit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="formcontrol mb-4">
          <label
            htmlFor="form_name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Titel
          </label>
          <input
            id="form_name"
            type="text"
            name="name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="formcontrol mb-6">
          <label
            htmlFor="form_when"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Tidspunkt
          </label>
          <input
            id="form_when"
            type="date"
            name="when"
            className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="formcontrol mb-4">
          <label
            htmlFor="form_description"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Andet du vil tilføje?
          </label>
          <textarea
            id="form_description"
            type="text"
            name="description"
            className="shadow appearance-none border rounded resize-none  w-full h-32 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <button>
          <div className="flex items-center justify-between">
            <span className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
              Gem
            </span>
          </div>
        </button>
      </form>
    </div>
  );
}
