import { useMemo } from "react";

export const useSortedPosts = (posts, sort) => {
  const sortedPosts = useMemo(() => {
    if (sort) {
      return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]));
    }
    return posts;
  }, [sort, posts]);

  return sortedPosts;
};

export const UsePosts = (posts, sort, querry) => {
  const sortedPosts = useSortedPosts(posts, sort);
  const searchedAndSortedPosts = useMemo(() => {
    return sortedPosts.filter((post) =>
      post.title.toLowerCase().includes(querry.toLowerCase())
    );
  }, [sortedPosts, querry]);

  return searchedAndSortedPosts;
};
