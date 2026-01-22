import React from "react";

const BlogForm = () => {
  return (
    <form>
      <div>
        <label>Titulo</label>
        <input type="text" />
      </div>
      <div>
        <label>Autor</label>
        <input type="text" />
      </div>
      <div>
        <label>Link</label>
        <input type="text" />
      </div>
      <button>Crear</button>
    </form>
  );
};

export default BlogForm;
