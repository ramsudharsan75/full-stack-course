const BlogForm = ({ onSubmit, handleTitle, titleValue, handleUrl, urlValue }) => (
  <>
    <h2>Create New Blog</h2>
    <form onSubmit={onSubmit}>
      <div>title: <input value={titleValue} onChange={handleTitle}></input></div>
      <div>url: <input value={urlValue} onChange={handleUrl}></input></div>
      <button type='submit'>Save</button>
    </form>
  </>
)

export default BlogForm
