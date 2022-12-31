import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeFormat from "rehype-format";
import rehypeStringify from "rehype-stringify";
import rehypeRaw from "rehype-raw";
import styled from "styled-components";
import { useMemo, useState, useRef } from "react";
import DatePicker from "react-datepicker";
import { useMutation } from "@apollo/client";
import { CREATE_POST } from "../../../helpers/mutations/posts/index";
import { create } from "domain";

const PostsCreate = () => {
  const [selectedCategory, setCategory] = useState("A");
  const [selectedSection, setSection] = useState("Education");
  const [headerImageUrl, setHeaderImageUrl] = useState("");
  const [publishDate, setPublishDate] = useState(new Date());
  const [slug, setSlug] = useState("");
  const [markdownValue, setMarkdownValue] = useState(``);
  const [postTitle, setPostTitle] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");

  const [createPost, { loading, error }] = useMutation(CREATE_POST);

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
      case "section": {
        console.log("Section Changes", value);
        setSection(value);
      }
    }
  };

  const submitForm = (e) => {
    e.preventDefault();

    createPost({
      variables: {
        input: {
          category: selectedCategory,
          header_image: headerImageUrl,
          post_title: postTitle,
          post_content: markdownValue,
          publish_date: publishDate,
          section: selectedSection,
          slug: "/" + slug,
        },
      },
    });
  };

  return (
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
            >
              {categoryOptions}
            </select>
          </div>

          <div>
            <label htmlFor="publish_date">Publish Date</label>
            <DatePicker
              name="publish_date"
              selected={publishDate}
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
            />
          </div>

          <div>
            <label htmlFor="post-content">Post Content</label>
            <textarea
              name="post-content"
              onChange={(evt: React.ChangeEvent<HTMLTextAreaElement>) =>
                setMarkdownValue(evt.target.value)
              }
            />
          </div>

          <button>Submit</button>
        </StyledForm>
      </FormContainer>
      <MarkdownContainer>
        <ReactMarkdown
          children={markdownValue || markdown}
          remarkPlugins={[remarkGfm, remarkParse, remarkRehype]}
          rehypePlugins={[rehypeRaw]}
        />
      </MarkdownContainer>
    </PageContainer>
  );
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

const MarkdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid black;
  width: 50%;

  a {
    color: blue;
  }
`;

export default PostsCreate;
