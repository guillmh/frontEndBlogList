const Blog = ({ blog }) => (
  <div>
    <span>Titulo: </span>
    {blog.title} <span>Autor: </span>
    {blog.author}
  </div>
);

export default Blog;
