import {AuthenticatedLayout} from "@/layouts"
import {
  ChevronLeft,
  PlusCircle,
  Upload,
  X,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Main } from "@/components/layout"
import { Content } from "@tiptap/react"
import { MinimalTiptapEditor } from "@/components/ui/minimal-tiptap"
import { useState } from "react"
import { BlogCategory, BlogTag, BlogPostFormData } from "@/types/blog"

const mockCategories: BlogCategory[] = [
  {
    id: 1,
    name: "Development",
    slug: "development",
    description: "Web development tutorials and guides",
    created_at: "2024-01-01 00:00:00",
    updated_at: "2024-01-01 00:00:00",
  },
  {
    id: 2,
    name: "Design",
    slug: "design",
    description: "UI/UX design and visual design articles",
    created_at: "2024-01-01 00:00:00",
    updated_at: "2024-01-01 00:00:00",
  },
  {
    id: 3,
    name: "Backend",
    slug: "backend",
    description: "Server-side development and architecture",
    created_at: "2024-01-01 00:00:00",
    updated_at: "2024-01-01 00:00:00",
  },
]

const mockTags: BlogTag[] = [
  { id: 1, name: "React", slug: "react", created_at: "2024-01-01 00:00:00", updated_at: "2024-01-01 00:00:00" },
  { id: 2, name: "TypeScript", slug: "typescript", created_at: "2024-01-01 00:00:00", updated_at: "2024-01-01 00:00:00" },
  { id: 3, name: "CSS", slug: "css", created_at: "2024-01-01 00:00:00", updated_at: "2024-01-01 00:00:00" },
  { id: 4, name: "JavaScript", slug: "javascript", created_at: "2024-01-01 00:00:00", updated_at: "2024-01-01 00:00:00" },
  { id: 5, name: "Node.js", slug: "nodejs", created_at: "2024-01-01 00:00:00", updated_at: "2024-01-01 00:00:00" },
  { id: 6, name: "Tutorial", slug: "tutorial", created_at: "2024-01-01 00:00:00", updated_at: "2024-01-01 00:00:00" },
]

export default function CreateBlogPost() {
  const [content, setContent] = useState<Content>("")
  const [selectedTags, setSelectedTags] = useState<number[]>([])
  const [formData, setFormData] = useState<BlogPostFormData>({
    title: "",
    content: "",
    excerpt: "",
    thumbnail: "",
    status: "draft",
    featured: false,
    category_id: undefined,
    tag_ids: [],
    published_at: "",
  })

  const handleInputChange = (field: keyof BlogPostFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleTagToggle = (tagId: number) => {
    const updatedTags = selectedTags.includes(tagId)
      ? selectedTags.filter(id => id !== tagId)
      : [...selectedTags, tagId]
    
    setSelectedTags(updatedTags)
    handleInputChange('tag_ids', updatedTags)
  }

  const handleContentChange = (value: Content) => {
    setContent(value)
    handleInputChange('content', value)
  }

  const selectedTagObjects = mockTags.filter(tag => selectedTags.includes(tag.id))

  return (
    <>
      <AuthenticatedLayout title="Create Blog Post">
        <Main>
          <div className="grid flex-1 items-start gap-4 md:gap-8">
            <div className="grid flex-1 auto-rows-max gap-4">
              <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" className="h-7 w-7">
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Back</span>
                </Button>
                <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                  Create Blog Post
                </h1>
                <div className="hidden items-center gap-2 md:ml-auto md:flex">
                  <Button variant="outline" size="sm">
                    Save Draft
                  </Button>
                  <Button size="sm">Publish Post</Button>
                </div>
              </div>
              
              <div className="grid gap-4 md:grid-cols-[1fr_350px] lg:gap-8">
                <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Post Details</CardTitle>
                      <CardDescription>
                        Fill in the basic information for your blog post
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6">
                        <div className="grid gap-3">
                          <Label htmlFor="title">Title</Label>
                          <Input
                            id="title"
                            type="text"
                            className="w-full"
                            placeholder="Enter post title..."
                            value={formData.title}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                          />
                        </div>
                        
                        <div className="grid gap-3">
                          <Label htmlFor="excerpt">Excerpt</Label>
                          <Textarea
                            id="excerpt"
                            placeholder="Enter a brief summary of your post..."
                            className="min-h-20"
                            value={formData.excerpt}
                            onChange={(e) => handleInputChange('excerpt', e.target.value)}
                          />
                        </div>
                        
                        <div className="grid gap-3">
                          <Label htmlFor="content">Content</Label>
                          <MinimalTiptapEditor
                            value={content}
                            onChange={handleContentChange}
                            className="w-full"
                            editorContentClassName="p-5"
                            output="html"
                            placeholder="Write your blog post content..."
                            autofocus={false}
                            editable={true}
                            editorClassName="focus:outline-none min-h-[400px]"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                </div>

                <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Publication</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-3">
                        <Label htmlFor="status">Status</Label>
                        <Select
                          value={formData.status}
                          onValueChange={(value: 'draft' | 'published' | 'archived') =>
                            handleInputChange('status', value)
                          }
                        >
                          <SelectTrigger id="status">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="published">Published</SelectItem>
                            <SelectItem value="archived">Archived</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          id="featured"
                          checked={formData.featured}
                          onCheckedChange={(checked) => handleInputChange('featured', checked)}
                        />
                        <Label htmlFor="featured" className="text-sm font-medium">
                          Featured Post
                        </Label>
                      </div>

                      {formData.status === 'published' && (
                        <div className="grid gap-3">
                          <Label htmlFor="published_at">Publication Date</Label>
                          <Input
                            id="published_at"
                            type="datetime-local"
                            value={formData.published_at}
                            onChange={(e) => handleInputChange('published_at', e.target.value)}
                          />
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Featured Image</CardTitle>
                      <CardDescription>
                        Upload a thumbnail image for your blog post
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-2">
                        {formData.thumbnail ? (
                          <div className="relative">
                            <img
                              alt="Post thumbnail"
                              className="aspect-video w-full rounded-md object-cover"
                              src={formData.thumbnail}
                            />
                            <Button
                              variant="destructive"
                              size="sm"
                              className="absolute top-2 right-2"
                              onClick={() => handleInputChange('thumbnail', '')}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex aspect-video w-full items-center justify-center rounded-md border border-dashed cursor-pointer hover:bg-muted/50 transition-colors">
                            <div className="flex flex-col items-center gap-2">
                              <Upload className="h-8 w-8 text-muted-foreground" />
                              <p className="text-sm text-muted-foreground">
                                Click to upload thumbnail
                              </p>
                              <p className="text-xs text-muted-foreground">
                                PNG, JPG up to 2MB
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Category</CardTitle>
                      <CardDescription>
                        Select a category for your post
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Select
                        value={formData.category_id?.toString()}
                        onValueChange={(value) => handleInputChange('category_id', parseInt(value))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockCategories.map((category) => (
                            <SelectItem key={category.id} value={category.id.toString()}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Tags</CardTitle>
                      <CardDescription>
                        Add relevant tags to your post
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-2">
                          {mockTags.map((tag) => (
                            <Button
                              key={tag.id}
                              variant={selectedTags.includes(tag.id) ? "default" : "outline"}
                              size="sm"
                              onClick={() => handleTagToggle(tag.id)}
                              className="justify-start"
                            >
                              {selectedTags.includes(tag.id) && (
                                <X className="mr-1 h-3 w-3" />
                              )}
                              {tag.name}
                            </Button>
                          ))}
                        </div>
                        
                        {selectedTagObjects.length > 0 && (
                          <div>
                            <Label className="text-sm font-medium mb-2 block">
                              Selected Tags:
                            </Label>
                            <div className="flex flex-wrap gap-1">
                              {selectedTagObjects.map((tag) => (
                                <Badge key={tag.id} variant="secondary" className="text-xs">
                                  {tag.name}
                                  <X
                                    className="ml-1 h-3 w-3 cursor-pointer"
                                    onClick={() => handleTagToggle(tag.id)}
                                  />
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-2 md:hidden">
                <Button variant="outline" size="sm">
                  Save Draft
                </Button>
                <Button size="sm">Publish Post</Button>
              </div>
            </div>
          </div>
        </Main>
      </AuthenticatedLayout>
    </>
  )
}