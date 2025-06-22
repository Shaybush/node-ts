import React, { useState, useMemo } from 'react';
import { useGetAllPosts, useCreatePost, useDeletePost, useSearchByContext } from '../../hooks/useBlogData';
import { useConfirmDialog } from '../../hooks/useConfirmDialog';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import type { IBlog } from '../../types/blog.types';

// Create Post Modal Component
interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string, content: string) => void;
  isLoading: boolean;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({ isOpen, onClose, onSubmit, isLoading }) => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      onSubmit(title.trim(), content.trim());
    }
  };

  const handleClose = () => {
    setTitle('');
    setContent('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden'>
        <div className='bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white'>
          <h2 className='text-2xl font-bold'>Create New Blog Post</h2>
          <p className='text-purple-100 mt-1'>Share your thoughts with the world</p>
        </div>

        <form onSubmit={handleSubmit} className='p-6 space-y-6'>
          <div>
            <label htmlFor='title' className='block text-sm font-semibold text-gray-700 mb-2'>
              Title
            </label>
            <input
              id='title'
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all'
              placeholder='Enter an engaging title...'
              required
            />
          </div>

          <div>
            <label htmlFor='content' className='block text-sm font-semibold text-gray-700 mb-2'>
              Content
            </label>
            <textarea
              id='content'
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all resize-none'
              placeholder='Write your amazing content here...'
              required
            />
          </div>

          <div className='flex gap-3 pt-4'>
            <button
              type='button'
              onClick={handleClose}
              className='flex-1 px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium'
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type='submit'
              disabled={isLoading || !title.trim() || !content.trim()}
              className='flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium'
            >
              {isLoading ? 'Creating...' : 'Create Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Blog Post Card Component
interface BlogCardProps {
  post: IBlog;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, onDelete, isDeleting }) => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return date.toLocaleDateString('en-US', options).replace(',', '');
  };

  return (
    <article className='bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group'>
      <div className='p-6'>
        <div className='flex justify-between items-start mb-4'>
          <h2 className='text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-2'>
            {post.title}
          </h2>
          <button
            onClick={() => onDelete(post._id)}
            disabled={isDeleting}
            className='ml-4 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50'
            aria-label='Delete post'
          >
            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
              />
            </svg>
          </button>
        </div>

        <p className='text-gray-700 mb-4 line-clamp-3'>{post.content}</p>

        <div className='flex items-center justify-between text-sm text-gray-500'>
          <div className='flex items-center space-x-4'>
            <span className='flex items-center'>
              <svg className='w-4 h-4 mr-1' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
              {formatDate(post.createdAt)}
            </span>
            {post.updatedAt !== post.createdAt && (
              <span className='text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full'>
                Updated {formatDate(post.updatedAt)}
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

// Main Blog Component
const Blog: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);
  const [enableSearch, setEnableSearch] = useState<boolean>(false);

  // React Query hooks
  const { data: allPostsData, isLoading: isLoadingPosts, error: postsError } = useGetAllPosts();
  const { data: searchData, isLoading: isSearching } = useSearchByContext(searchQuery, enableSearch);
  const createPostMutation = useCreatePost();
  const deletePostMutation = useDeletePost();

  // Confirmation dialog hook
  const { confirmDialog, showConfirmDialog, setLoading } = useConfirmDialog();

  // Determine which posts to display
  const postsToDisplay = useMemo<IBlog[]>(() => {
    if (enableSearch && searchData?.data) {
      return searchData.data;
    }
    return allPostsData?.data || [];
  }, [allPostsData?.data, searchData?.data, enableSearch]);

  const handleCreatePost = async (title: string, content: string): Promise<void> => {
    try {
      await createPostMutation.mutateAsync({ title, content });
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleDeletePost = async (id: string): Promise<void> => {
    const confirmed = await showConfirmDialog({
      title: 'Delete Post',
      message: 'Are you sure you want to delete this post? This action cannot be undone.',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      variant: 'danger',
    });

    if (confirmed) {
      try {
        setLoading(true);
        await deletePostMutation.mutateAsync(id);
      } catch (error) {
        console.error('Error deleting post:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSearch = (query: string): void => {
    setSearchQuery(query);
    setEnableSearch(!!query.trim());
  };

  const clearSearch = (): void => {
    setSearchQuery('');
    setEnableSearch(false);
  };

  if (postsError) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center'>
        <div className='text-center p-8'>
          <div className='text-red-500 text-6xl mb-4'>⚠️</div>
          <h2 className='text-2xl font-bold text-gray-800 mb-2'>Oops! Something went wrong</h2>
          <p className='text-gray-600'>Failed to load blog posts. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50'>
      {/* Header */}
      <header className='bg-white shadow-sm border-b border-gray-100'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
          <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
            <div>
              <h1 className='text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent'>
                Blog Posts
              </h1>
              <p className='text-gray-600 mt-1'>Discover amazing stories and insights</p>
            </div>

            <div className='flex items-center gap-3'>
              {/* Search Toggle */}
              <button
                onClick={() => setIsSearchVisible(!isSearchVisible)}
                className={`p-3 rounded-lg transition-all ${
                  isSearchVisible ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                aria-label='Toggle search'
              >
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                  />
                </svg>
              </button>

              {/* Create Post Button */}
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className='px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all font-medium shadow-md hover:shadow-lg'
              >
                <svg className='w-5 h-5 inline mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
                </svg>
                New Post
              </button>
            </div>
          </div>

          {/* Search Bar */}
          {isSearchVisible && (
            <div className='mt-6 max-w-md'>
              <div className='relative'>
                <input
                  type='text'
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder='Search posts by content...'
                  className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all'
                />
                <svg
                  className='w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                  />
                </svg>
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
                  >
                    <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                    </svg>
                  </button>
                )}
              </div>
              {enableSearch && (
                <p className='text-sm text-purple-600 mt-2'>
                  {isSearching ? 'Searching...' : `Found ${postsToDisplay.length} result(s)`}
                </p>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {isLoadingPosts || isSearching ? (
          <div className='flex items-center justify-center py-12'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600'></div>
            <span className='ml-3 text-gray-600'>Loading posts...</span>
          </div>
        ) : postsToDisplay.length === 0 ? (
          <div className='text-center py-12'>
            <div className='text-gray-400 text-6xl mb-4'>📝</div>
            <h3 className='text-xl font-semibold text-gray-700 mb-2'>
              {enableSearch ? 'No posts found' : 'No blog posts yet'}
            </h3>
            <p className='text-gray-500 mb-6'>
              {enableSearch
                ? 'Try adjusting your search terms'
                : 'Be the first to share your thoughts and create a post!'}
            </p>
            {!enableSearch && (
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className='px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all font-medium'
              >
                Create Your First Post
              </button>
            )}
          </div>
        ) : (
          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {postsToDisplay.map((post) => (
              <BlogCard
                key={post._id}
                post={post}
                onDelete={handleDeletePost}
                isDeleting={deletePostMutation.isPending}
              />
            ))}
          </div>
        )}
      </main>

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreatePost}
        isLoading={createPostMutation.isPending}
      />

      {/* Confirmation Dialog */}
      <ConfirmDialog {...confirmDialog} />
    </div>
  );
};

export default Blog;
