import React, { useState, useEffect, useRef } from "react";
import PostService from "../API/PostService";

import PostList from "../components/PostList";
import PostForm from "../components/PostForm";
import Filter from "../components/Filter";
import MyModal from "../components/UI/MyModal/MyModal";
import { UsePosts } from "../hooks/usePosts";

import Loader from "../components/UI/Loader/Loader";
import { useFetching } from "../hooks/useFetching";
import { getpagesCount, getPagesArray } from "../utils/pages";
import Pagination from "../components/UI/pagination/Pagination";
import MyButton from "../components/UI/button/MyButton.";
import UseObserver from "../hooks/UseObserver";
import MySelect from "../components/UI/select/MySelect";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: "", querry: "" });
  const [modal, setModal] = useState(false);
  const searchedAndSortedPosts = UsePosts(posts, filter.sort, filter.querry);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const lastElement = useRef();

  let pagesArray = getPagesArray(totalPages);

  const changePage = (page) => {
    setPage(page);
  };

  const [fetchPost, isPostLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    setPosts([...posts, ...response.data]);
    const totalCount = response.headers["x-total-count"];
    setTotalPages(getpagesCount(totalCount, limit));
  });

  UseObserver(lastElement, page < totalPages, isPostLoading, () => {
    setPage(page + 1);
  });

  const createPost = (newPOst) => {
    setPosts([...posts, newPOst]);
    setModal(false);
  };

  const removePost = (post) => {
    setPosts(posts.filter((el) => el.id !== post.id));
  };

  useEffect(() => {
    fetchPost();
  }, [page, limit]);

  return (
    <div className="App">
      <MyButton style={{ marginTop: "30px" }} onClick={() => setModal(true)}>
        Create a user
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{ margin: "15px 0" }} />

      <Filter filter={filter} setFilter={setFilter} />

      <h4 style={{ marginTop: "20px" }}>
        You can choose the way posts are loaded
      </h4>
      <MySelect
        value={limit}
        onChange={(val) => setLimit(val)}
        defaultValue="Number of posts on page"
        options={[
          { value: 5, name: "5" },
          { value: 10, name: "15" },
          { value: 25, name: "25" },
          { value: -1, name: "Show all" },
        ]}
      />

      {postError && <h1>There is a mistake: {postError}</h1>}
      <PostList
        remove={removePost}
        posts={searchedAndSortedPosts}
        title="Posts about JS"
      />
      <div
        ref={lastElement}
        style={{ height: "20px", background: "teal" }}
      ></div>
      {isPostLoading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          <Loader />
        </div>
      )}

      <Pagination totalPages={totalPages} changePage={changePage} page={page} />
    </div>
  );
}

export default Posts;
