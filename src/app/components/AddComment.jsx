"use client";
import { useState } from "react";

export default function AddComment({ uuid }) {
  const [userComments, setUserComments] = useState([]);
  async function submit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const headersList = {
      Accept: "application/json",
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      Prefer: "return=representation",
      "Content-Type": "application/json",
    };

    const bodyContent = JSON.stringify({
      name: formData.get("name"),
      comment: formData.get("comment"),
      event_id: uuid,
    });
    let response = await fetch(
      "https://svmitemswsfqelejovkc.supabase.co/rest/v1/events_comments",
      {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      }
    );
    const newComment = await response.json();
    setUserComments((currentComments) => currentComments.concat(newComment[0]));
  }
  return (
    <>
      {userComments.map((c) => (
        <div key={c.id}>
          <dl>
            <dt>{c.name}</dt>
            <dd>{c.comment}</dd>
          </dl>
        </div>
      ))}
      <div className="w-full max-w-xs">
        <form
          onSubmit={submit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="formcontrol mb-4">
            <label
              htmlFor="form_name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Navn
            </label>
            <input
              id="form_name"
              type="text"
              name="name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="formcontrol mb-4">
            <label
              htmlFor="form_comment"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Tilføj en kommentar
            </label>
            <textarea
              id="form_comment"
              type="text"
              name="comment"
              className="shadow appearance-none border rounded resize-none  w-full h-32 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            ></textarea>
          </div>
          <button>
            <div className="flex items-center justify-between">
              <span className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                Kommentér
              </span>
            </div>
          </button>
        </form>
      </div>
    </>
  );
}
