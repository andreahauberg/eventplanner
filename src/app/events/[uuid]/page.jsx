import AddComment from "@/app/components/AddComment";
export const dynamic = "force-dynamic";

const headersList = {
  Accept: "application/json",
  apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  Prefer: "return=representation",
};

async function getEvent(id) {
  const response = await fetch(
    "https://svmitemswsfqelejovkc.supabase.co/rest/v1/events?id=eq." + id,
    { headers: headersList, cache: "no-store" }
  );
  const data = await response.json();
  return data[0];
}
async function getComments(id) {
  const ep = `https://svmitemswsfqelejovkc.supabase.co/rest/v1/events_comments?event_id=eq.${id}`;

  const responseComments = await fetch(ep, {
    headers: headersList,
    cache: "no-store",
  });

  return await responseComments.json();
}

export default async function EventPage({ params }) {
  const uuid = params.uuid;
  const eventInfo = await getEvent(uuid);
  const comments = await getComments(uuid);

  return (
    <article>
      <div className="w-full max-w-xs">
        <h1>{eventInfo.name}</h1>
        <dl className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <dt className="block text-gray-700 text-sm font-bold mb-2">
            Hvornår
          </dt>
          <dd className="block text-gray-700 text-sm  mb-2">
            {eventInfo.when}
          </dd>
          <dt className="block text-gray-700 text-sm font-bold mb-2">
            Information
          </dt>
          <dd className="block text-gray-700 text-sm  mb-2">
            {eventInfo.description}
          </dd>
        </dl>
      </div>
      <section className="w-full max-w-xs">
        <h2>Kommentarer</h2>
        {comments.map((c) => (
          <div key={c.id}>
            <dl className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <dt className="block text-gray-700 text-sm font-bold mb-2">
                {c.name}
              </dt>
              <dd className="block text-gray-700 text-sm  mb-2">{c.comment}</dd>
            </dl>
          </div>
        ))}
        <AddComment uuid={uuid} />
      </section>
    </article>
  );
}
