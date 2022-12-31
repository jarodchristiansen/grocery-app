import { useMutation } from "@apollo/client/react";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import client from "../../../apollo-client";
import { UPDATE_POST } from "../../../helpers/mutations/posts";
import { GET_POST } from "../../../helpers/queries/posts";

import DatePicker from "react-datepicker";

const EditRecipePage = ({ data }) => {
  console.log({ data });

  const [initialPost, setInitialPost] = useState<null | any>();
  // const [getPost, { data, loading, error: getPostError, called, refetch }] =
  //   useLazyQuery(GET_POST);

  const router = useRouter();
  const { slug } = router.query;

  const [descriptionValue, setDescriptionValue] = useState("");
  const [selectedCategory, setCategory] = useState("");
  const [selectedSection, setSection] = useState("");
  const [headerImageUrl, setHeaderImageUrl] = useState("");
  const [publishDate, setPublishDate] = useState();
  const [markdownValue, setMarkdownValue] = useState(``);
  const [postTitle, setPostTitle] = useState("");
  const [changedSlug, setSlug] = useState(slug || "");

  useEffect(() => {
    if (data?.getPost) {
      setInitialValues();
    }
  }, [data?.getPost]);

  /// NEEDS TWEAKING SINCE IT IS COPIED FROM POSTS CREATE
  const setInitialValues = () => {
    const post = data.getPost;
    // setInitialPost(post);
    setPostTitle(post?.post_title);
    setCategory(post?.category);
    setSection(post?.section);
    setHeaderImageUrl(post?.header_image);
    setPublishDate(post?.publish_date);
    setMarkdownValue(post?.post_content);
    setDescriptionValue(post?.description);
  };

  const [updatePost, { loading: createLoading, error }] =
    useMutation(UPDATE_POST);

  const formRef = useRef(null);

  const markdown = `Just a link: https://reactjs.com.


 # h1 Heading 8-)
 ## h2 Heading
 ### h3 Heading
 #### h4 Heading
 ##### h5 Heading
 ###### h6 Heading
 

 ## Horizontal Rules

 ___
 
 ---
 
 ***

`;
  const categoryOptions = useMemo(() => {
    const categories = [
      { name: "Indicators", value: "Indicators" },
      { name: "Background", value: "Background" },
    ];

    return categories.map((category) => {
      return (
        <option selected={category.value === selectedCategory}>
          {category.name}
        </option>
      );
    });
  }, []);

  const sectionOptions = useMemo(() => {
    const sections = [
      { name: "Education", value: "Education" },
      { name: "Blog", value: "Blog" },
    ];

    return sections.map((section) => {
      return (
        <option selected={section.value === selectedSection}>
          {section.name}
        </option>
      );
    });
  }, []);

  const changeSelection = (evt: any) => {
    let name = evt.target.name;
    let value = evt.target.value;

    switch (name) {
      case "category": {
        console.log("Category Changes", value);
        setCategory(value);
      }
    }
  };

  const submitForm = (e) => {
    e.preventDefault();

    updatePost({
      variables: {
        input: {
          category: selectedCategory,
          header_image: headerImageUrl,
          post_title: postTitle,
          post_content: markdownValue,
          publish_date: publishDate,
          section: selectedSection,
          slug: "/" + slug,
          description: descriptionValue,
        },
      },
    });
  };

  return (
    <div>
      Slug: {slug}
      <PageContainer>
        <FormContainer>
          <h2>Input Forms</h2>

          <StyledForm onSubmit={submitForm} ref={formRef}>
            <div>
              <label htmlFor="section">Section</label>
              <select
                onChange={changeSelection}
                name="section"
                value={selectedSection}
                defaultValue={data?.getPost?.section}
              >
                {sectionOptions}
              </select>
            </div>

            <div>
              <label htmlFor="category">Category</label>
              <select
                onChange={changeSelection}
                name="category"
                value={selectedCategory}
                defaultValue={initialPost?.category}
              >
                {categoryOptions}
              </select>
            </div>

            <div>
              <label htmlFor="publish_date">Publish Date</label>
              <DatePicker
                name="publish_date"
                selected={publishDate}
                // @ts-ignore
                onChange={(date: Date) => setPublishDate(date)}
              />
            </div>

            <div>
              <label htmlFor="slug">Slug</label>
              <input
                name="slug"
                type="text"
                onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
                  setSlug(evt.target.value)
                }
                value={slug}
              />
            </div>

            <div>
              <label htmlFor="header-image">Header Image</label>
              <input
                name="header-image"
                type="text"
                onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
                  setHeaderImageUrl(evt.target.value)
                }
                value={headerImageUrl}
              />
            </div>

            <div>
              <label htmlFor="post-title">Post Title</label>
              <input
                name="post-title"
                type="text"
                onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
                  setPostTitle(evt.target.value)
                }
                value={postTitle}
                defaultValue={data?.getPost?.post_title}
              />
            </div>

            <div>
              <label htmlFor="post-description">Post Description</label>
              <textarea
                name="post-description"
                onChange={(evt: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setDescriptionValue(evt.target.value)
                }
                value={descriptionValue}
                defaultValue={data?.getPost?.description}
              />
            </div>

            <div>
              <label htmlFor="post-content">Post Content</label>
              <textarea
                name="post-content"
                onChange={(evt: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setMarkdownValue(evt.target.value)
                }
                value={markdownValue}
              />
            </div>

            <button>Submit</button>
          </StyledForm>
        </FormContainer>
      </PageContainer>
    </div>
  );
};

const getSiteTitle = async (context) => {
  const { slug } = context.query;

  const result = await client.query({
    query: GET_POST,
    variables: {
      slug: "/" + slug?.toString(),
    },
  });

  return { data: result };
};

export const getServerSideProps = async (context) => {
  let data = null;

  const response = await getSiteTitle(context); // any async promise here.

  data = response.data;

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: data, // will be passed to the page component as props
  };
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;

  textarea {
    min-height: 24rem;
  }

  div {
    display: flex;
    flex-direction: column;
  }
`;

export default EditRecipePage;
