import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";

const getTopics = async () => {
  try {
    console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/topics`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }
    const topics = await res.json();
    console.log(`Topics (cache: no-store):`, topics);
    return topics;
  } catch (error) {
    console.error(`Error loading topics (cache: no-store)`, error);
    return [];
  }
};

const getTopicsWithDefaultCache = async () => {
  try {
    console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/topics`);
    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }
    const topics = await res.json();
    console.log(`Topics (default):`, topics);
    return topics;
  } catch (error) {
    console.error(`Error loading topics (default)`, error);
    return [];
  }
};

export default async function TopicsList() {
  // Fetch topics with 'no-store' cache option
  const topicsNoStore = await getTopics();
  // Fetch topics with default cache option
  const topicsDefault = await getTopicsWithDefaultCache();

  return (
    <>
      <h3>Topics with cache: no-store</h3>
      {topicsNoStore.length ? (
        topicsNoStore.map((topic) => (
          <div key={topic._id} className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start">
            <div>
              <h2 className="font-bold text-2xl">{topic.title}</h2>
              <div>{topic.description}</div>
            </div>
            <div className="flex gap-2">
              <RemoveBtn topicId={topic._id} />
              <Link href={`/editTopic/${topic._id}`}>
                <HiPencilAlt size={24} />
              </Link>   
            </div>
          </div>
        ))
      ) : (
        <div>No topics available with cache: no-store.</div>
      )}

      <h3>Topics with default cache</h3>
      {topicsDefault.length ? (
        topicsDefault.map((topic) => (
          <div key={topic._id} className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start">
            <div>
              <h2 className="font-bold text-2xl">{topic.title}</h2>
              <div>{topic.description}</div>
            </div>
            <div className="flex gap-2">
              <RemoveBtn topicId={topic._id} />
              <Link href={`/editTopic/${topic._id}`}>
                <HiPencilAlt size={24} />
              </Link>   
            </div>
          </div>
        ))
      ) : (
        <div>No topics available with default cache.</div>
      )}
    </>
  );
}
