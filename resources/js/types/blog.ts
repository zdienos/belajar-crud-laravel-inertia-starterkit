export interface BlogCategory {
  id: number
  name: string
  slug: string
  description?: string
  created_at: string
  updated_at: string
}

export interface BlogTag {
  id: number
  name: string
  slug: string
  created_at: string
  updated_at: string
}

export interface BlogPost {
  id: number
  title: string
  slug: string
  content: string
  excerpt?: string
  thumbnail?: string
  status: 'draft' | 'published' | 'archived'
  featured: boolean
  published_at?: string
  created_at: string
  updated_at: string
  category?: BlogCategory
  tags?: BlogTag[]
  author: {
    id: number
    name: string
    email: string
    avatar?: string
  }
}

export interface BlogPostFormData {
  title: string
  content: string
  excerpt?: string
  thumbnail?: string
  status: 'draft' | 'published' | 'archived'
  featured: boolean
  category_id?: number
  tag_ids: number[]
  published_at?: string
}

export interface BlogFilters {
  search?: string
  category?: string
  tag?: string
  status?: 'draft' | 'published' | 'archived'
  featured?: boolean
}

export interface BlogCategoryFormData {
  name: string
  description?: string
}

export interface BlogTagFormData {
  name: string
}