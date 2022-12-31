import { useLazyQuery } from "@apollo/client/react";
import Link from "next/link";
import React, { useEffect, useMemo } from "react";
import styled from "styled-components";
import { FormatUnixTime } from "../../helpers/formatters/time";
import { GET_POSTS } from "../../helpers/queries/posts/index";

const Posts = () => {
  const [getPosts, { data, loading: newsLoading, error, called, refetch }] =
    useLazyQuery(GET_POSTS);

  useEffect(() => {
    getPosts();
  }, []);

  console.log({ data });

  const dummyPosts = useMemo(() => {
    if (!data?.getPosts?.length) return [];
    return data.getPosts.map((post) => {
      return (
        <div className="post-row">
          <span>{post.category}</span>
          <span>{post.section}</span>
          <span>{post.slug}</span>
          <span>{FormatUnixTime(post.publish_date)}</span>
          <span>{post?.post_title}</span>

          <div>
            <Link href={`/posts/edit${post.slug}`}>
              <button>Edit</button>
            </Link>
          </div>
        </div>
      );
    });
  }, [data?.getPosts]);

  return (
    <PageContainer>
      <div>
        <Link href="/posts/create">Create</Link>
      </div>
      <PostsTable>{dummyPosts}</PostsTable>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const PostsTable = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 2rem;

  .post-row {
    display: flex;
    justify-content: space-between;
  }
`;

export default Posts;
