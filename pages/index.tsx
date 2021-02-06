import { useEffect, useState } from 'react';
import Head from 'next/head';

const client = require('contentful').createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

export default function Home() {
  const [posts, setPosts] = useState([]);

  async function fetchEntries() {
    const entries = await client.getEntries();
    console.log(entries);
    if (entries.items) return entries.items;
  }

  useEffect(() => {
    async function getPosts() {
      const allPosts = await fetchEntries();
      setPosts([...allPosts]);
    }

    getPosts();
  }, []);

  return (
    <>
      <Head>
        <title>Next.js + Contentful</title>
      </Head>
      {!!posts.length
        && posts.map((post) => (
          <div key={post.title}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </div>
        ))
      }
    </>
  )
}
